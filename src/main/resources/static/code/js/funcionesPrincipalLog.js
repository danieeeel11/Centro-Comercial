$('document').ready(function (){
    getCliente();
});
let nameCliente = window.localStorage.getItem('name_Cliente')
function getCliente(){
    /*${window.localStorage.getItem('name_Cliente')}*/
    let code = `Bienvenido ${nameCliente}`;
    console.log(localStorage.getItem('id_Cliente'))
    $("#saludo").html(code);
}

function removeCliente() {
    window.localStorage.setItem('name_Cliente',null);
    window.localStorage.setItem('id_Cliente',null);
}