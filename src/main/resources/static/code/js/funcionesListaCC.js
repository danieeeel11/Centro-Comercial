// Obtener la lista de enlaces HTML desde la clase Controlador
var controlador = new Controlador();
// Crea una instancia de la clase Controlador
var listaEnlacesHtml = controlador.convertirAEnlacesHtml(); // Llama al método para obtener la lista de enlaces HTML

// Agregar los enlaces HTML al elemento div en la página
var listaEnlacesElemento = document.getElementById("lista-enlaces"); // Obtener el elemento div por su id
listaEnlacesHtml.forEach(function (enlaceHtml) { // Iterar a través de la lista de enlaces HTML
    listaEnlacesElemento.innerHTML += enlaceHtml; // Agregar cada enlace HTML al contenido del elemento div
});

