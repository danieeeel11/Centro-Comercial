$('document').ready(function (){
    getNovedad();
});
function getNovedad(){
    $.ajax({
        url: '/api/Novedades/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintNovedad(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}
function paintNovedad(r){
    let d="";
    for(let i=0;i<r.length;i++){
        d += `
                <div class="noticia">
                    <h2 class="titular">${r[i].titular}</h2>
                         <div class="container">
                            <img src="${r[i].imagen}">
                        </div>
                    <div class="contenido">
                        <p class="cuerpo">${r[i].noticia}</p>
                        <p class="fecha">${r[i].tiempo_pub}</p>
                    </div>
                </div>
`;
    }
    $("#grid").html(d);
}
