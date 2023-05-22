/*$('document').ready(function (){
    setCliente();
});*/
/*function setCliente(){
    let idCliente = localStorage.getItem("name_Cliente");
    let code= "";
    if (idCliente == ""){
        code = `
            <a href="../../index.html" class='btn opc' style="top:10%;">INICIO</a>
            <div class='h-line' style="top:-25%;"></div>
            <a class='btn opc' style='top:30%;'>NOVEDADES</a>
            <div class='h-line' style='top:-5%;'></div>
            <a href="../lista/ListaCC_noLog.html" class='btn opc' style='top:50%;left:20%;width:60%;'>CENTROS COMERCIALES</a>
            <div class='h-line' style='top:15%;'></div>
            <a href="../tiendas/ListaTienda_noLog.html" class='btn opc' style='top:70%;'>TIENDAS</a>
           <!-- <div class='h-line' style='top:24%;'></div>
            <a href="../principal/login.html" class='btn opc' style='top:80%;'>PAGO PARQUEADERO</a> -->
        `;
    }else{
        code = `
            <a href="../principal/principalLog.html" class='btn opc'>INICIO</a>
            <div class='h-line'></div>
            <a href="../novedades/novedades.html" class='btn opc' style='top:20%;'>NOVEDADES</a>
            <div class='h-line' style='top:-15%;'></div>
            <a href="../lista/ListaCC.html" class='btn opc' style='top:40%;left:20%;width:60%;'>CENTROS COMERCIALES</a>
            <div class='h-line' style='top:5%;'></div>
            <a href="../tiendas/ListaTiendas.html" class='btn opc' style='top:60%;'>TIENDAS</a>
            <div class='h-line' style='top:24%;'></div>
            <a href="../parqueadero/parqueadero.html" class='btn opc' style='top:80%;'>PAGO PARQUEADERO</a>
        `;
    }
    $("#grid").html(code);
}*/
function menu_active() {
    let sec_menu = document.getElementById('sidebar');
    //sec_menu.style.left = "0";
    sec_menu.style.transform = "translateX(290px)";

    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "block";
    sec_contenido.style.pointerEvents = "none";
    sec_contenido.style.filter = "blur(4px)";
    menu_opc();
}

function menu_close() {
    let sec_menu = document.getElementById('sidebar');
    sec_menu.style.transform = "translateX(-300px)";
    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "initial";
    sec_contenido.style.pointerEvents = "initial";
    sec_contenido.style.filter = "blur(0px)";
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
                <a class="btn_tipo_menu">
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