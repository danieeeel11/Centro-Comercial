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
                            <iframe src="${r[i].imagen}" width="100%" height="400" style="border-radius:20px"; allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
