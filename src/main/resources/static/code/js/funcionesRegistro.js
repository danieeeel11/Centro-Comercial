/*function limpiarPantalla(){
    $(".sec_btn2").empty();
    let content ="<h3 class='iniciarSesion'>Registrate</h3>";
    content +=`
    <input class = "inputInicio" type="number" id="id" placeholder="Cedula">
    <input class = "inputInicio" type="text" id="nombre" placeholder="Nombre">
    <input class = "inputInicio" type="text" id="correo" placeholder="Correo">
    <input class = "inputInicio" type="text" id="usuario" placeholder="Usuario">
    <input class = "inputInicio" type="password" id="password" placeholder="Contraseña">
    <button class="signup" onclick='saveCliente()'>Registrarse</button>`
    $(".sec_btn2").append(content);
}
function getClientes(){
    $.ajax({
        url: 'api/Cliente/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}
function saveCliente(){

    let person={
        id_Cliente:$("#id").val(),
        name:$("#nombre").val(),
        email:$("#correo").val(),
        user:$("#usuario").val(),
        password:$("#password").val()
    }
    let dataToSend=JSON.stringify(person);
    $.ajax({
        url: 'api/Cliente/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            getClientes();

            $("#id").val("");
            $("#nombre").val("");
            $("#correo").val("");
            $("#usuario").val("");
            $("#password").val("");
            window.open("/code//index.html", "_self");

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

function iniciarSesion(){
    $.ajax({
        url:"/api/Cliente/ingresar/"+$("#user").val()+"/"+$("#password").val(),
        datatype:"JSON",
        success:function(respuesta){
            if(respuesta.user != null){
                window.open("/code/index.html", "_self");
            }else{
                alert("No existe el usuario o la contraseña es incorrecta")
            }
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}*/



// Función para registrar un nuevo cliente
function registrar() {
    // Obtener los valores de usuario, contraseña y correo electrónico
    var id = $("#idClient").val();
    alert(id);
    var nombre = $("#name").val();
    var email = $("#email").val();
    var usuario = $("#user").val();
    var contrasena = $("#password").val();

    // Validar que todos los campos estén completos
    if (id == "" || nombre == "" ||email == "" || usuario == "" || contrasena == "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Hacer la solicitud AJAX para registrar al nuevo cliente
    $.ajax({
        url: "/api/Cliente/save",
        type: "POST",
        data: {
            "id_Cliente": id,
            "nombre": nombre,
            "email": email,
            "usuario": usuario,
            "contrasenia": contrasena
        },
        success: function(response) {
            // Si la respuesta es "ok", redireccionar a la página principal
            if (response == "ok") {
                window.location.href = "index.html";
            } else {
                // Si la respuesta no es "ok", mostrar el mensaje de error
                alert(response+ "errorrr");
            }
        }
    });
}
