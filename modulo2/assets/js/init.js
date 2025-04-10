let diapositiva = 0;
let totalDiapositivas = 40;
const opcionesDragDrop = [
  { opc: "Orientado a resultados", trait: "D" },
  { opc: "Decisivo", trait: "D" },
  { opc: "Directo", trait: "D" },
  { opc: "Competitivo", trait: "D" },
  { opc: "Confianza en sí mismo", trait: "D" },
  { opc: "Asumir riesgos", trait: "D" },
  { opc: "Energético", trait: "D" },
  { opc: "Persistente", trait: "D" },
  { opc: "Independiente", trait: "D" },
  { opc: "Autoritario", trait: "D" },
  { opc: "Ambicioso", trait: "D" },
  { opc: "Controlador", trait: "D" },

  { opc: "Sociable", trait: "I" },
  { opc: "Extrovertido", trait: "I" },
  { opc: "Entusiasta", trait: "I" },
  { opc: "Persuasivo", trait: "I" },
  { opc: "Optimista", trait: "I" },
  { opc: "Emocional", trait: "I" },
  { opc: "Comunicativo", trait: "I" },
  { opc: "Carismático", trait: "I" },
  { opc: "Inspirador", trait: "I" },
  { opc: "Amable", trait: "I" },
  { opc: "Espontáneo", trait: "I" },
  { opc: "Alegre", trait: "I" },

  { opc: "Pacífico", trait: "S" },
  { opc: "Diplomático", trait: "S" },
  { opc: "Fiable", trait: "S" },
  { opc: "Leal", trait: "S" },
  { opc: "Estable", trait: "S" },
  { opc: "Comprensivo", trait: "S" },
  { opc: "Paciente", trait: "S" },
  { opc: "Buen oyente", trait: "S" },
  { opc: "Solidario", trait: "S" },
  { opc: "Cooperativo", trait: "S" },
  { opc: "Discreto", trait: "S" },
  { opc: "Constante", trait: "S" },

  { opc: "Analítico", trait: "C" },
  { opc: "Detallista", trait: "C" },
  { opc: "Metódico", trait: "C" },
  { opc: "Preciso", trait: "C" },
  { opc: "Escéptico", trait: "C" },
  { opc: "Razonable", trait: "C" },
  { opc: "Reservado", trait: "C" },
  { opc: "Conservador", trait: "C" },
  { opc: "Sistemático", trait: "C" },
  { opc: "Prudente", trait: "C" },
  { opc: "Perfeccionista", trait: "C" },
  { opc: "Lógico", trait: "C" },
];

const correctas = {
  pregunta1: "1",
  pregunta2: "2",
  pregunta3: "2",
  pregunta4: "1",
  pregunta5: "2",
  pregunta6: "2",
  pregunta7: "1",
  pregunta8: "1",
  pregunta9: "1",
  pregunta10: "2",
  pregunta11: "1",
  pregunta12: "2",
  pregunta13: "1",
  pregunta14: "1",
  pregunta15: "1",
  pregunta16: "1",
  pregunta17: "1",
  pregunta18: "1",
  pregunta19: "2",
  pregunta20: "1",
};
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
const modalResultadoActividad = document.getElementById(
  "modalResultadoActividad"
);

const modalMessage = document.getElementById("modalMessage");
const audioIntroSource = document.getElementById("audiointroSource");
const textAudio = document.getElementById("textAudio");
const sectionAudio = document.getElementById("sectionAudio");

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  mostrarTab(`tab-presentacion.html`);
});

