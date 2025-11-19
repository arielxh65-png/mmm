const buscarRickBtn = document.getElementById('buscarRick');
const rickInput = document.getElementById('rickIdInput');
const rickDetalle = document.getElementById('rickDetalle');
const errorRick = document.getElementById('error');

async function buscarRick(){
  const id = rickInput.value.trim();
  rickDetalle.innerHTML = '';
  errorRick.textContent = '';
  if(!id){ errorRick.textContent = 'Ingresa un ID'; return; }

  try{
    rickDetalle.innerHTML = '<p class="small">Cargando...</p>';
    const res = await fetch(`https://rickandmortyapi.com/api/character/${encodeURIComponent(id)}`);
    if(!res.ok) throw new Error('Personaje no encontrado');
    const p = await res.json();

    rickDetalle.innerHTML = `
      <div style="text-align:center">
        <img src="${p.image}" alt="${p.name}" style="max-width:150px;border-radius:8px" />
        <h2>${p.name}</h2>
        <p class="small">Estado: ${p.status} • Especie: ${p.species}</p>
      </div>
    `;
  } catch(err){
    rickDetalle.innerHTML = '';
    errorRick.textContent = err.message;
  }
}

if(buscarRickBtn) buscarRickBtn.addEventListener('click', buscarRick);
if(rickInput) rickInput.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') buscarRick();
});
