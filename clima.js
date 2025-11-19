const API_KEY_CLIMA = '64ae9bcdcc036d9bd0da69648bdee085';
const buscarClimaBtn = document.getElementById('buscarClima');
const ciudadInput = document.getElementById('ciudadInput');
const climaDetalle = document.getElementById('climaDetalle');
const errorClima = document.getElementById('error');

async function mostrarClima(){
  const ciudad = ciudadInput.value.trim();
  climaDetalle.innerHTML = '';
  errorClima.textContent = '';
  if(!ciudad){ errorClima.textContent = 'Ingresa el nombre de la ciudad'; return; }

  try{
    climaDetalle.innerHTML = '<p class="small">Cargando...</p>';
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY_CLIMA}&units=metric&lang=es`);
    if(!res.ok) throw new Error('Ciudad no encontrada');
    const data = await res.json();

    climaDetalle.innerHTML = `
      <div style="text-align:center">
        <h2>${data.name}, ${data.sys.country}</h2>
        <p class="small">Temperatura: <strong>${data.main.temp}°C</strong></p>
        <p class="small">Humedad: <strong>${data.main.humidity}%</strong></p>
        <p class="small">Descripción: <strong>${data.weather[0].description}</strong></p>
      </div>
    `;
  } catch(err){
    climaDetalle.innerHTML = '';
    errorClima.textContent = err.message;
  }
}

if(buscarClimaBtn) buscarClimaBtn.addEventListener('click', mostrarClima);
if(ciudadInput) ciudadInput.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') mostrarClima();
});
