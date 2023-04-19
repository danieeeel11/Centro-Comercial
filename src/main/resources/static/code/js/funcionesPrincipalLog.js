$('document').ready(function (){
    getCliente();
});
let nameCliente = window.localStorage.getItem('name_Cliente')
function getCliente(){
    /*${window.localStorage.getItem('name_Cliente')}*/
    let code = `Bienvenido ${nameCliente}`;
    console.log(code);
    $("#saludo").html(code);
}

function removeCliente() {
    window.localStorage.setItem('name_Cliente',"");
}