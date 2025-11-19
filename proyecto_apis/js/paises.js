const buscarPaisBtn = document.getElementById('buscarPais');
const paisInput = document.getElementById('paisInput');
const paisDetalle = document.getElementById('paisDetalle');
const errorPais = document.getElementById('error');

async function buscarPais(){
  const nombre = paisInput.value.trim();
  paisDetalle.innerHTML = '';
  errorPais.textContent = '';
  if(!nombre){ 
    errorPais.textContent = 'Ingresa el nombre de un país'; 
    return; 
  }

  try{
    paisDetalle.innerHTML = '<p class="small">Cargando...</p>';
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nombre)}`);
    if(!res.ok) throw new Error('País no encontrado');
    const data = await res.json();
    const pais = data[0];

    paisDetalle.innerHTML = `
      <div style="text-align:center">
        <img src="${pais.flags.svg}" alt="${pais.name.common}" style="max-width:120px;border-radius:6px" />
        <h2>${pais.name.common}</h2>
        <p class="small">
          Capital: ${pais.capital ? pais.capital[0] : '-'} • 
          Población: ${pais.population.toLocaleString()}
        </p>
      </div>
    `;
  } catch(err){
    paisDetalle.innerHTML = '';
    errorPais.textContent = err.message;
  }
}

if(buscarPaisBtn) buscarPaisBtn.addEventListener('click', buscarPais);
if(paisInput) paisInput.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') buscarPais();
});


