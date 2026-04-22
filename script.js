let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");

let dialogue = document.getElementById("dialogue");
let character = document.getElementById("character");
let background = document.getElementById("background");

let song = document.getElementById("song");

let noCount = 0;

yesBtn.onclick = function(){

    background.src = "bg2.png";
    character.src = "character3.png";
    dialogue.innerText = "Happy Birthday!!!";

    song.play();

    drawConfetti();   // start infinite confetti

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
let canvas = document.getElementById("confetti");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

for(let i=0;i<150;i++){
    confettiPieces.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*6+4,
        speed: Math.random()*3+2
    });
}

function drawConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confettiPieces.forEach(piece => {

        ctx.fillStyle = `hsl(${Math.random()*360},70%,60%)`;

        ctx.fillRect(piece.x,piece.y,piece.size,piece.size);

        piece.y += piece.speed;

        if(piece.y > canvas.height){
            piece.y = -10;
            piece.x = Math.random()*canvas.width;
        }

    });

    requestAnimationFrame(drawConfetti);
}
