var estado = 0;
const star = document.querySelector(".btn.star_cc");
function addFav() {
    if (estado == 0) {
        star.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
        estado = 1;
    } else {
        star.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
        estado = 0;
    }
}


function getCcs() {
    $.ajax({
        url: 'api/centrocomerical/ccall',
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
    $("#tendencias").html(d);
}