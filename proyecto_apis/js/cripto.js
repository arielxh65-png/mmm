const API_KEY_CRIPTO = '79e979c8ddc94320b036fff55702aef2';
const buscarCriptoBtn = document.getElementById('buscarCripto');
const monedaSelect = document.getElementById('monedaSelect');
const criptoDetalle = document.getElementById('criptoDetalle');
const errorCripto = document.getElementById('error');

async function cargarMonedas(){
  try{
    monedaSelect.innerHTML = '<option>Cargando...</option>';
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`);
    if(!res.ok) throw new Error('No se pudo cargar la lista de monedas');
    const data = await res.json();
    monedaSelect.innerHTML = '';
    data.forEach(moneda => {
      const opt = document.createElement('option');
      opt.value = moneda.id;
      opt.textContent = moneda.name;
      monedaSelect.appendChild(opt);
    });
  } catch(err){
    errorCripto.textContent = err.message;
  }
}

async function buscarCripto(){
  const monedaId = monedaSelect.value;
  criptoDetalle.innerHTML = '';
  errorCripto.textContent = '';
  if(!monedaId) return;

  try{
    criptoDetalle.innerHTML = '<p class="small">Cargando...</p>';
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(monedaId)}`);
    if(!res.ok) throw new Error('No se pudo obtener la información de la moneda');
    const data = await res.json();
    const moneda = data[0];

    criptoDetalle.innerHTML = `
      <div style="text-align:center">
        <h2>${moneda.name}</h2>
        <p class="small">Precio USD: $${moneda.current_price}</p>
        <p class="small">Cambio 24h: ${moneda.price_change_percentage_24h.toFixed(2)}%</p>
        <p class="small">Market Cap: $${moneda.market_cap.toLocaleString()}</p>
      </div>
    `;
  } catch(err){
    criptoDetalle.innerHTML = '';
    errorCripto.textContent = err.message;
  }
}

if(buscarCriptoBtn) buscarCriptoBtn.addEventListener('click', buscarCripto);

document.addEventListener('DOMContentLoaded', cargarMonedas);
