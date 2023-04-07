var estado = 0;
function addFav(name){
    console.log(name);
    let sec = document.getElementById(name);
    //console.log(sec);
    //const star = sec.querySelector("btn.star_cc");
    if(estado==0){
        sec.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
        estado = 1;
    }else{
        sec.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
        estado = 0;
    }
}