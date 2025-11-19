const buscarPokemonBtn = document.getElementById('buscarPokemon');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonDetalle = document.getElementById('pokemonDetalle');
const errorPokemon = document.getElementById('error');

async function buscarPokemon(){
  const nombre = pokemonInput.value.trim().toLowerCase();
  pokemonDetalle.innerHTML = '';
  errorPokemon.textContent = '';
  if(!nombre){ errorPokemon.textContent = 'Ingresa un nombre o ID'; return; }

  try{
    pokemonDetalle.innerHTML = '<p class="small">Cargando...</p>';
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`);
    if(!res.ok) throw new Error('Pokémon no encontrado');
    const p = await res.json();
    const tipos = p.types.map(t => t.type.name).join(', ');
    pokemonDetalle.innerHTML = `
      <div style="text-align:center">
        <img src="${p.sprites.front_default}" alt="${p.name}" style="max-width:150px;border-radius:8px" />
        <h2>${p.name}</h2>
        <p class="small">Tipo: ${tipos} • Peso: ${p.weight}</p>
      </div>
    `;
  } catch(err){
    pokemonDetalle.innerHTML = '';
    errorPokemon.textContent = err.message;
  }
}

if(buscarPokemonBtn) buscarPokemonBtn.addEventListener('click', buscarPokemon);
if(pokemonInput) pokemonInput.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') buscarPokemon();
});
