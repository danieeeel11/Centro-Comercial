$('document').ready(function (){
    getTiendas();
});
let secciones = [];
let nombresTiendas = [];
let atributosPos = [];
function getTiendas(){
    $.ajax({
        url: '/api/Tiendas/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
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