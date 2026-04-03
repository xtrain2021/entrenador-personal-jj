import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 🔐 LLAVE PRIVADA DESDE RENDER
const WOMPI_PRIVATE_KEY = process.env.WOMPI_PRIVATE_KEY;

// 🔍 VERIFICAR PAGO REAL
app.get("/verificar-pago", async (req, res) => {

```
const transactionId = req.query.id;

if (!transactionId) {
    return res.status(400).json({ error: "Falta ID" });
}

try {
    const response = await fetch(
        `https://sandbox.wompi.co/v1/transactions/${transactionId}`,
        {
            headers: {
                Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`
            }
        }
    );

    const data = await response.json();

    res.json({
        status: data.data.status
    });

} catch (error) {
    res.status(500).json({ error: "Error verificando pago" });
}
```

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
console.log("Servidor corriendo en puerto", PORT);
});
