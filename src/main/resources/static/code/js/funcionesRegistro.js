function registrar(){

    let person={
        nombre : $("#name").val(),
        email : $("#email").val(),
        usuario : $("#user").val(),
        contrasenia : $("#password").val(),
    }
    let dataToSend=JSON.stringify(person);
    $.ajax({
        url: '/api/Cliente/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);

            $("#idClient").val("");
            $("#name").val("");
            $("#email").val("");
            $("#user").val("");
            $("#password").val("");
            localStorage.setItem("id_Cliente", respuesta.id_Cliente);

            window.open("/code/principal/principalLog.html", "_self");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}