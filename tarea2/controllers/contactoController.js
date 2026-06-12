const path = require('path');

const CORREO_DESTINO = 'gilbertolegoland@gmail.com';

function showForm(req, res) {
    res.sendFile(path.join(__dirname, '..', 'views', 'contacto.html'));
}

function submitForm(req, res) {
    const nombre = (req.body.nombre || '').trim();
    const email = (req.body.email || '').trim();
    const asunto = (req.body.asunto || '').trim();
    const mensaje = (req.body.mensaje || '').trim();

    const errores = [];

    if (nombre.length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres.');
    }

    if (!email.includes('@')) {
        errores.push('El correo electrónico debe contener una arroba (@).');
    }

    if (mensaje.length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres.');
    }

    if (errores.length > 0) {
        return res.status(400).send('Formulario inválido: ' + errores.join(' '));
    }
    const origen = req.protocol + '://' + req.get('host');

    fetch('https://formsubmit.co/ajax/' + CORREO_DESTINO, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Referer: origen
        },
        body: JSON.stringify({
            name: nombre,
            email: email,
            _subject: asunto || 'Mensaje de ' + nombre,
            message: mensaje
        })
    })
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            if (datos.success !== 'true') {
                return res
                    .status(502)
                    .send('No se pudo enviar el mensaje: ' + datos.message);
            }
            res.sendFile(path.join(__dirname, '..', 'views', 'enviado.html'));
        })
        .catch((error) => {
            console.error('Error al enviar el formulario:', error);
            res.status(500).send('Hubo un error al enviar el mensaje, intentalo despues.');
        });
}

module.exports = {
    showForm,
    submitForm
};
