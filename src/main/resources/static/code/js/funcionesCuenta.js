let id_Cliente = localStorage.getItem("id_Cliente");
let key = localStorage.getItem("contrasenia");
//let token = Cookies.get('token');
$('document').ready(function (){
    getCuenta();
});

let dataCuenta = [];

function getCuenta(){

    $.ajax({
        url: '/api/Cliente/'+id_Cliente,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataCuenta = data;
            paintCuenta();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}
function paintCuenta(){
    $('#user_name').html(`
        @${window.localStorage.getItem('user_cliente')}
        `
    );
    let sec = document.getElementById("name");
    sec.value = dataCuenta.nombre;
    sec.style.pointerEvents = "none";
    sec = document.getElementById("email");
    sec.value = dataCuenta.email;
    sec.style.pointerEvents = "none";
    sec = document.getElementById("user");
    sec.value = dataCuenta.usuario;
    sec.style.pointerEvents = "none";
    sec = document.getElementById("password");
    sec.value = dataCuenta.contrasenia;
    sec.style.pointerEvents = "none";
}

function actualizarInfo(){
    let sec = document.getElementById("name");
    sec.style.pointerEvents = "initial";
    sec = document.getElementById("email");
    sec.style.pointerEvents = "initial";
    sec = document.getElementById("user");
    sec.style.pointerEvents = "initial";
    sec = document.getElementById("password");
    sec.style.pointerEvents = "initial";

    let btn = document.getElementById("btn_editar");
    btn.style.display = "none";
    btn = document.getElementById("btn_actualizar");
    btn.style.display = "block";
    btn = document.getElementById("btn_aceptar");
    btn.style.display = "block";
}

function guardarActualizado(){
    let sec = document.getElementById("name");
    sec.style.pointerEvents = "none";
    sec = document.getElementById("email");
    sec.style.pointerEvents = "none";
    sec = document.getElementById("user");
    sec.style.pointerEvents = "none";
    sec = document.getElementById("password");
    sec.style.pointerEvents = "none";

    let btn = document.getElementById("btn_editar");
    btn.style.display = "block";
    btn = document.getElementById("btn_actualizar");
    btn.style.display = "none";
    btn = document.getElementById("btn_aceptar");
    btn.style.display = "none";

    let cliente={
        id_Cliente: parseInt(localStorage.getItem("id_Cliente")),
        nombre : $("#name").val(),
        email : $("#email").val(),
        usuario : $("#user").val(),
        contrasenia : $("#password").val()
    }
    console.log(cliente);

    //let dataToSend=JSON.stringify(cliente);
    $.ajax({
        url: '/api/Cliente/update',
        type:'PUT',
        data: JSON.stringify(cliente),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            alert("Los datos han sido actualizados");
            console.log('Cliente actualizado:', data);
            //window.open("../cuenta/cuenta.html");
            //window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}