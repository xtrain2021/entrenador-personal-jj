// ==================== FRONTEND ====================

import { enviarMensaje, iniciarPagoWompi, tieneAcceso } from "./app.js";
import { VIDEO_PATH } from "./config.js";

const chatMessages = document.getElementById("chatMessages");
const enviarBtn = document.getElementById("enviarBtn");
const input = document.getElementById("mensajeUsuario");

// ===============================
// 💬 CHAT
// ===============================
function agregarMensaje(texto, tipo = "agent") {
    const div = document.createElement("div");
    div.innerText = texto;

    div.style.margin = "5px";
    div.style.padding = "8px";
    div.style.borderRadius = "10px";
    div.style.background = tipo === "user" ? "#3b82f6" : "#1e293b";
    div.style.color = "white";

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===============================
// 📩 ENVIAR MENSAJE (IA VENTAS)
// ===============================
enviarBtn.addEventListener("click", async () => {
    const mensaje = input.value.trim();
    if (!mensaje) return;

    agregarMensaje(mensaje, "user");

    const respuesta = await enviarMensaje(mensaje);

    let respuestaFinal = respuesta;
    const texto = mensaje.toLowerCase();

    // 🔥 GRASA
    if (texto.includes("bajar") || texto.includes("grasa") || texto.includes("definir")) {
        respuestaFinal += "\n\n🔥 Te recomiendo Cardio HIIT.\n👉 Escribe: comprar hiit";
    }

    // 🍑 TONIFICAR
    if (texto.includes("tonificar") || texto.includes("gluteo") || texto.includes("pierna")) {
        respuestaFinal += "\n\n🍑 Te recomiendo Piernas y Glúteos.\n👉 Escribe: comprar piernas";
    }

    // 💪 VOLUMEN
    if (texto.includes("volumen") || texto.includes("musculo") || texto.includes("fuerza")) {
        respuestaFinal += "\n\n💪 Te recomiendo Pecho y Espalda.\n👉 Escribe: comprar fuerza";
    }

    // 🚀 PRINCIPIANTE
    if (texto.includes("empezar") || texto.includes("principiante")) {
        respuestaFinal += "\n\n🚀 Empieza con Funcional 1.\n👉 Escribe: comprar funcional";
    }

    // 💳 COMPRAS
    if (texto.includes("comprar hiit")) comprar("modulo5");
    if (texto.includes("comprar piernas")) comprar("modulo6");
    if (texto.includes("comprar fuerza")) comprar("modulo7");
    if (texto.includes("comprar funcional")) comprar("modulo2");

    agregarMensaje(respuestaFinal);

    input.value = "";
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarBtn.click();
});

// ===============================
// 🎥 BOTONES
// ===============================
window.verRutina = function (video, modulo) {

    if (tieneAcceso(modulo)) {

        // 🎬 IR AL PLAYER PRO
        window.location.href = `player.html?modulo=${modulo}`;

    } else {
        alert("🔒 Debes comprar este módulo");
    }
};

window.comprar = function (modulo) {
    localStorage.setItem("moduloPendiente", modulo);
    window.location.href = "checkout.html";
};

// ===============================
// 🧠 VERIFICAR ACCESO
// ===============================
function verificarAccesos() {
    const modulos = document.querySelectorAll("[data-modulo]");

    modulos.forEach(moduloElemento => {
        const modulo = moduloElemento.getAttribute("data-modulo");

        const btnComprar = moduloElemento.querySelector(".btn-comprar");
        const btnVer = moduloElemento.querySelector(".btn-ver");

        if (localStorage.getItem("acceso_" + modulo) === "true") {
            if (btnComprar) btnComprar.style.display = "none";
            if (btnVer) btnVer.style.display = "inline-block";
        } else {
            if (btnComprar) btnComprar.style.display = "inline-block";
            if (btnVer) btnVer.style.display = "none";
        }
    });
}

// ===============================
// 🟢 EVENTO AL CARGAR
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    // 💳 DESBLOQUEO
    const paid = params.get("paid");

    if (paid === "true") {

        const modulo = localStorage.getItem("moduloPendiente");
    
        if (modulo) {
    
            // 🔓 Desbloquear
            localStorage.setItem("acceso_" + modulo, "true");
            localStorage.setItem("fecha_compra_" + modulo, new Date().toLocaleDateString());
    
            alert("✅ Pago confirmado. Abriendo tu rutina...");
    
            // 🎥 MAPEAR MÓDULOS A VIDEOS
            const videos = {
                modulo2: "modulo2_funcional.mp4",
                modulo3: "modulo3_funcional.mp4",
                modulo4: "modulo4_GAP.mp4",
                modulo5: "modulo5_cardio_hiit.mp4",
                modulo6: "modulo6_piernas_gluteos.mp4",
                modulo7: "modulo7_pecho_espalda.mp4"
            };
    
            const video = videos[modulo];
    
            if (video) {

                // 🎬 REDIRIGIR AL PLAYER
                window.location.href = `player.html?modulo=${modulo}`;
            }
        }
    
        // 🧹 limpiar
        localStorage.removeItem("moduloPendiente");
    
        // limpiar URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    verificarAccesos();

    // ===============================
    // 💬 CHAT TOGGLE
    // ===============================
    const chatToggle = document.getElementById("chatToggle");
    const chatContainer = document.getElementById("chatContainer");

    if (chatToggle && chatContainer) {
        chatToggle.addEventListener("click", () => {

            chatContainer.classList.toggle("chat-hidden");

            const abierto = !chatContainer.classList.contains("chat-hidden");

            chatToggle.innerText = abierto ? "✖" : "💬";

            if (abierto && chatMessages.children.length === 0) {
                agregarMensaje("🔥 ¿Qué quieres lograr?\n\n1️⃣ Bajar grasa\n2️⃣ Tonificar\n3️⃣ Ganar músculo\n\nEscríbeme tu objetivo 👇");
            }
        });
    }

    // ===============================
    // 🎥 OCULTAR CHAT EN VIDEO
    // ===============================
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {
        video.addEventListener("play", () => {
            if (chatContainer) chatContainer.style.display = "none";
        });

        video.addEventListener("pause", () => {
            if (chatContainer) chatContainer.style.display = "block";
        });
    });

});