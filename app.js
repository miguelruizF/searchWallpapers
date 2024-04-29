const API_KEY = 'YTAOCcimduPb1D1DcXbbNzkDoKYI1DTj';
const d = document;
const resultado = d.querySelector("#resultados");
const paginacion = d.querySelector("#paginacion");
const formulario =  d.querySelector("#formulario");

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
    const url = `https://api.giphy.com/v1/stickers/search?api_key=${key}&q=${termino}`; 
    // console.log(url);
    //Fetch a la url
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            const {data} = resultado;
            const gifs = data.map( img => ({
                id: img.id,
                title: img.title,
                url: img.images.downsized_medium.url,
            }));
            console.log(gifs);
        })

}