 var estado = 0;
    const star = document.querySelector(".btn.star_cc");
    function addFav(){
    if(estado==0){
    star.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
    estado = 1;
}else{
    star.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
    estado = 0;
}
}