document.addEventListener("click", async function (e) {
  if (e.target && e.target.id === "btnStart") {
    e.preventDefault();
    diapositiva = 1;
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
        "Debe completar el elemento 1 antes de continuar con el siguiente paso.";
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
      "Para acceder a la siguiente sección, complete los pasos que se muestran por fecha en el orden correcto.";
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
      // dontShowAgainLabel: "No mostrar esto nuevamente",
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

    /*   if (dontShowAgainContainer) {
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
    if (diapositiva === 31) {
      initDragAndDrop();
    }

    if (diapositiva === 1) {
      if (!contenedorPrincipal.classList.contains("flex-column")) {
        contenedorPrincipal.classList.add("flex-column");
      }
    }

    if (diapositiva > 1) {
      if (contenedorPrincipal.classList.contains("flex-column")) {
        contenedorPrincipal.classList.remove("flex-column");
      }
    }
  } catch (error) {
    console.log("error", error);
  }
}

function calcularProgreso() {
  let porcentaje = (diapositiva / totalDiapositivas) * 100;
  let valor = Math.round(porcentaje);
  progressBar.style.width = `${valor}%`;
  progressBar.innerText = `${valor}%`;

  /* if (valor === 100) {
    console.log("Curso finalizado");
    setTimeout(() => {
      console.log("Mostrar finalizado");
      new bootstrap.Modal(modalFinalizar).show();
    }, 5000);
    finalizado.value = "SI";
    completaCourse(1);
  } */
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

  console.log("diapositiva en intro", diapositiva);

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

/* Drag -Drop */

function obtenerTodasLasOpcionesAleatorias() {
  const opciones = [...opcionesDragDrop];

  for (let i = opciones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
  }

  return opciones;
}

function initDragAndDrop() {
  const opciones = obtenerTodasLasOpcionesAleatorias();
  const contenedor = document.getElementById("traits-source");
  contenedor.innerHTML = "";
  let currentDrag = null;

  opciones.forEach((opcion, i) => {
    const elemento = document.createElement("div");
    elemento.className = "col-md-12 mb-1 p-1 bg-light border rounded";
    elemento.setAttribute("draggable", "true");
    elemento.setAttribute("data-trait", opcion.trait);
    elemento.setAttribute("id", `opcionDragDrop${i + 1}`);
    elemento.setAttribute("data-num", i + 1);
    elemento.textContent = opcion.opc;

    elemento.addEventListener("dragstart", function (e) {
      currentDrag = this;
      e.dataTransfer.setData("text/plain", this.textContent);
      e.dataTransfer.setData("trait-type", this.getAttribute("data-trait"));
      e.dataTransfer.setData("id", this.getAttribute("data-num"));
      setTimeout(() => {
        this.style.display = "none";
      }, 0);
    });

    elemento.addEventListener("dragend", function () {
      if (this.style.display === "none") {
        this.style.display = "block";
      }
      currentDrag = null;
    });

    contenedor.appendChild(elemento);
  });

  const dropZones = document.querySelectorAll(".drop-zone");
  const checkButton = document.getElementById("check-button");
  const feedbackArea = document.getElementById("feedback-area");
  const traitSource = document.getElementById("traits-source");
  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.style.backgroundColor = "#f0f8ff";
    });

    zone.addEventListener("dragleave", function () {
      this.style.backgroundColor = "";
    });

    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      this.style.backgroundColor = "";
      const text = e.dataTransfer.getData("text/plain");
      const traitType = e.dataTransfer.getData("trait-type");
      const id = e.dataTransfer.getData("id");

      const newTrait = document.createElement("div");
      newTrait.className = "mb-2 p-2 bg-light border rounded position-relative";
      newTrait.setAttribute("data-trait", traitType);
      newTrait.setAttribute("data-num", id);
      newTrait.innerHTML = text;

      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-sm btn-danger position-absolute";
      removeBtn.style.top = "5px";
      removeBtn.style.right = "5px";
      removeBtn.innerHTML = "×";
      removeBtn.addEventListener("click", function () {
        const original = document.createElement("div");
        original.className = "col-md-12 mb-1 p-1 bg-light border rounded";
        original.setAttribute("draggable", "true");
        original.setAttribute("data-trait", traitType);
        original.setAttribute("id", `opcionDragDrop${id}`);
        original.setAttribute("data-num", id);
        original.textContent = text;
        original.addEventListener("dragstart", function (e) {
          currentDrag = this;
          e.dataTransfer.setData("text/plain", this.textContent);
          e.dataTransfer.setData("trait-type", this.getAttribute("data-trait"));
          e.dataTransfer.setData("id", this.getAttribute("data-num"));
          setTimeout(() => {
            this.style.display = "none";
          }, 0);
        });

        original.addEventListener("dragend", function () {
          if (this.style.display === "none") {
            this.style.display = "block";
          }
          currentDrag = null;
        });

        traitSource.appendChild(original);

        newTrait.remove();
      });

      newTrait.appendChild(removeBtn);
      this.appendChild(newTrait);

      if (currentDrag && !traitSource.contains(currentDrag)) {
        currentDrag.remove();
      }
      document.getElementById(`opcionDragDrop${id}`).remove();
    });
  });

  checkButton.addEventListener("click", function () {
    document
      .querySelectorAll(".feedback-icon")
      .forEach((icon) => icon.remove());

    let allCorrect = true;
    let anyEmpty = false;

    dropZones.forEach((zone) => {
      const zoneType = zone.getAttribute("data-type");
      const items = zone.querySelectorAll("[data-trait]");

      if (items.length === 0) {
        anyEmpty = true;
        return;
      }

      items.forEach((item) => {
        const traitType = item.getAttribute("data-trait");
        const isCorrect = traitType === zoneType;

        const icon = document.createElement("span");
        icon.className = "feedback-icon position-absolute";
        icon.style.top = "5px";
        icon.style.right = "35px";
        icon.style.color = isCorrect ? "green" : "red";
        icon.innerHTML = isCorrect ? "✓" : "✗";

        item.appendChild(icon);

        if (!isCorrect) {
          allCorrect = false;
        }
      });
    });

    if (anyEmpty) {
      feedbackArea.innerHTML =
        '<div class="alert alert-warning">Please complete all sections before checking.</div>';
    } else if (allCorrect) {
      feedbackArea.innerHTML =
        '<div class="alert alert-success">All answers are correct! Well done!</div>';
    } else {
      feedbackArea.innerHTML =
        '<div class="alert alert-danger">Some traits are in the wrong category. Check the items marked with ✗.</div>';
    }
  });
}

