// 5. Busqueda de datos dentro de Arreglos de Objetos

const usuarios = [
  { id: 1, nombre: "Gilberto", correo: "gilbertoam@gmail.com" },
  { id: 2, nombre: "Alejandro", correo: "alexoa@outlook.com" },
  { id: 3, nombre: "Julio", correo: "julioagh@hotmail.com" }
];

// Forma 1: ciclos
function buscarConFor(usuarios, correo) {
    for (let i = 0; i < usuarios.length; i++) { //n
        if (usuarios[i].correo === correo) {
            return usuarios[i];
        }
    }
    return undefined;
}//O(n)

let searchingExistingMailWithFor = buscarConFor(usuarios, "gilbertoam@gmail.com");
console.log(searchingExistingMailWithFor);
let searchingNonExistingMailWithFor = buscarConFor(usuarios, "lol@gmail.com");
console.log(searchingNonExistingMailWithFor);


// Forma 2: metodo find
function buscarConFind(usuarios, correo) {
    let encontrado = usuarios.find(function (user) { //n
        if (user.correo === correo) {
            return true;
        } else {
            return false;
        }
    });
    return encontrado;
}//O(n)

let searchingExistingMailWithFind = buscarConFind(usuarios, "julioagh@hotmail.com");
console.log(searchingExistingMailWithFind);
let searchingNonExistingMailWithFind = buscarConFind(usuarios, "lol2@gmail.com");
console.log(searchingNonExistingMailWithFind);

// Forma 3: precomputo/preprocesamiento de los datos para poder indexar los resultados
function crearIndicePorCorreo(usuarios) {
    let indice = {};
    for (let i = 0; i < usuarios.length; i++) { //n
        let correo = usuarios[i].correo;
        indice[correo] = usuarios[i];
    }
    return indice;
}//O(n)

function buscarEnIndice(indice, correo) {
    if (indice[correo] !== undefined) {
        return indice[correo];
    } else {
        return undefined;
    }
}//O(1)

let searchingExistingMailWithIndex = buscarEnIndice(crearIndicePorCorreo(usuarios), "alexoa@outlook.com");
console.log(searchingExistingMailWithIndex);
let searchingNonExistingMailWithIndex = buscarEnIndice(crearIndicePorCorreo(usuarios), "lol3@gmail.com");
console.log(searchingNonExistingMailWithIndex);

/* El ciclo for y el metodo find funcionan prácticamente igual ya que los dos recorren
el arreglo elemento por elemento hasta encontrar el correo, asi que ambos tardan
O(n) y se detienen apenas dan con el resultado. La diferencia sería mas de estilo que
de rendimiento, y yo percibo find más intuitivo que el for.

El precomputo/indexado es distinto, primero arma un objeto que usa el correo como
llave (eso cuesta O(n) una sola vez) y a partir de ahi cada busqueda es casi
inmediata (O(1)). La contra es que armar el indice cuesta tiempo y memoria, y hay
que volver a armarlo si los datos cambian.

Con esto, mi recomendacion sería que si solo vamos a buscar pocas veces o los datos
cambian seguido conviene usar find, porque es claro y simple. En cambio, si vamos a 
buscar muchas veces sobre los mismos datos lo mejor sería precomputar un indice, 
porque el costo inicial se recupera rapido y cada busqueda pasa a ser O(1), 
que es mejor a gran escala. */
