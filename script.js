window.onload = function () {

let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
let songHappy = document.getElementById("songHappy");

let dialogue = document.getElementById("dialogue");
let character = document.getElementById("character");
let background = document.getElementById("background");

let canvas = document.getElementById("confetti");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let noCount = 0;

function typeText(element, text, speed = 40) {
  element.innerText = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerText += text[i];
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

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

  let startBtn = document.getElementById("startBtn");
let startScreen = document.getElementById("startScreen");

let song = document.getElementById("song");

startBtn.onclick = function(){

    // hide start screen
    startScreen.style.display = "none";

    // START MUSIC HERE (allowed by browser)
    song.volume = 0.5;
    song.loop = true;
    song.play();
};
  
yesBtn.onclick = function(){

    background.src = "bg2.png";

    song.pause();
    song.currentTime = 0;

    character.src = "character3.PNG";

    typeText(dialogue, "Happy Birthday!!!");

    drawConfetti();

    document.getElementById("choices").style.display = "none";

    songHappy.currentTime = 0;
    songHappy.play();

    // smooth swap
    setTimeout(() => {

        character.style.opacity = "0";

        setTimeout(() => {
            character.src = "photo1.jpg";
            character.style.opacity = "1";
        }, 1000);

    }, 1200);
}

noBtn.onclick = function(){

    noCount++;

    if(noCount == 1){
        character.src = "character2.PNG";
        typeText(dialogue, "Liar.");
        noBtn.style.transform = "scale(0.7)";
    }

    else if(noCount == 2){
        character.src = "character4.PNG";
        typeText(dialogue, "Yeah yeah.");
        noBtn.style.display = "none";
    }
}

};
