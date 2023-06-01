$('document').ready(function (){
    paintNovedad();
});

function paintNovedad(){
    let dato = JSON.parse(window.localStorage.getItem('novedad'));
    console.log(dato);
    let d="";
    d += `
        <div class="sec_middle1">
          <p class="txt_tit">${dato[0][0].titular}</p>
          <p class="txt_cc">${dato[0][1]}</p>
          <p class="txt_noticia">${dato[0][0].noticia}</p>
          <p class="txt_fecha">${calcular_tiempo(dato[0][0].tiempo_pub)}</p>
        </div>
        <div class="sec_middle2" style="background-image: url('${dato[0][0].imagen}')"></div>
    `;

    $("#grid").html(d);
}

function calcular_tiempo(publicacion) {
    //1000*60*60*24 ->milisegundos->segundos->minutos->horas->dias
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

    var fechaInicio = new Date(publicacion).getTime();
    var fechaFin    = hoy.getTime();

    var lapso_aux = fechaFin - fechaInicio;
    var lapso = Math.round(lapso_aux/(1000*60*60*24)); //dias

    //Si es el mismo dia
    if(lapso == 0){
        lapso = Math.round(lapso_aux/(1000*60*60)); //horas
        //Si es la misma hora
        if(lapso == 0){
            lapso = Math.round(lapso_aux/(1000*60)); //minutos
            return "Hace " + lapso + " minutos";
        }
        return "Hace " + lapso + " horas";
    }
    return "Hace " + lapso + " dias";
}