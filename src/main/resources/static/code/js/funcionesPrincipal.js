$('document').ready(function () {
    getCarrusel();
    //paintGames();
});

window.onload = function () {
    getCarrusel();
};

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

function getCarrusel() {
    $.ajax({
        url: 'api/novedades/all',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintCarrusel(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}


function paintCarrusel(r) {
    let d = "";

    for (i = 0; i < r.length; i++) {
        d += `
        <div class='item'>
            <!--<div class='sec_tend_inicio'>-->
                <div class='cc_tit'>
                    <button class='btn tit_cc'>
                    <p class='txt_btn_tit_cc'>${r[i].nombre}</p>
                    </button>
                    <button class='btn star_cc' onclick="${addFav()}"></button>
                </div>
                <div class='tend_tit'>
                    <section>
                        <img src="" alt="">
                    </section>
                    <button class='btn tend'>${r[i].titular}</button>
                </div>
                <!--</div>-->
        </div>
        `;
    }
    $("#carousel").html(d);
}

function paintGames() {
    let d = "";

    for (i = 0; i < 3; i++) {
        d += `
                    <div class="ui card">
              <div class="image">
                <img src="">
              </div>
              <div class="content">
                <a class="header">Hola</a>
                <div class="meta">
                  <span class="date">Lanzado en 1</span>
                </div>
                
              </div>
              <div class="extra content">
                <a>
                  <i class="user icon"></i>
                  $ 100000
                </a>
              </div>
            </div>
         
        `;
    }
    $("#parrilla").html(d);
}