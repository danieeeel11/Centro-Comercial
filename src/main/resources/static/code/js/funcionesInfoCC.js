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
        htmlFotos.push(`<img src="${linksFotos[i]}" alt="">`);
    }
    code.push(
        `<iframe src=" ${data.vinculo} " width="100%" height="100%" style="border-radius:20px; border:0;" allowFullScreen=""
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`
    );
    code.push(
        `${data.nombre.toUpperCase()}`
    );
    code.push(
        `<div class="imagen" style="background-image: url('${data.logo}')"></div>
        `
    );
    code.push(
        `${data.direccion}`
    );
    code.push(
        `${data.horario}`
    );

    let btn = document.getElementById('btn_tienda');
    btn.onclick = function() {
        setTiendaFilter(data.nombre);
    };
    let idCliente = localStorage.getItem("name_Cliente");
    if (idCliente == ""){
        btn.href = "../tiendas/ListaTienda_noLog.html";
    }else{
        btn.href = "../tiendas/ListaTiendas.html";
    }

    $("#insertMapa").html(code[0]);
    $("#insertNombre").html(code[1]);
    $("#insertLogo").html(code[2]);
    $("#insertImage1").html(htmlFotos[0]);
    $("#insertImage2").html(htmlFotos[1]);
    $("#insertImage3").html(htmlFotos[2]);
    $("#insertImage4").html(htmlFotos[3]);
    $("#insertDireccion").html(code[3]);
    $("#insertHorario").html(code[4]);
}

function setTiendaFilter(nombreCC) {
    window.localStorage.setItem('tiendaFilter', nombreCC);
}