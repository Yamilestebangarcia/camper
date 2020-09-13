/*-------------variables-------------- */
/*---------------indicador menu--------------- */
const $marcador = document.getElementById("marcador");
const $item = document.querySelectorAll("menu_enlace");
/*------------------ calendario------------------ */
const $div_calendario = document.getElementById("div_calendario");
const $divBtnComprar = document.getElementById("divBtnComprar");
const $furgoneta = document.getElementById("furgoneta");
const $article_alquiler = document.getElementById("article_alquiler");
const $calendario = document.getElementById("calendario");
const $section_calendario = document.getElementById("section_calendario");
const $principal = document.getElementById("principal");
const $mes = document.getElementById("mes");
let diasSenalados = [];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
/*------------------ contacto------------------ */
const $contacto = document.getElementById("contacto");
const $ul = document.getElementById("err");
let respuestaError = [
  "Introduzca al menos 3 caracteres",
  "introduzca un email correcto",
  "Introduzca al menos 10 caracteres",
];
let controlrepetirerr = false;
let controlErrores = [false, false, false];
/*---------------------------funciones--------------------*/
/*--------------indicador menu------------ */
const indicador = (e) => {
  $marcador.style.left = e.offsetLeft + "px";
  $marcador.style.width = e.offsetWidth + "px";
};
/*-------------------formulario-------------*/
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
const validarform = (e) => {
  e.preventDefault();
  if (controlErrores[0] && controlErrores[1] && controlErrores[2]) {
    $contacto.reset();
    $ul.innerHTML = "";
    /* aqui tengo que hacer el submit */
  } else {
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
};

/*-----------------------calendario------------*/
let fecha = new Date();

const posicionar = (diasemana, $fracmento) => {
  for (let i = 0; i < diasemana; i++) {
    $li = document.createElement("li");
    $li.classList.value = "diacreado";
    $fracmento.appendChild($li);
  }
};
const mes = (fecha) => {
  let mes = fecha.getMonth();

  let ano = fecha.getFullYear();

  $mes.textContent = `${meses[mes]}  ${ano}`;

  let date = new Date(ano + "-" + (mes + 1) + "-" + 1);
  let $fracmento = document.createDocumentFragment();

  let inicio = 1;
  posicionar(date.getUTCDay(), $fracmento);
  while (true) {
    $li = document.createElement("li");
    $li.classList.value = "dia";

    $li.textContent = inicio;
    inicio++;
    $fracmento.appendChild($li);
    date.setDate(date.getDate() + 1);

    if (date.getMonth() === mes + 1) break;
  }

  $principal.appendChild($fracmento);
};
const cambiarMes = (numero) => {
  let mesAnos = $mes.textContent.split(["  "], 2);

  mesAnos[0] = meses.indexOf(mesAnos[0]);

  mesAnos[1] = Number(mesAnos[1]);
  if (numero === 1) {
    if (mesAnos[0] === 11) {
      mesAnos[1] = mesAnos[1] + 1;
      mesAnos[0] = 0;
    } else {
      mesAnos[0] = mesAnos[0] + 1;
    }
  } else {
    if (mesAnos[0] === 1) {
      mesAnos[1] = mesAnos[1] - 1;

      mesAnos[0] = 11;
    } else {
      mesAnos[0] = mesAnos[0] - 1;
    }
  }
  String(mesAnos[1]);

  $mes.textContent = `${meses[mesAnos[0]]}  ${mesAnos[1]}`;
  return `${mesAnos[1]}-${mesAnos[0] + 1}-1`;
};

const pasarmes = (datos) => {
  let $fracmento = document.createDocumentFragment();
  datos = String(datos);

  let date = new Date(datos);
  let inicio = 1;

  posicionar(date.getUTCDay(), $fracmento);
  let mes = date.getMonth() + 1;

  while (true) {
    $li = document.createElement("li");
    $li.classList.value = "dia";

    $li.textContent = inicio;
    inicio++;
    $fracmento.appendChild($li);

    date.setDate(date.getDate() + 1);

    if (date.getMonth() === mes) break;
  }
  $principal.textContent = "";
  $principal.appendChild($fracmento);
};
/*---------------------- inicio codigo------- */
/*----------------- inicio de funciones -----------------*/
mes(fecha);
/*--------------escuchas------------------ */
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
let contolVisivilidad = false;
document.addEventListener("click", (e) => {
  //calendario boto izquierda
  if (e.target.id === "izquierda") {
    pasarmes(cambiarMes(-1));
  }
  // calendario boton derecha
  if (e.target.id === "derecha") {
    pasarmes(cambiarMes(1));
  }
  //calendario ciculo
  if (
    e.target.classList.value === "dia" ||
    e.target.classList.value === "dia circulo"
  ) {
    e.target.classList.toggle("circulo");
    if (e.target.classList.value === "dia circulo") {
      diasSenalados.push(e.target.textContent);
    } else {
      let nuemeroElemento = diasSenalados.indexOf(e.target.textContent);

      diasSenalados.splice(nuemeroElemento, 1);
    }
  }
  //indicdor de menu
  if (e.target.classList.value === "menu_enlace") {
    indicador(e.target);
  }
  // formulario boton enviar
  if (e.target.id === "btn_enviar") {
    validarform(e);
  }
  //desplegar calendario
  if (e.target.id === "btnreserva") {
    if (contolVisivilidad) {
      $calendario.classList.replace("visible", "oculto");
      $furgoneta.classList.replace("visible", "oculto");
      $divBtnComprar.classList.replace("visible", "oculto");
      $div_calendario.classList.replace("visible", "oculto");
      contolVisivilidad = false;
    } else {
      $calendario.classList.replace("oculto", "visible");
      $furgoneta.classList.replace("oculto", "visible");
      $divBtnComprar.classList.replace("oculto", "visible");
      $div_calendario.classList.replace("oculto", "visible");
      contolVisivilidad = true;
    }

    $article_alquiler.classList.toggle("expandido");
  }
});
