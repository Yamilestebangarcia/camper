const $marcador = document.getElementById("marcador");
const $item = document.querySelectorAll("menu_enlace");

const indicador = (e) => {
  $marcador.style.left = e.offsetLeft + "px";
  $marcador.style.width = e.offsetWidth + "px";
};
document.addEventListener("click", (e) => {
  if (e.target.classList.value === "menu_enlace") {
    indicador(e.target);
  }
});
