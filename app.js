const API_KEY = 'Ch2f27qu0nmvSC1mDMjbajaLDB86m6dS';
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
        
    }
}