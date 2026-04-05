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

export function iniciarPagoWompi() {

    const modulo = localStorage.getItem("moduloPendiente");

    if (!modulo) {
        alert("Error: no hay módulo seleccionado");
        return;
    }

    // 🔴 IMPORTANTE: cambia este link por el REAL de producción
    const linksProduccion = {
        modulo2: "https://checkout.wompi.co/l/TU_LINK_PROD_1",
        modulo3: "https://checkout.wompi.co/l/TU_LINK_PROD_2",
        modulo4: "https://checkout.wompi.co/l/TU_LINK_PROD_3",
        modulo5: "https://checkout.wompi.co/l/TU_LINK_PROD_4",
        modulo6: "https://checkout.wompi.co/l/TU_LINK_PROD_5",
        modulo7: "https://checkout.wompi.co/l/TU_LINK_PROD_6"
    };

    const link = linksProduccion[modulo];

    if (!link) {
        alert("No hay link de pago configurado");
        return;
    }

    window.location.href = link;
}
