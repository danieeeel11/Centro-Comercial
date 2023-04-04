// Función para iniciar sesión
function iniciarSesion() {
    // Obtener los valores de usuario y contraseña
    var usuario = $("#user").val();
    var contrasena = $("#password").val();

    // Validar que ambos campos no estén vacíos
    if (usuario == "" || contrasena == "") {
        alert("Por favor, ingrese su usuario y contraseña.");
        return;
    }

    // Hacer la solicitud AJAX para iniciar sesión
    $.ajax({
        url: "api/Cliente/save",
        type: "POST",
        data: {
            usuario: usuario,
            contrasena: contrasena
        },
        success: function(response) {
            // Si la respuesta es "ok", redireccionar a la página principal
            if (response == "ok") {
                window.location.href = "index.html";
            } else {
                // Si la respuesta no es "ok", mostrar el mensaje de error
                alert(response);
            }
        }
    });
}