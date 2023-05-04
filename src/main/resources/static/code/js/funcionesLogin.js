function iniciarSesion() {
    var usuario = $("#user").val();
    var password = $("#password").val();
    if (!usuario || !password) {
        alert("Por favor ingrese usuario y contraseña");
        return;
    }

    $.ajax({
        //url: "/api/Cliente/ingresar/" + usuario + "/" + password,
        url: "/api/auth/authenticate",
        type:"POST",
        dataType: "JSON",
        success: function (respuesta) {
            if (respuesta.usuario != null) {
                Cookies.set('token', respuesta.token)
                window.location.replace("/code/principal/principalLog.html");
            } else {
                alert("No existe el usuario o la contraseña es incorrecta");
            }
        },
        error: function (xhr, respuesta) {
            alert("Datos incorrectos o aun no se ha registrado.");
        },
    });
}
