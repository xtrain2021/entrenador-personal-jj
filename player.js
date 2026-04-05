import { VIDEO_PATH } from "./config.js";

// 🎥 MAPA DE VIDEOS
const videos = {
    modulo2: {
        nombre: "Funcional 1",
        archivo: "modulo2_funcional.mp4"
    },
    modulo3: {
        nombre: "Funcional 2",
        archivo: "modulo3_funcional.mp4"
    },
    modulo4: {
        nombre: "GAP",
        archivo: "modulo4_GAP.mp4"
    },
    modulo5: {
        nombre: "HIIT",
        archivo: "modulo5_cardio_hiit.mp4"
    },
    modulo6: {
        nombre: "Piernas y Glúteos",
        archivo: "modulo6_piernas_gluteos.mp4"
    },
    modulo7: {
        nombre: "Pecho y Espalda",
        archivo: "modulo7_pecho_espalda.mp4"
    }
};

// 🔍 PARAMETROS
const params = new URLSearchParams(window.location.search);
const modulo = params.get("modulo");

const videoPlayer = document.getElementById("videoPlayer");
const titulo = document.getElementById("tituloVideo");

// 🔐 DOBLE VALIDACIÓN (nivel pro)
function validarAcceso() {

    if (!modulo) {
        bloquear();
        return;
    }

    const acceso = localStorage.getItem("acceso_" + modulo);

    if (acceso !== "true") {
        bloquear();
        return;
    }

    // 🔥 SI TODO OK → cargar video
    const data = videos[modulo];

    if (data) {
        titulo.innerText = data.nombre;
        videoPlayer.src = VIDEO_PATH + data.archivo;
    } else {
        bloquear();
    }
}

// 🚫 BLOQUEO
function bloquear() {
    alert("🔒 Acceso restringido");
    window.location.href = "index.html";
}

// 🚨 PROTECCIÓN EXTRA (evita manipulación básica)
window.addEventListener("storage", () => {
    validarAcceso();
});

// 🚀 INICIO
validarAcceso();

// 🔙 VOLVER
window.volver = function () {
    window.location.href = "index.html";
};
