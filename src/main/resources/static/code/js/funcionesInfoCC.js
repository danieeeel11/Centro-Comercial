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
        `<p class="txt_info" style="font-size:18px;"> ${data.horario} </p>`
    );

    $("#insert1").html(code[0]);
    $("#insertImage1").html(htmlFotos[0]);
    $("#insertImage2").html(htmlFotos[1]);
    $("#insertImage3").html(htmlFotos[2]);
    $("#insertImage4").html(htmlFotos[3]);
    $("#insertImage5").html(htmlFotos[4]);
    $("#insert2").html(code[1]);
    $("#insert3").html(code[2]);
    $("#insert4").html(code[3]);
}