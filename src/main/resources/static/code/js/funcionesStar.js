var estado = 0;
function addFav(id){
    console.log(id);
    let sec = document.getElementById(id);
    //console.log(sec);
    //const star = sec.querySelector("btn.star_cc");
    if(estado==0){
        sec.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
        estado = 1;
        saveFav(id);
    }else{
        sec.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
        estado = 0;
    }
}

function saveFav(id){
    let fav={
        id_CC : id,
    }
    let dataToSend=JSON.stringify(fav);
    $.ajax({
        url: '/api/Favoritos/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}