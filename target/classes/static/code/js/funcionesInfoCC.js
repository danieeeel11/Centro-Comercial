$('document').ready(function (){
    getId();
});

function getId(){
    let dato = window.localStorage.getItem('id');
    console.log(dato);
    $.ajax({
        url: "/api/CC/"+dato,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintInfo(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + dato + ' ' + errorThrown);
        }
    });
}

function paintInfo(data){
    let code= [];
    let linksFotos = data.foto.split(", ");
    let htmlFotos = [];
    for (i = 0; i < linksFotos.length; i++) {
        /*htmlFotos = htmlFotos + `<div class="slider_content">
                                            <img src="${linksFotos[i]}" alt="">
                                        </div>`;*/
        htmlFotos.push(`<img src="${linksFotos[i]}" alt="">`);
    }
    /*code = `<div class="sec_info_sup">
                                <div class="sec_logo" style="background-image:url('${data.logo}')">
                                </div>
                                <div class="sec_name">
                                  <p class="txt_name"> ${data.nombre} </p>
                                </div>
                                </div>
                                <div class="sec_info_mid">
                                <div class="sec_mid1">
                                  <div class="sec_images">

                                  </div>
                                  <p class="txt_info"> ${data.direccion} </p>
                                </div>
                                <div class="sec_mid2">
                                  <div class="sec_maps">
                                    <iframe src=" ${data.vinculo} " width="100%" height="100%" style="border-radius:20px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                  </div>
                                  <p class="txt_info">Mapa</p>
                                </div>
                                </div>
                                <div class="sec_info_bot">
                                <div class="sec_horario">
                                  <p class="txt_info" style="font-size:12px;"> ${data.horario} </p>
                                </div>
                                <div class="sec_btnes">
                                  <a class="btn tiendas">Tiendas</a>
                                  <a class="btn mapIn">Mapa Interactivo</a>
                                </div>
                            </div>`;*/
    code.push(
        `<div class="sec_logo" style="background-image:url('${data.logo}')">
        </div>
        <div class="sec_name">
            <p class="txt_name"> ${data.nombre} </p>
        </div>`
    );
    code.push(
        `${data.direccion}`
    );
    code.push(
        `<iframe src=" ${data.vinculo} " width="100%" height="100%" style="border-radius:20px; border:0;" allowFullScreen=""
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`
    );
    code.push(
        `<p class="txt_info" style="font-size:12px;"> ${data.horario} </p>`
    );

    $("#insert1").html(code[0]);
    $("#insertImage1").html(htmlFotos[0]);
    $("#insertImage2").html(htmlFotos[1]);
    $("#insertImage3").html(htmlFotos[2]);
    $("#insertImage4").html(htmlFotos[3]);
    $("#insert2").html(code[1]);
    $("#insert3").html(code[2]);
    $("#insert4").html(code[3]);
}