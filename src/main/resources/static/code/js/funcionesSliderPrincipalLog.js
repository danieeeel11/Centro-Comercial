function paintSlider(){
    let htmlFotos = [];
    for (let i = 0; i < dataNovedad.length; i++) {
        let nombreCC = searchIdCC(dataNovedad[i].id_cc);
        htmlFotos.push(
            `<p style="bottom: 80%; width: 20%; height: 10%; font-size: 20px; left: 2%;">${nombreCC}</p>
             <img src="${dataNovedad[i].imagen}" alt="">
             <p><br>${dataNovedad[i].titular.toUpperCase()}</p>
        `);
    }
    $("#insertImage1").html(htmlFotos[3]);
    $("#insertImage2").html(htmlFotos[2]);
    $("#insertImage3").html(htmlFotos[1]);
    $("#insertImage4").html(htmlFotos[0]);
    $("#insertImage5").html(htmlFotos[4]);
    $("#insertImage6").html(htmlFotos[5]);
    $("#insertImage7").html(htmlFotos[6]);
    $("#insertImage8").html(htmlFotos[7]);
    $("#insertImage9").html(htmlFotos[8]);
    $("#insertImage10").html(htmlFotos[9]);
    $("#insertImage11").html(htmlFotos[10]);
    $("#insertImage12").html(htmlFotos[11]);
}

function searchIdCC(id) {
    let nameCC = "";
    for (let i = 0; i < dataAllCC.length; i++) {
        if(dataAllCC[i].id == id){
            nameCC = dataAllCC[i].nombre;
        }
    }
    return nameCC;
}