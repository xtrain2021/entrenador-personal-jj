const express = require("express");
const app = express();

app.use(express.json());

// 🔐 WEBHOOK WOMPI
app.post("/wompi-webhook", (req, res) => {
    const event = req.body;

    console.log("Evento recibido:", event);

    if (event.event === "transaction.updated") {

        const transaction = event.data.transaction;

        if (transaction.status === "APPROVED") {
            console.log("✅ Pago aprobado:", transaction.id);
        }
    }

    res.sendStatus(200);
});

// 🔍 VERIFICAR PAGO
app.get("/verificar", (req, res) => {
    res.json({ aprobado: true });
});

// 🚀 IMPORTANTE PARA RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});