$('document').ready(function (){
    setCliente();
});
function setCliente(){
    let idCliente = localStorage.getItem("name_Cliente");
    let code= "";
    console.log(idCliente);
    if (idCliente == ""){
        code = `
            <a href="../../index.html" class='btn opc'>INICIO</a>
            <div class='h-line'></div>
            <a class='btn opc' style='top:20%;'>NOVEDADES</a>
            <div class='h-line' style='top:-15%;'></div>
            <a href="../lista/ListaCC_noLog.html" class='btn opc' style='top:40%;left:20%;width:60%;'>CENTROS COMERCIALES</a>
            <div class='h-line' style='top:5%;'></div>
            <a href="../tiendas/ListaTienda_noLog.html" class='btn opc' style='top:60%;'>TIENDAS</a>
            <div class='h-line' style='top:24%;'></div>
            <a class='btn opc' style='top:80%;'>PAGO PARQUEADERO</a>
        `;
    }else{
        code = `
            <a href="../principal/principalLog.html" class='btn opc'>INICIO</a>
            <div class='h-line'></div>
            <a class='btn opc' style='top:20%;'>NOVEDADES</a>
            <div class='h-line' style='top:-15%;'></div>
            <a href="../lista/ListaCC.html" class='btn opc' style='top:40%;left:20%;width:60%;'>CENTROS COMERCIALES</a>
            <div class='h-line' style='top:5%;'></div>
            <a href="../tiendas/ListaTiendas.html" class='btn opc' style='top:60%;'>TIENDAS</a>
            <div class='h-line' style='top:24%;'></div>
            <a class='btn opc' style='top:80%;'>PAGO PARQUEADERO</a>
        `;
    }
    $("#grid").html(code);
}