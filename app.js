const API_KEY = 'YTAOCcimduPb1D1DcXbbNzkDoKYI1DTj';
const d = document;
const resultado = d.querySelector("#resultados");
const paginacion = d.querySelector("#paginacion");
const formulario =  d.querySelector("#formulario");
const limiteImages = 20;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () =>{
    formulario.addEventListener("submit", validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();
    //validacion del termino de busqueda
    const terminoBusqueda = d.querySelector("#default-search").value;
    // console.log(terminoBusqueda);
    if(terminoBusqueda === ""){
        alert("Debes ingresar un termino");
        return;
    }

    //Funcion buscar imagenes
    buscarImagenes();
}

function buscarImagenes() {
    const termino = d.querySelector('#default-search').value;
    const key = API_KEY;
    const url = `https://api.giphy.com/v1/stickers/search?api_key=${key}&q=${termino}&limit=${limiteImages}&offset=${paginaActual}`; 
    // console.log(url);
    //Fetch a la url
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //console.log(resultado)
            totalPaginas = calcularPaginas(resultado.pagination.total_count)
            // console.log(resultado.pagination.total_count)
            const {data} = resultado;
            mostrarImagenes(data)
        })
}

//Generador de paginas
function *crearPaginador(total){
    for(let i =1; i<=total; i++){
        yield i;
    }
}

function calcularPaginas(total) {
    return parseInt(Math.ceil(total / limiteImages));
}


function mostrarImagenes(datos){
    //remueve el hijo si es que existe
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    //Creacion de hijos - imagenes
    datos.forEach(dato => {
        const {id, title, images:{downsized_medium:{url}}, images:{downsized_large:{urlLarge = url}}} = dato;
        //console.log(url);
        resultado.innerHTML += `
            <div class="gap-4">
                <div class="bg-white rounded-lg border border-gray-200 shadow cardDetails">
                    <img class="w-full h-auto" src="${url}">
                    <div class="p-4">
                        <p class="font-bold"><span class="font-light">${title}</span></p>

                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1 transition duration-300 ease-in-out hover:opacity-100" href="${urlLarge}" target="_blank" rel="noopener noreferrer">Ver Gif</a>
                    </div>
                </div>
            </div>
        `
    });

    //Limpiar paginacion
    while(paginacion.firstChild){
        paginacion.removeChild(paginacion.firstChild);
    }
    //Generar paginador
    imprimirPaginador();
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
    while(true){
        const {value, done} = iterador.next();
        if(done) return;
        //Caso contrario, generar botones
        const boton = d.createElement("a");
        boton.href="#";
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-blue-800', 'hover:bg-blue-500', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-10', 'rounded', 'text-white');
        
        boton.onclick = () =>{
            paginaActual = value;
            buscarImagenes();
        }
        paginacion.appendChild(boton);
    }
}