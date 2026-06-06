// 3. Crear un servicio de Log utilizando el patron Modular

const fs = require('fs');
const path = require('path');

const Logger = (function () {

    let nivel = 'info'; // 'info' (por default), 'warn' o 'error'

    let salida = 'console'; // 'console' (por default) o 'file'

    // Archivo a usar cuando la salida es 'file'
    let archivo = path.join(__dirname, 'loggeo.txt');

    function nivelPermitido(tipo) {
        if (nivel === 'error') {
            // Solo dejamos pasar errores.
            if (tipo === 'error') {
                return true;
            } else {
                return false;
            }
        } else if (nivel === 'warn') {
            // Dejamos pasar warnings y errores pero no info
            if (tipo === 'error') {
                return true;
            } else if (tipo === 'warn') {
                return true;
            } else {
                return false;
            }
        } else {
            // nivel es 'info' entonces dejamos pasar todos los mensajes
            return true;
        }
    }

    //Vi que los logs suelen decir la fecha y nivel además del mensaje, entonces 
    // los incluí en esta función que te arma el mensaje
    function armarMensaje(tipo, mensaje) {
        let fecha = new Date().toISOString(); 
        let tipoEnMayusculas = tipo.toUpperCase();
        return '[' + fecha + '] [' + tipoEnMayusculas + '] ' + mensaje;
    }

    function enviarMensaje(tipo, mensaje) {
        if (nivelPermitido(tipo) === false) {
            return;
        }

        let linea = armarMensaje(tipo, mensaje);

        if (salida === 'file') {
            fs.appendFileSync(archivo, linea + '\n');
        } else {
            // Salida por consola.
            if (tipo === 'error') {
                console.error(linea);
            } else if (tipo === 'warn') {
                console.warn(linea);
            } else {
                console.log(linea);
            }
        }
    }

    return {
        info: function (mensaje) {
            enviarMensaje('info', mensaje);
        },
        warn: function (mensaje) {
            enviarMensaje('warn', mensaje);
        },
        error: function (mensaje) {
            enviarMensaje('error', mensaje);
        },

        configurar: function (opciones) {
            if (opciones.nivel !== undefined) {
                nivel = opciones.nivel;
            }
            if (opciones.salida !== undefined) {
                salida = opciones.salida;
            }
            if (opciones.archivo !== undefined) {
                archivo = opciones.archivo;
            }
        },

        obtenerConfig: function () {
            return { nivel: nivel, salida: salida};
        }
    };
})();


// Ejemplo probando los niveles de logueo y las formas de salida

console.log('Nivel error (solo deja pasar errores), salida consola');
Logger.configurar({ nivel: 'error', salida: 'console' });
Logger.info('Este info NO se muestra');
Logger.warn('Este warn NO se muestra');
Logger.error('Este error SI se muestra');
console.log('Config usada:', Logger.obtenerConfig());

console.log('\nNivel warn (deja pasar warnings y errores), salida archivo');
Logger.configurar({ nivel: 'warn', salida: 'file' });
Logger.info('Este info NO se muestra');
Logger.warn('Este warn SI se muestra');
Logger.error('Este error SI se muestra');
console.log('Config usada:', Logger.obtenerConfig());

console.log('\nNivel info (deja pasar todos los mensajes), salida consola');
Logger.configurar({ nivel: 'info', salida: 'console' });
Logger.info('Este info SI se muestra');
Logger.warn('Este warn SI se muestra');
Logger.error('Este error SI se muestra');
console.log('Config usada:', Logger.obtenerConfig());


module.exports = Logger;
