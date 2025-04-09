let diapositiva = 0;
let totalDiapositivas = 16;
const elementosProcesados = new Map();
const contenedorPrincipal = document.getElementById("contenido");
const finalizado = document.getElementById("finalizado");
const btnIzquierda = document.getElementById("btnIzquierda");
const btnDerecha = document.getElementById("btnDerecha");
const btnInit = document.getElementById("btnInit");
const btnStart = document.getElementById("btnStart");
const progressBar = document.getElementById("progressBar");
const audioIntro = document.getElementById("audiointro");
const playButton = document.getElementById("playAudio");

const modalFinalizar = document.getElementById("modalFinalizar");
const modalMessage = document.getElementById("modalMessage");

const audioIntroSource = document.getElementById("audiointroSource");
const textAudio = document.getElementById("textAudio");
const sectionAudio = document.getElementById("sectionAudio");


document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  mostrarTab(`tab-presentacion.html`);
});

document.addEventListener("click",async function (e) {
  if (e.target && e.target.id === "btnStart") {
    e.preventDefault();
    diapositiva = 1
    document.querySelector(".header")?.classList.remove("header-bg-color-init");
    document
      .querySelector(".logout-btn")
      ?.classList.remove("logout-btn-color-init");
    document.querySelector(".title")?.classList.remove("ocultar");
    document.querySelector(".subtitle")?.classList.remove("ocultar");
    document.querySelector(".navigation")?.classList.remove("ocultar");
    mostrarTab(`tab-1.html`);
    calcularProgreso();
    ocultarTitulo();
    sectionAudio.classList.remove("invisible");
    intro();
  }

  if (e.target && e.target.id === "btnInit") {
    e.preventDefault();
    btnInit.innerText = "SALIR →";
    btnInit.id = "SalirBtn";
    mostrarTab(`tab-inicio.html`);
    habilitar();
  }
  let elementoClickeado = e.target;

  while (
    elementoClickeado &&
    !elementoClickeado.classList.contains("MAnimacion")
  ) {
    elementoClickeado = elementoClickeado.parentElement;
  }

  if (elementoClickeado && elementoClickeado.classList.contains("MAnimacion")) {
    e.preventDefault();

    const resultado = await validarElemento(elementoClickeado);

    if (resultado.valido) {
      elementoClickeado.classList.remove("MAnimacion");
      elementosProcesados.set(elementoClickeado, true);
    } else {
      messageAlert.innerText =
        "You need to complete Item 1 before proceeding to the next step.";
      new bootstrap.Modal(modalMessage).show();
    }
  }
});

btnIzquierda.addEventListener("click", function (e) {
  e.preventDefault();
  if (diapositiva === 1) {
    return;
  }
  const MAnimacion = document.querySelectorAll(".MAnimacion");
  if (MAnimacion.length > 0) {
    console.log("Debe completar la funcionalidad");
    return;
  }
  if (diapositiva >= 1) {
    diapositiva--;
  }
  mostrarTab(`tab-${diapositiva}.html`);
  ocultarTitulo();
  calcularProgreso();
});

btnDerecha.addEventListener("click", function (e) {
  e.preventDefault();
  if (diapositiva > totalDiapositivas - 1) {
    return;
  }
  const MAnimacion = document.querySelectorAll(".MAnimacion");
  if (MAnimacion.length > 0) {
    messageAlert.innerText =
      "To access the next section, please complete the steps shown by the date in the correct order.";
    new bootstrap.Modal(modalMessage).show();
    return;
  }
  if (diapositiva <= totalDiapositivas - 1) {
    diapositiva++;
  }
  mostrarTab(`tab-${diapositiva}.html`);
  ocultarTitulo();
  calcularProgreso();
});

if (playButton) {
  playButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (audioIntro.paused) {
      audioIntro
        .play()
        .then(() => {
          playButton.innerHTML = '<i class="fa fa-stop"></i>';
          textAudio.innerHTML = "Detener audio";
        })
        .catch((error) => {
          console.error("Error al reproducir el audio:", error);
        });
    } else {
      audioIntro.pause();
      audioIntro.currentTime = 0;
      playButton.innerHTML = '<i class="fa fa-play"></i>';
      textAudio.innerHTML = "Reproducir audio";
    }
  });
}

function audioTab(audio) {
  audioIntroSource.src = `assets/audios/${audio}`;
  audioIntro.load();

  sectionAudio.classList.add("invisible");
  audioIntro.onerror = () => {
    sectionAudio.classList.add("invisible");
    console.log("El archivo de audio no existe o no se pudo cargar.");
  };

  if (audioIntro) {
    audioIntro
      .play()
      .then(() => {
        sectionAudio.classList.remove("invisible");
        console.log("Audio reproduciéndose");
        playButton.innerHTML = '<i class="fa fa-stop"></i>';
        textAudio.innerHTML = "Detener audio";
      })
      .catch((error) => {
        console.log("Error al reproducir el audio:", error);
        sectionAudio.classList.add("invisible");
      });
  }
}


