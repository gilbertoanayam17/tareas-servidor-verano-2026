// 2. Counter Closure

function crearContador() {
    let total = 0;

    return {
        incrementar: function() {
            total = total + 1;
        },
        disminuir: function() {
            total = total - 1;
        },
        reset: function() {
            total = 0;
        },
        obtenerCuenta: function() {
            return total;
        }
    };
}


// Ejemplo 

const contador = crearContador();

contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.disminuir();

console.log('Cuenta despues de llamar incrementar 3 veces y disminuir 1:', contador.obtenerCuenta());

contador.reset();
console.log('Cuenta despues de resetear:', contador.obtenerCuenta());

console.log('Valor de total si queremos acceder a el directamente:', contador.total);
