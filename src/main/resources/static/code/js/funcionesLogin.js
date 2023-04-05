function iniciarSesion() {
    var usuario = $("#user").val();
    var password = $("#password").val();
    console.log(password);
    if (!usuario || !password) {
        alert("Por favor ingrese usuario y contraseña");
        return;
    }

    $.ajax({
        url: "/api/Cliente/ingresar/" + usuario + "/" + password,
        dataType: "JSON",
        success: function (respuesta) {
            if (respuesta.usuario != null) {
                window.open("http://localhost:8080", "_self");
            } else {
                alert("No existe el usuario o la contraseña es incorrecta");
            }
        },
        error: function (xhr, respuesta) {
            alert("Datos incorrectos o aun no se ha registrado.");
        },
    });
}
