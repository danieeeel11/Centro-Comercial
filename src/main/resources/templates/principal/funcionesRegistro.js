function limpiarPantalla(){
    $(".sec_btn2").empty();
    let content ="<h3 class='iniciarSesion'>Registrate</h3>";
    content +=`
    <input class = "inputInicio" type="text" id="nombre" placeholder="Nombre">
    <input class = "inputInicio" type="text" id="correo" placeholder="Correo">
    <input class = "inputInicio" type="text" id="usuario" placeholder="Usuario">
    <input class = "inputInicio" type="password" id="password" placeholder="Contraseña">
    <button class="signup" onclick='agregarUsuario()'>Registrarse</button>`
    $(".sec_btn2").append(content);
}

function agregarUsuario(){
    let dataToSend = JSON.stringify(obtenerDatos());
    $.ajax({
        url:"/api/Cliente/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json",
        data:dataToSend,
        success:function(respuesta){
            localStorage.setItem("id_Cliente",respuesta.id_Cliente);
            window.open("/code/principal/paginaPrincipal.html", "_self");
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function iniciarSesion(){
    $.ajax({
        url:"/api/Cliente/ingresar/"+$("#nombre").val()+"/"+$("#contrasenia").val(),
        datatype:"JSON",
        success:function(respuesta){
            if(respuesta.usuario != null){
                localStorage.setItem("id_Cliente",respuesta.id_Cliente);
                window.open("../index.html", "_self");
            }else{
                alert("No existe el usuario o la contraseña es incorrecta")
            }
        },
        error:function(xhr, respuesta){
            alert("Error de peticion")
        }
    });
}

function obtenerDatos(){
    let data = {
        id_Cliente:$("#id_Cliente").val(),
        nombre:$("#nombre").val(),
        email:$("#email").val(),
        usuario:$("#usuario").val(),
        contrasenia:$("#contrasenia").val(),
    };
    return data;
}