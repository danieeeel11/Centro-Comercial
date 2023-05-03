function addFav(id){
    let sec = document.getElementById(id);
    estadoFav(id, sec);
}

function estadoFav(id, sec){
    console.log("---" + id);
    let id_user = localStorage.getItem('id_Cliente');
    if(id_user != null){
        let fav={
            id_Cliente : id_user,
            id_Tienda : id,
        }
        //let dataToSend=JSON.stringify(fav);
        $.ajax({
            url: '/api/FavoritosTienda/estadoFav',
            type:'GET',
            data: fav,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                console.log(data);
                let dataToSend=JSON.stringify(fav);
                if(data == 1){
                    deleteFav(dataToSend,sec);
                }else{
                    saveFav(dataToSend,sec)
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Aquí manejamos cualquier error que pueda haber ocurrido
                console.log(textStatus + ': ' + errorThrown);
            }
        });
    }else{
        window.location.href = "../principal/Error.html";
    }
}

function deleteFav(dataToSend,sec) {
    //console.log(dataToSend);
    $.ajax({
        url: '/api/FavoritosTienda/delete',
        type:'DELETE',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function() {
            console.log("Deleted");
            Swal.fire(
                'Eliminado de favoritos',
                '',
                'success'
            )
            sec.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function saveFav(dataToSend,sec) {
    $.ajax({
        url: '/api/FavoritosTienda/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            console.log("Saved");
            console.log(dataToSend);
            Swal.fire(
                'Agregado a favoritos',
                '',
                'success'
            )
            sec.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}