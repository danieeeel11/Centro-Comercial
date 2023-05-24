$('document').ready(function (){
    getTiendas();
});
let dataAllTiendas = [];
let btnCategoriaActive = 0;
let secciones = [];
let nombresTiendas = [];
let atributosPos = []
function getTiendas(){
    $.ajax({
        url: '/api/Tiendas/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataAllTiendas = data;
            paintCC(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}

function paintCC(data){
    let code= "";
    let des_lat = 5;
    let des_top= 0;
    let fila = 0;
    let conteo = 0;
    for(let i=0;i<data.length;i++){
        if(conteo%4==0 && conteo!=0){
            des_lat = 5;
            fila += 1;
            des_top += 55;
        }
        code += `
            <div class="sec_btn_cc" style="left:${des_lat}%; top:${des_top}%;">
                <a href="../tiendas/InfoTiendas.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                   <p class='txt_btn_cc'> ${data[i].nombre} </p>
                </a>
            </div>
        `;
        atributosPos.push([des_lat + '%', des_top + '%']);
        conteo++;
        des_lat += 23;
    }
    secciones = document.getElementsByClassName('sec_btn_cc');
    nombresTiendas = document.getElementsByClassName('txt_btn_cc');
    $("#grid").html(code);
}

function busqueda(){ //nuevo
    let input = document.getElementById('name').value;
    input = input.toLowerCase();
    let data = secciones;
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (!nombresTiendas[i].innerHTML.toLowerCase().includes(input)) {
            data[i].style.display = "none";
        }
        else {
            //x[i].style.display="list-item";
            data[i].style.display = "initial";
            console.log(index);
            data[i].style.left = atributosPos[index][0];
            data[i].style.top = atributosPos[index][1];
            index++;
        }
    }
}

function setId(id){
    window.localStorage.setItem('id',id);
}
//let background_color_init = "";
function ventana_categorias(){
    //para que se bloquee el contenido
    let sec_contenido = document.getElementById("content");
    sec_contenido.style.pointerEvents = "none";
    background_color_init = document.body.style.backgroundColor + "";
    document.body.style.backgroundColor = "#808080";
    sec_contenido.style.filter = "opacity(5%)";
    //para que aparezca la ventana de categorias
    let sec_categorias = document.getElementById("sec_categorias");
    sec_categorias.style.display = "block";

    let categorias = [];
    for (let i = 0; i < dataAllTiendas.length; i++) {
        if(!categorias.includes(dataAllTiendas[i].tipo_productos)){
            categorias.push(dataAllTiendas[i].tipo_productos);
        }
    }

    let code = "";
    for (let i = 0; i < categorias.length; i++) {
        let tipo = categorias[i];
        code +=  `
            <div class = "sec_btn_categoria">
                <a onclick="filtro_categoria('${tipo}')" class = "btn_categoria">
                    <p class = "txt_btn_categoria">${categorias[i]}</p>
                </a>
            </div>
        `;
    }
    $("#sec_btn_grid").html(code);
}
function ventana_categorias_close(){
    //Es para que el contenido de la pantalla vuelva a ser accesible
    let sec_contenido = document.getElementById("content");
    sec_contenido.style.pointerEvents = "initial";
    document.body.style.backgroundColor = background_color_init;
    sec_contenido.style.filter = "opacity(100%)";
    //para que desaparezca la ventana categorias
    let sec_categorias = document.getElementById("sec_categorias");
    sec_categorias.style.display = "none";
}

//---------------------------------------------------------------------------------------------------------

function filtro_categoria(tipo) {
    let data = secciones;
    let index = 0;
    console.log("holaaa jiji");
    console.log(data);
    console.log(tipo);
    //for (let i = 0; i < data.length; i++) {
        /*if (!nombresTiendas[i].innerHTML.toLowerCase().includes(input)) {
            data[i].style.display = "none";
        } else {
            data[i].style.display = "initial";
            console.log(index);
            data[i].style.left = atributosPos[index][0];
            data[i].style.top = atributosPos[index][1];
            index++;
        }*/
    //}
}