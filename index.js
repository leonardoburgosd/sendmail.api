const express = require("express");
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    const html = `<html>
    <body>
        <h1>Bienvenido a mi primera App con NodeJS y Express - By. Leonardo Burgos</h1>
        <a href='https://leonardoburgosd.site' target='_blank'
        rel='noreferrer' >Ir a mi web </a>
    </body>
    </html>`;

    res.send(html);
});

app.post("/send", (req, res) => {
    console.log(req);
    const subject = req.body.subject;
    const description = req.body.description;
    const dataEnvio = {
        "from": "onboarding@resend.dev",
        "to": "notification.leonardo.burgos@gmail.com",
        "subject": subject,
        "html": description
    };
    const apiKey = process.env.KEYMESSAGE;

    axios.post('https://api.resend.com/emails', dataEnvio, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            res.status(200).json({ mensaje: 'Email enviado correctamente.' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Hubo un error en la operación', detalle: error.message });
        });

});

app.listen(port, () => {
    console.log(`port running in localhost:${port}`)
});