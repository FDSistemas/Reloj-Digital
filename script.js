const API_KEY = '142ad1de8b644a45bcf162101251809'; 
const latitud = '19.42475'; 
const longitud = '-99.20454';

function actualizarRelojYFecha() {
    const ahora = new Date();
    
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${horas}:${minutos}:${segundos}`;

    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opciones);
    document.getElementById('date').textContent = fechaFormateada;
}

async function obtenerClima() {
    try {
        const respuesta = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitud},${longitud}&days=1&lang=es`);
        const datos = await respuesta.json();

        if (respuesta.ok) {
            const temperaturaActual = Math.round(datos.current.temp_c);
            const descripcion = datos.current.condition.text;
            const iconoUrl = `https:${datos.current.condition.icon}`;
            
            const tempMin = Math.round(datos.forecast.forecastday[0].day.mintemp_c);
            const tempMax = Math.round(datos.forecast.forecastday[0].day.maxtemp_c);

            document.getElementById('weather-temp').textContent = `${temperaturaActual}°C`;
            document.getElementById('weather-desc').textContent = descripcion;
            document.getElementById('weather-icon').src = iconoUrl;
            document.getElementById('weather-icon').alt = descripcion;
            
            document.getElementById('weather-minmax').textContent = `Mín: ${tempMin}°C / Máx: ${tempMax}°C`;

        } else {
            document.getElementById('weather-desc').textContent = 'Clima no disponible';
            document.getElementById('weather-icon').src = '';
            document.getElementById('weather-minmax').textContent = 'Mín: --°C / Máx: --°C';
        }
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        document.getElementById('weather-desc').textContent = 'Error de conexión';
        document.getElementById('weather-icon').src = '';
        document.getElementById('weather-minmax').textContent = 'Mín: --°C / Máx: --°C';
    }
}

setInterval(actualizarRelojYFecha, 1000);
actualizarRelojYFecha();

obtenerClima();
setInterval(obtenerClima, 60000);