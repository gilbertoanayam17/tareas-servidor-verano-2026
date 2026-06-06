// 4. Benchmark de Metodos de Arreglos

// Me invente una situacion donde se crean n hoteles con un numero de estrellas
// del 1 al 5, y las tres alternativas deben filtrar los de 3 estrellas o mas
// y calcularles el precio final con el recargo (suponiendo que cada estrella suma 250 al precio base).

function generarHoteles(n) {
    let hoteles = [];
    for (let i = 0; i < n; i++) {
        // van rotando segun el indice
        let estrellas = (i % 5) + 1;

        hoteles.push({
            id: i,
            estrellas: estrellas,
            precio: 750 + i
        });
    }
    return hoteles;
}

// Filter y map
function conFilterMap(hoteles) {
    let buenos = hoteles.filter(function (hotel) {
        if (hotel.estrellas >= 3) {
            return true;
        } else {
            return false;
        }
    });
    let conRecargo = buenos.map(function (hotel) {
        return hotel.precio + hotel.estrellas * 250;
    });
    return conRecargo;
}

// Reduce
function conReduce(hoteles) {
    let resultado = hoteles.reduce(function (acumulado, hotel) {
        if (hotel.estrellas >= 3) {
            acumulado.push(hotel.precio + hotel.estrellas * 250);
        }
        return acumulado;
    }, []);
    return resultado;
}

// Ciclos for para recorrer y filtrar
function conForLoop(hoteles) {
    let resultado = [];
    for (let i = 0; i < hoteles.length; i++) {
        if (hoteles[i].estrellas >= 3) {
            resultado.push(hoteles[i].precio + hoteles[i].estrellas * 250);
        }
    }
    return resultado;
}

function correrBenchmark(n) {
    let hoteles = generarHoteles(n);

    // medición filter y map
    let inicio1 = performance.now();
    conFilterMap(hoteles);
    let tiempoFilterMap = performance.now() - inicio1;

    // medición reduce
    let inicio2 = performance.now();
    conReduce(hoteles);
    let tiempoReduce = performance.now() - inicio2;

    // medición for
    let inicio3 = performance.now();
    conForLoop(hoteles);
    let tiempoFor = performance.now() - inicio3;

    console.log('\nVolumen de ' + n + ' hoteles ');
    console.log('filter y map -> ' + tiempoFilterMap.toFixed(3) + ' ms');
    console.log('reduce       -> ' + tiempoReduce.toFixed(3) + ' ms');
    console.log('for loop     -> ' + tiempoFor.toFixed(3) + ' ms');
}


// Ejemplo/Prueba

let volumenes = [10000, 100000, 1000000, 10000000];
for (let i = 0; i < volumenes.length; i++) {
    correrBenchmark(volumenes[i]);
}

/*Filter y map recorre el arreglo dos veces y crea uno intermedio, mientras que 
reduce y el for lo recorren nomas una vez. Con esto y los resultados obtenidos
(priorizando los de mayor volumen) filter y map es la alternativa más lenta (pero más intuitiva), 
reduce queda en medio (una sola pasada, pero con el costo del callback por
elemento) y usar ciclos for para recorrer y filtrar es la mas rapida.*/

