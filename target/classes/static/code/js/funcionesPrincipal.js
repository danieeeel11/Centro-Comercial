 var estado = 0;
    const star = document.querySelector(".btn.star_cc");
    function addFav(){
    if(estado==0){
    star.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
    estado = 1;
}else{
    star.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
    estado = 0;
}
}
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
                <div>
                      <p class='modal-label'>${r[i].titular}</p>
                      <p class='modal-label'>${r[i].noticia}</p>
                      <p class='modal-label'>${r[i].tiempo_pub}</p>
                </div>`;
         }
     $("#info").html(d);
 }