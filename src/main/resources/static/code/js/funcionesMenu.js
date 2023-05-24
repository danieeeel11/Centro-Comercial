let background_color_init = "";

function menu_active() {
    let sec_menu = document.getElementById('sidebar');
    //sec_menu.style.left = "0";
    sec_menu.style.transform = "translateX(290px)";

    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "block";
    sec_contenido.style.pointerEvents = "none";
    //sec_contenido.style.filter = "blur(4px)";
    background_color_init = document.body.style.backgroundColor + "";
    //console.log(document.body.style.backgroundColor);
    document.body.style.backgroundColor = "#808080";

    /*Cambio color de texto*/
    /*var elementosP = document.getElementsByTagName("p");
    for (var i = 0; i < elementosP.length; i++) {
        elementosP[i].style.color = "red";
    }*/
    //282828
    sec_contenido.style.filter = "opacity(5%)";
    menu_opc();
}

function menu_close() {
    let sec_menu = document.getElementById('sidebar');
    sec_menu.style.transform = "translateX(-300px)";
    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "initial";
    sec_contenido.style.pointerEvents = "initial";
    //sec_contenido.style.filter = "blur(0px)";

    document.body.style.backgroundColor = background_color_init;
    //document.body.style.backgroundColor = "#4d1717";
    sec_contenido.style.filter = "opacity(100%)";
    //setCliente();
}

function menu_opc(){
    let idCliente = localStorage.getItem("name_Cliente");
    let code= "";

    if (idCliente == ""){
        code = `
            <br>
            <div class="sec_menu_bar">
                <a class="cerrar_menu" onclick="menu_close()"></a>
            </div>
            <br>
            <br>
            <div class="sec_btn_tipo">
                <a href="../../index.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Inicio</p>
                </a>
            </div>
            <div class="sec_btn_tipo">
                <a href="/code/novedades/novedades_noLog.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Novedades</p>
                </a>
            </div>
            <div class="sec_btn_tipo">
                <a href="/code/lista/ListaCC_noLog.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Centros Comerciales</p>
                </a>
            </div>
            <div class="sec_btn_tipo" style="border-bottom-width: 0px;">
                <a href="/code/tiendas/ListaTienda_noLog.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Tiendas</p>
                </a>
            </div>
        `;
    }else{
        code = `
            <br>
            <div class="sec_menu_bar">
                <a class="cerrar_menu" onclick="menu_close()"></a>
            </div>
            <br>
            <br>
            <div class="sec_btn_tipo">
                <a href="/code/principal/principalLog.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Inicio</p>
                </a>
            </div>
            <div class="sec_btn_tipo">
                <a href="/code/novedades/novedades.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Novedades</p>
                </a>
            </div>
            <div class="sec_btn_tipo">
                <a href="/code/lista/ListaCC.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Centros Comerciales</p>
                </a>
            </div>
            <div class="sec_btn_tipo">
                <a href="/code/tiendas/ListaTiendas.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Tiendas</p>
                </a>
            </div>
            <div class="sec_btn_tipo" style="border-bottom-width: 0px;">
                <a href="/code/parqueadero/parqueadero.html" class="btn_tipo_menu">
                    <p class="txt_btn_menu">Pago Parqueadero</p>
                </a>
            </div>
        `;
    }
    $("#sidebar").html(code);
}