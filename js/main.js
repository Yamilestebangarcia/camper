const $marcador = document.getElementById("marcador");
const $item = document.querySelectorAll("menu_enlace");
const $template = document.getElementById("err").content;
let respuestaError = [
  "Introduzca al menos 3 caracteres",
  "introduzca un email correcto",
  "Introduzca al menos 10 caracteres",
];
let controlrepetirerr = false;
let controlErrores = [false, false, false];

const indicador = (e) => {
  $marcador.style.left = e.offsetLeft + "px";
  $marcador.style.width = e.offsetWidth + "px";
};

const valido = (e, i) => {
  e.target.classList.remove("novalido");
  e.target.classList.add("valido");
  controlErrores[i] = true;
};

const novalido = (e, i) => {
  e.target.classList.remove("valido");
  e.target.classList.add("novalido");
  controlErrores[i] = false;
};

document.addEventListener("click", (e) => {
  if (e.target.classList.value === "menu_enlace") {
    indicador(e.target);
  }
  if (e.target.id === "btn_enviar") {
    e.preventDefault();
    const $ul = document.getElementById("err");
    if (controlrepetirerr) {
      $ul.innerHTML = "";
    }

    const $fracmento = document.createDocumentFragment();
    controlErrores.forEach((elemento, index) => {
      if (elemento === false) {
        let li = document.createElement("li");
        li.id = `li${index}`;
        li.classList = "li_err";
        $txt = document.createTextNode(respuestaError[index]);
        li.appendChild($txt);
        $fracmento.appendChild(li);
      }
    });

    $ul.appendChild($fracmento);
    controlrepetirerr = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.target.id === "nombre") {
    if (e.target.value.length > 2) {
      valido(e, 0);
    } else {
      novalido(e, 0);
    }
  }
  if (e.target.id === "email") {
    let evalua = /^[\w.,]+@{1}[\w]+\.[a-z]{2,3}$/.test(e.target.value);
    if (evalua) {
      valido(e, 1);
    } else {
      novalido(e, 1);
    }
  }
  if (e.target.id === "comentario") {
    if (e.target.value.length > 10) {
      valido(e, 2);
    } else {
      novalido(e, 2);
    }
  }
});
