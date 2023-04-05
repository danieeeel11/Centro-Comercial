$('document').ready(function () {
    getCcs();
    //getClientes();
});

/**
* Método que obtiene los clientes y los muestra
* 
*/
function getClientes() {
    $.ajax({
        url: 'api/centrocomerical/clall',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintGames(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}
function saveClientes() {

    let cliente = {
        correo: $("#correo").val(),
        nombre: $("#nombre").val(),
        telefono: $("#telefono").val(),
        cc_favorito: $("#cc_favorito").val(),
        password: $("#password").val(),
        placa_vehiculo: $("#placa_vehiculo").val()
    }
    let dataToSend = JSON.stringify(cliente);
    $.ajax({
        url: 'api/centrocomerical/clsave',
        type: 'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            getClientes();

            $("#correo").val();
            $("#nombre").val();
            $("#telefono").val();
            $("#cc_favorito").val();
            $("#password").val();
            $("#placa_vehiculo").val();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

/**
* Método que obtiene los clientes y los muestra
* 
*/
function getCcs() {
    $.ajax({
        url: 'api/centrocomerical/ccAll',
        type: 'GET', 
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintCCs_secTend(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}
function saveCCs() {

    let centros_comerciales = {
        logo: $("#logo").val(),
        nombre: $("#nombre").val(),
        descripcion: $("#descripcion").val(),
        horario: $("#horario").val(),
        direccion: $("#direccion").val(),
        foto: $("#foto").val(),
        vinculo: $("#vinculo").val(),
        cordenadas: $("#cordenadas").val()
    }
    let dataToSend = JSON.stringify(cliente);
    $.ajax({
        url: 'api/centrocomerical/ccsave',
        type: 'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            getCcs();

            $("#logo").val();
            $("#nombre").val();
            $("#descripcion").val();
            $("#horario").val();
            $("#direccion").val();
            $("#foto").val();
            $("#vinculo").val();
            $("#cordenadas").val();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

function paintCCs_secTend(r) {
    let d = "";

    for (i = 0; i < r.length; i++) {
        d += `
                    <div class="ui card">
              <div class="image">
                <img src="${r[i].foto}">
              </div>
              <div class="content">
                <a class="header">${r[i].nombre}</a>
                <div class="meta">
                  <span class="date">direccion ${r[i].direccion}</span>
                </div>
                
              </div>
              <div class="extra content">
                <a>
                  <i class="user icon"></i>
                  $ ${r[i].price}
                </a>
              </div>
            </div>
         
        `;
    }
    $("#parrilla2").html(d);
}


function paintGames(r) {
    let d = "";

    for (i = 0; i < r.length; i++) {
        d += `
                    <div class="ui card">
              <div class="image">
                <img src="${r[i].linkImage}">
              </div>
              <div class="content">
                <a class="header">${r[i].nombre}</a>
                <div class="meta">
                  <span class="date">telefono ${r[i].telefono}</span>
                </div>
                
              </div>
              <div class="extra content">
                <a>
                  <i class="user icon"></i>
                  $ ${r[i].price}
                </a>
              </div>
            </div>
         
        `;
    }
    $("#parrilla").html(d);
}