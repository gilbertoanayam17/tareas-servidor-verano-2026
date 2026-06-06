// 1. Normalizacion de Datos

function normalizar(datos) {
    let resultado = {};

    // Recorrer el arreglo de datos
    for (let i = 0; i < datos.length; i++) {
        let usuario = datos[i];
        let id = usuario.id;

        if (resultado[id] === undefined) {
            // Primera vez que sale ese id entonces añadir todo
            resultado[id] = {
                id: usuario.id,
                name: usuario.name,
                roles: []
            };
            for (let j = 0; j < usuario.roles.length; j++) {
                resultado[id].roles.push(usuario.roles[j]);
            }
        } else {
            // Ya había salido ese id entonces agregar solo roles nuevos si es que hay
            for (let j = 0; j < usuario.roles.length; j++) {
                let rol = usuario.roles[j];

                let yaExisteRol = false;
                for (let k = 0; k < resultado[id].roles.length; k++) {
                    if (resultado[id].roles[k] === rol) {
                        yaExisteRol = true;
                    }
                }

                if (yaExisteRol === false) {
                    resultado[id].roles.push(rol);
                } else {

                }
            }
        }
    }

    return resultado;
}


// Ejemplo

const entrada = [
    { id: 1, name: 'Ana', roles: ['admin', 'editor'] },
    { id: 2, name: 'Luis', roles: ['editor'] },
    { id: 1, name: 'Ana', roles: ['viewer', 'editor'] } //le puse tambien editor para probar la de-duplicada de roles
];

console.log('Entrada sin datos normalizados:');
console.log(JSON.stringify(entrada, null, 2));

console.log('\nSalida con datos normalizados:');
console.log(JSON.stringify(normalizar(entrada), null, 2));
