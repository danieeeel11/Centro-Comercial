$('document').ready(function (){
    getId();
});
let dataAllCC=[];
let dataTienda=[];

function getCC(){
    $.ajax({
        url: '/api/CC/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataAllCC = data;
            paintInfo();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function getId(){
    let dato = window.localStorage.getItem('id_cc');
    console.log(dato);
    $.ajax({
        url: "/api/Tiendas/"+dato,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataTienda = data;
            getCC();
            //paintInfo(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + dato + ' ' + errorThrown);
        }
    });
}

function paintInfo(){
    let code= [];
    let linksFotos = dataTienda.imagenes_productos.split(", ");
    let nombres_productos = dataTienda.nombre_productos.split(", ");
    let htmlFotos = [];
    for (i = 0; i < linksFotos.length; i++) {
        htmlFotos.push(`<img src="${linksFotos[i]}" alt="">
                        <p>${nombres_productos[i]}</p>
                        `);
    }

    let lista_cc = dataTienda.id_cc.split(",");

    let sec = document.getElementById('fondo');
    /*sec.style.backgroundImage = `url("${dataTienda.logo}")`;*/
    sec.style.backgroundImage = `url("https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720")`;

    let code_cc = "";
    for (let i = 0; i < lista_cc.length; i++) {
        for (let j = 0; j < dataAllCC.length; j++) {
            if(lista_cc[i]==dataAllCC[j].id) {
                let linksFotos = dataAllCC[j].foto.split(", ");
                code_cc += `
                    <div class="sec_container">
                        <div class="sec_newBoton">
                            <a href="../lista/infoCC.html" onclick="setId(${dataAllCC[j].id})" class='btn newBoton' style="background-image:url('${linksFotos[0]}')">
                                <div class="sec_logo_cc" style="background-image:url('${dataAllCC[j].logo}')"></div>
                                <p class='txt_newBoton'> ${dataAllCC[j].nombre.toUpperCase()} </p>
                            </a>
                        </div>
                    </div>
                `;
            }
        }
    }
    code.push(code_cc);

    /*code.push(
        `${dataTienda.nombre}`
    );*/
    code.push(
        `<div class="imagen" style="background-image: url('${dataTienda.logo}')">
            <p class="txt_tit">${dataTienda.nombre.toUpperCase()}</p>
            <p class="txt_tipoProducto">${dataTienda.tipo_productos}</p>
        </div>
        `
    );
    /*code.push(
        `${dataTienda.tipo_productos}`
    );*/

    /*let code_productos = "";
    for (let i = 0; i < nombres_productos.length; i++) {
        code_productos += `
            <div class="sec_container">
                <div class="sec_newBoton">
                    <div class='btn newBoton' style="background-color: #bcbcbc;">
                        <div class="sec_logo_cc" style="background-image:url('${linksFotos[i]}')"></div>
                        <p class='txt_newBoton'> ${nombres_productos[i]} </p>
                    </div>
                </div>
            </div>
        `;
    }*/
    //code.push(code_productos);

    $("#insertGridCC").html(code[0]);
    /*$("#insertNombre").html(code[1]);*/
    $("#insertLogo").html(code[1]);
    /*$("#insertTipoProducto").html(code[3]);*/
    /*$("#insertGridProductos").html(code[3]);*/
    $("#insertImage1").html(htmlFotos[0]);
    $("#insertImage2").html(htmlFotos[1]);
    $("#insertImage3").html(htmlFotos[2]);
    $("#insertImage4").html(htmlFotos[3]);
}

function setId(id){
    window.localStorage.setItem('id', id);
}