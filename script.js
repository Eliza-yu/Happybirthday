let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");

let dialogue = document.getElementById("dialogue");
let character = document.getElementById("character");
let background = document.getElementById("background");

let song = document.getElementById("song");

let noCount = 0;

yesBtn.onclick = function(){

    background.src = "bg2.png";
    character.src = "character3.PNG";
    dialogue.innerText = "Happy Birthday!!!";

    song.play();

    document.getElementById("choices").style.display = "none";
}

noBtn.onclick = function(){

    noCount++;

    if(noCount == 1){
        character.src = "character2.PNG";
        dialogue.innerText = "Liar.";

        noBtn.style.transform = "scale(0.7)";
    }

    else if(noCount == 2){
        character.src = "character4.PNG";
        dialogue.innerText = "Yeah yeah.";

        noBtn.style.display = "none";
    }

}
