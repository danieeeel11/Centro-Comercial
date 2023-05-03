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
    let dato = window.localStorage.getItem('id');
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
    let lista_cc = dataTienda.id_cc.split(",");
    code.push(
        `<div class="sec_logo" style="background-image:url('${dataTienda.logo}')">
        </div>
        <div class="sec_name">
            <p class="txt_name"> ${dataTienda.nombre} </p>
        </div>`
    );
    let code_cc = "";
    let des_lat = 10;
    let des_top = 9;
    let fila=0;
    let conteo = 0;
    for (let i = 0; i < lista_cc.length; i++) {
        for (let j = 0; j < dataAllCC.length; j++) {
            if(lista_cc[i]==dataAllCC[j].id){
                if (conteo % 2 == 0 && conteo != 0){
                    des_lat = 10;
                    des_top += 50;
                    fila += 1;
                }
                code_cc += `
                    <a class="btn cuadroCC" href="../lista/infoCC.html" onclick="setId(${dataAllCC[j].id})" style="left:${des_lat}%; top:${des_top}%; background-image: url('${dataAllCC[j].logo}'); background-size:cover;">
                      <p class="txtBajo">${dataAllCC[j].nombre}</p>
                    </a>
                `;
                conteo++;
                des_lat += 50;
            }
        }
    }
    code.push(code_cc);
    code.push(
        `${dataTienda.tipo_productos}`
    );
    let code_productos = "";
    des_lat = 10;
    des_top = 9;
    fila=0;
    conteo = 0;
    for (let i = 0; i < nombres_productos.length; i++) {
        if (conteo % 2 == 0 && conteo != 0){
            des_lat = 10;
            des_top += 50;
            fila += 1;
        }
        code_productos += `
            <div class="cuadroProducto" style="left:${des_lat}%; top:${des_top}%; background-image: url('${linksFotos[i]}'); background-size:cover;">
              <p class="txtBajo" style="color: white; font-size: 16px; ">${nombres_productos[i]}</p>
            </div>
        `;
        conteo++;
        des_lat += 50;
    }
    code.push(code_productos);
    $("#insert1").html(code[0]);
    $("#grid-cc").html(code[1]);
    $("#insert_tipo_producto").html(code[2]);
    $("#grid-productos").html(code[3]);
}

function setId(id){
    window.localStorage.setItem('id', id);
}