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

// 🔍 OBTENER PARÁMETRO
const params = new URLSearchParams(window.location.search);
const modulo = params.get("modulo");

const videoPlayer = document.getElementById("videoPlayer");
const titulo = document.getElementById("tituloVideo");

// 🔒 VALIDAR ACCESO
if (!modulo || localStorage.getItem("acceso_" + modulo) !== "true") {
    alert("🔒 No tienes acceso a esta rutina");
    window.location.href = "index.html";
} else {

    const data = videos[modulo];

    if (data) {
        titulo.innerText = data.nombre;
        videoPlayer.src = VIDEO_PATH + data.archivo;
    }
}

// 🔙 VOLVER
window.volver = function () {
    window.location.href = "index.html";
};