 $('document').ready(function (){
     setCliente();
 });
 function setCliente(){
     localStorage.setItem("name_Cliente", "");
     getNovedadSlider();
 }