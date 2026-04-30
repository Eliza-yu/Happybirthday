console.log("startBtn:", document.getElementById("startBtn"));
console.log("song:", document.getElementById("song"));
window.onload = function () {

let startBtn = document.getElementById("startBtn");
let startScreen = document.getElementById("startScreen");
let song = document.getElementById("song");
let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
let songHappy = document.getElementById("songHappy");

let dialogue = document.getElementById("dialogue");
let character = document.getElementById("character");
let background = document.getElementById("background");
let ageBox = document.getElementById("ageBox");
let ageInput = document.getElementById("ageInput");
let ageSubmit = document.getElementById("ageSubmit");

let canvas = document.getElementById("confetti");
console.log("canvas:", canvas);
let ctx = canvas.getContext("2d");
let gift = document.getElementById("gift");
let scare = document.getElementById("scare");
let scareAudio = document.getElementById("scareAudio");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
let noCount = 0;

function typeText(element, text, speed = 40, callback) {
    element.innerText = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerText += text[i];
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
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
  
  function triggerGift(){

    setTimeout(() => {
        gift.style.display = "block";

        gift.onclick = function () {
            startJumpscare();
        };

    }, 8000);
}
  
  function screenShake(duration = 800){

    let game = document.getElementById("game");

    game.classList.add("shake");

    setTimeout(() => {
        game.classList.remove("shake");
    }, duration);
}

ageInput.addEventListener("focus", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});
  
startBtn.onclick = function () {

    if (!song) {
        console.log("ERROR: song not found");
        return;
    }

    startScreen.style.display = "none";

    song.volume = 0.5;
    song.loop = true;

    song.play().catch(err => {
        console.log("Audio blocked or missing:", err);
    });
};
  
  ageSubmit.onclick = function () {

    let age = ageInput.value.trim();

    if (age !== "19") {

        character.src = "character7.PNG";
        typeText(dialogue, "Be" + " serious!");

        ageInput.value = "";
        return;
    }

    ageBox.style.display = "none";

    startBirthdaySequence();
};
  
yesBtn.onclick = function () {
    background.src = "bg1.png";

    character.src = "character5.PNG";
    typeText(dialogue, "How" + " old" + " are" + " you?");

    document.getElementById("choices").style.display = "none";
    ageBox.style.display = "block";
};

  function startBirthdaySequence() {

    character.src = "character6.PNG";

    typeText(dialogue, "damn you're ancient", 40, () => {

        setTimeout(() => {

            character.src = "character8.PNG";

            typeText(dialogue, "anyway!", 40, () => {

                setTimeout(() => {

                    background.src = "bg2.png";

                    song.pause();
                    song.currentTime = 0;

                    songHappy.currentTime = 0;
                    songHappy.play();

                    drawConfetti();
                  character.src = "character3.PNG";
                    typeText(dialogue, "Happy Birthday!!!");

                    document.getElementById("choices").style.display = "none";

                    setTimeout(() => {

                        character.style.opacity = "0";

                        setTimeout(() => {
  
                          character.style.opacity = "0";
                          setTimeout(() => { 
                            character.src = "photo1.jpg";
                              character.style.opacity = "1";

                                         triggerGift();

                           }, 1000);

                     }, 1200);

                }, 1200);

            });

        }, 1200);

    });
}

    function startJumpscare(){

    gift.style.display = "none";

    scare.style.display = "block";
    scareAudio.currentTime = 0;
    scareAudio.play();

    screenShake(1200); // 👈 ADD THIS

    setTimeout(() => {

        let lines = [
            "HAHAHAHA",
            "I hope I got you.",
            "Happy birthday twin!!",
            "I'm not good with words but I do hope you enjoy your last year in this world",
            "well of being a teenager ofc."
        ];

        let i = 0;
        dialogue.style.color = "white";
        document.body.style.background = "black";

        function showLine(){
            if(i < lines.length){
                typeText(dialogue, lines[i], 50, () => {
                    setTimeout(showLine, 1200);
                });
                i++;
            }
        }

        showLine();

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
        typeText(dialogue, "Yeah" +" yeah.");
        noBtn.style.display = "none";
    }
}

};
