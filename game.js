const colours = ["blue", "green", "yellow", "red"];
let level = 2;

let gameSequence = [];
let clickSequence = [];
let keyDown = false;

document.addEventListener("keydown", () => {
    if (!keyDown) {
        document.querySelector("body").classList.remove("game-over"); 
        level1();
}});

document.querySelectorAll(".btn").forEach(function(btn) {
    btn.addEventListener("click", function(event) {
            addColour(clickSequence, event.target.id);
            handleAnimation(event.target.id);   
            checkSequence();
})})

function level1() {
    document.querySelector("h1").innerText = "Level 1";
    let randomNumber = Math.floor(Math.random()*colours.length)
    addColour(gameSequence, randomNumber);
    handleAnimation(randomNumber);
    keyDown = true;       
}

function addColour(sequence, index) {
    sequence.push(colours[index]);
    console.log(sequence);
}

function handleAnimation (index) {
    document.querySelector("." + colours[index]).classList.add("pressed")
    setTimeout(() => {
        document.querySelector("." + colours[index]).classList.remove("pressed");
    }, 100);
    document.getElementById(colours[index] + "-audio").play();
} 

function checkSequence() {
    for (let i = 0; i < clickSequence.length; i++) {
        if (clickSequence[i] === gameSequence[i]) {
            if (i + 1 === gameSequence.length) {
                setTimeout(() => {
            document.querySelector("h1").innerText = "Level " + (gameSequence.length);
        }, 1000);
            clickSequence = [];
            let randomNumber = Math.floor(Math.random()*colours.length)
            addColour(gameSequence,randomNumber);
            setTimeout(() => {
                handleAnimation(randomNumber);
            }, 1000);
    }
 } else {
        wrong();
    }}}


function wrong() {
    document.querySelector("h1").innerText = `Game over.
        Press any key to play again`;
        document.querySelector("body").classList.add("game-over"); 
        document.getElementById("wrong-audio").play();
        clickSequence = [];
        gameSequence = [];
        return keyDown = false
}