function ResponderA() {
  const preguntas = Object.keys(correctas);
  let respuestas = {};
  let score = 0;

  preguntas.forEach((pregunta) => {
    const selected = document.querySelector(
      `input[name="${pregunta}"]:checked`
    );
    if (selected) {
      respuestas[pregunta] = selected.value;
      if (selected.value === correctas[pregunta]) {
        score++;
      }
    }
  });

  const totalPreguntas = preguntas.length;
  const percentage = (score / totalPreguntas) * 100;
  let porcentaje = (diapositiva / totalDiapositivas) * 100;
  let valor = Math.round(porcentaje);
  resultadoActividad(percentage, score, totalPreguntas);
}

function resultadoActividad(percentage, score, totalPreguntas) {
  const modalResultadoActividadContenido = document.getElementById(
    "modalResultadoActividadContenido"
  );
  modalResultadoActividadContenido.innerHTML = "";
  let src =
    percentage >= 80 ? "./assets/img/feliz.png" : "./assets/img/triste.png";
  let mensaje = `<p style='font-size: 16px !important;'>Gracias por participar en la actividad. Has obtenido <b>${score}</b> fuera de <b>${totalPreguntas}</b> respuestas correctas.</p>
                  <img style='width: 200px; margin: auto; display: block;' src='${src}' />`;
  modalResultadoActividadContenido.innerHTML = mensaje;
  new bootstrap.Modal(modalResultadoActividad).show();

  if (percentage >= 80) {
    console.log("Modulo finalizado");
    setTimeout(() => {
      new bootstrap.Modal(modalFinalizar).show();
    }, 5000);
    finalizado.value = "SI";
    completaCourse(1);
  }
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
}