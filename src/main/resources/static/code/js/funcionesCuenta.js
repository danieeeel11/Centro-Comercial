let id_Cliente = localStorage.getItem("id_Cliente");
function getCuenta(){
    $.ajax({
        url: '/api/Cliente/'+id_Cliente,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintCuenta(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}
function paintCuenta(r){
    let d="";
    d+=`
                <div class="ui card">
                <br><br>
                <p class='txt_campo_info'>Nombre</p>
                <div class='sec_campo_info'>
                  <p class='txt_campo'>${r.nombre}</p>
                </div>
                <p class='txt_campo_info'>Correo</p>
                <div class='sec_campo_info'>
                  <!--<input class='custom' type="text" id="email" name="email" size="10">-->
                  <p class='txt_campo email'>${r.email}</p>
                </div>
                <p class='txt_campo_info'>Usuario</p>
                <div class='sec_campo_info'>
                  <!--<input class='custom' type="text" id="user" name="user" size="10">-->
                  <p class='txt_campo user'>${r.usuario}</p>
                </div>
    `;
    $("#parrilla").html(d);
}