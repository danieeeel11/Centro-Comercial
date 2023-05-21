let id_Cliente = localStorage.getItem("id_Cliente");
let key = localStorage.getItem("contrasenia");
let token = Cookies.get('token');
$('document').ready(function (){
    getCuenta();
});
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
                <p class='txt_campo_info'>Contraseña</p>
                <div class='sec_campo_info'>
                  <p class='txt_campo pasword'>${r.contrasenia}</p>
                </div>
                
    `;

    $('#parrilla').html(d);
}

function actualizarInfo(){

    console.log("entro input")
    $('.sec_data').empty();
    $('#parrilla').empty();

    let content ="";
    content +=`
        <div class="ui card">
                <br><br>
                <p class='txt_campo_info'>Nombre</p>
                <div>
                  <input class='custom' type="text" id="nameN" name="name" size="10">
                </div>
                <p class='txt_campo_info'>Correo</p>
                <div>
                  <input class='custom' type="text" id="emailN" name="email" size="10">
                </div>
                <p class='txt_campo_info'>Usuario</p>
                <div> <!--class='sec_campo_info'-->
                  <input class='custom' type="text" id="userN" name="user" size="10">
                </div>
                 <p class='txt_campo_info'>Contraseña</p>
                <div class='sec_campo_info'>
                  <input class='custom' type="text" id="userN" name="user" size="10">
                </div>
        </div>

    <div class='sec_bottom'>
        <a class='btn edit' onclick="guardarActualizado()" ">Actualizar</a>
        <a class='btn edit2' href="../cuenta/cuenta.html"" ">Aceptar</a>
    </div>`
    $('.sec_data').append(content);
}

function guardarActualizado(){
    let cliente={
        id_Cliente: localStorage.getItem("id_Cliente"),
        nombre : $("#nameN").val(),
        email : $("#emailN").val(),
        usuario : $("#userN").val(),
        contrasenia : localStorage.getItem("contrasenia"),
    }
    console.log(cliente.id);

    //let dataToSend=JSON.stringify(cliente);
    $.ajax({
        url: '/api/Cliente/update',
        type:'PUT',
        data: JSON.stringify(cliente),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            alert("Los datos han sido actualizados");
            console.log('Cliente actualizado:', data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}