function intro() {
  introJs()
    .setOptions({
      nextLabel: "Siguiente",
      prevLabel: "Anterior",
      doneLabel: "Listo",
      dontShowAgain: true,
      dontShowAgainLabel: "No mostrar esto nuevamente",
      dontShowAgainCookie: "Cookie_ESING_Intro_Estatica",
      exitOnOverlayClick: false,
      exitOnEsc: false,
      disableInteraction: true,
    })
    .onafterchange(() => {
      if (audioIntro) {
        audioIntro
          .play()
          .then(() => {
            console.log("Audio reproduciéndose");
            playButton.innerHTML = '<i class="fa fa-stop"></i>';
            textAudio.innerHTML = "Detener audio";
          })
          .catch((error) => {
            console.log("Error al reproducir el audio:", error);
          });
      }
      const dontShowAgainContainer = document.querySelector(
        ".introjs-dontShowAgain"
      );

   /*    if (dontShowAgainContainer) {
        let icon =
          dontShowAgainContainer.parentElement.querySelector(".introjs-icono");
        if (!icon) {
          icon = document.createElement("img");
          icon.src = "assets/recursos/PersonajeFemenino.png";
          icon.alt = "Personaje";
          icon.className = "introjs-icono";
          dontShowAgainContainer.parentElement.insertBefore(
            icon,
            dontShowAgainContainer
          );
        }
      } */
    })
    .onexit(() => {
      audioIntro.pause();
      audioIntro.currentTime = 0;
      playButton.innerHTML = '<i class="fa fa-play"></i>';
      textAudio.innerHTML = "Reproducir audio";
      console.log("El recorrido de Intro.js ha sido cerrado");
    })
    .start();
}

async function mostrarTab(elemento) {
  try {
    console.log("Elemento: ", elemento);
    const response = await fetch(`./tabs/${elemento}`);
    if (!response.ok) {
      throw new Error("No se pudo cargar el contenido");
    }
    contenedorPrincipal.innerHTML = await response.text();

    if (diapositiva >= 1) {
      audioIntro.pause();
      audioIntro.currentTime = 0;
      playButton.innerHTML = '<i class="fa fa-play"></i>';
      textAudio.innerHTML = "Reproducir audio";
      audioTab(`${diapositiva}.mp3`);
    }
    fondoIntroduccion();
  } catch (error) {
    console.log("error", error);
  }
}

function calcularProgreso() {
  let porcentaje = (diapositiva / totalDiapositivas) * 100;
  let valor = Math.round(porcentaje);
  progressBar.style.width = `${valor}%`;
  progressBar.innerText = `${valor}%`;

  if (valor === 100) {
    console.log("Curso finalizado");
    setTimeout(() => {
      console.log("Mostrar finalizado");
      new bootstrap.Modal(modalFinalizar).show();
    }, 5000);
    finalizado.value = "SI";
    completaCourse(1);
  }
}

function habilitar() {
  document.getElementById("menuBtn").classList.remove("ocultar");
  document.querySelector(".footer").classList.remove("footer-init");
  document.querySelector(".program-indicator").classList.remove("ocultar");
  document
    .querySelector(".content-usuario")
    .classList.remove("content-usuario-init");
}

function fondoIntroduccion() {
  const container = document.querySelector(".container-wbt");
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");

  if (container.classList.contains("fondo-modulo1-introduccion")) {
    container.classList.remove("fondo-modulo1-introduccion");
  }

  if (header.classList.contains("quitarFondo")) {
    header.classList.remove("quitarFondo");
  }

  if (content.classList.contains("quitarFondo")) {
    content.classList.remove("quitarFondo");
  }

  console.log('diapositiva en intro', diapositiva);
  
  if (diapositiva === 1) {
    container.classList.add("fondo-modulo1-introduccion");
    header.classList.add("quitarFondo");
    content.classList.add("quitarFondo");
  }
}

function ocultarTitulo() {
  document
    .querySelector(".logo-title")
    ?.classList.toggle("ocultar", diapositiva === 1);
}
const validarElemento = async (elemento) => {
  const todosLosElementos = Array.from(
    document.querySelectorAll(".MAnimacion")
  );
  const index = todosLosElementos.indexOf(elemento);

  if (index === -1) return { valido: false, mensaje: "Elemento no encontrado" };

  for (let i = 0; i < index; i++) {
    if (!elementosProcesados.get(todosLosElementos[i])) {
      const primerNoProcesado = i + 1;
      return {
        valido: false,
        mensaje: `Debes completar el elemento ${primerNoProcesado} antes de continuar.`,
      };
    }
  }

  return {
    valido: true,
    mensaje: `Elemento ${index + 1} completado correctamente.`,
  };
};
const todosProcesados = () => {
  const elementos = document.querySelectorAll(".MAnimacion");

  if (elementos.length === 0) {
    return true;
  }

  for (const elemento of elementos) {
    if (!elementosProcesados.get(elemento)) {
      return false;
    }
  }

  return true;
};