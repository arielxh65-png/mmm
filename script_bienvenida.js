(function(){
  let nombreCompleto = localStorage.getItem('proyecto_nombre_completo');

  if(!nombreCompleto){
    while(true){
      nombreCompleto = prompt("Por favor, ingresa tu nombre y apellido:");
      if(nombreCompleto && nombreCompleto.trim().includes(' ')){
        nombreCompleto = nombreCompleto.trim();
        localStorage.setItem('proyecto_nombre_completo', nombreCompleto);
        break;
      } else {
        alert("Debes ingresar tu nombre y apellido separados por un espacio.");
      }
    }
  }

  const welcomeEls = document.querySelectorAll('#welcome');
  welcomeEls.forEach(el => {
    el.textContent = `Bienvenido, ${nombreCompleto}`;
  });
})();
