// ==================== LÓGICA DE NEGOCIO ====================

import { WOMPI_CONFIG } from "./config.js";

// 🧠 AGENTE
export async function enviarMensaje(mensaje) {
    const texto = mensaje.toLowerCase();

    if (texto.includes("pierna")) {
        return "🔥 Tengo una rutina de piernas disponible. Puedes comprarla y acceder al video completo.";
    }

    if (texto.includes("hola")) {
        return "👋 Hola, ¿qué deseas entrenar hoy?";
    }

    return "💬 Puedo ayudarte con rutinas de piernas y más.";
}

// 🔐 ACCESO
export function tieneAcceso(modulo) {
    return localStorage.getItem("acceso_" + modulo) === "true";
}

export function activarAcceso(modulo) {
    localStorage.setItem("acceso_" + modulo, "true");
}

// 💳 PAGO WOMPI (CORREGIDO)
export function iniciarPagoWompi() {
    window.location.href = "https://checkout.wompi.co/l/test_Jjky1h  link"
}