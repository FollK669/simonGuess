

var elm;
var waardebutton = 0;
var userSequenceNew = [];
var gamestarter = false;
var timing = 850;
var numbers = [];
var paragraphs = document.getElementById("pi");
document.getElementById("muteButton").addEventListener("click", toggleMute);

var demomodus = false;
var round = 0;
var AdvancetoNxtLvl = false;




function startCountdown() {
    var count = 3; // Start de teller op 3

    var countdownInterval = setInterval(function () {
        // Toon de huidige waarde van de teller
        document.getElementById('countdown').textContent = count;
        document.body.style.backgroundColor = " #011F3F";
        // Verminder de teller met 1
        playClockSound();
      
        // Als de teller 0 bereikt, stop de interval en roep de gamefunctie aan
        if (count === 0) {
            clearInterval(countdownInterval);
         
            GameStart(); // Roep hier je gamefunctie aan
        }
        count--;
    }, timing); 


   
}









function GameStart() {

    document.getElementById('countdown').textContent = "";

    document.body.style.backgroundColor = " #011F3F";
    round = 1  // ini ronde 1
    colorbuttonpicker("round " + round , '.onder');
    userSequenceNew = []; // ini in te geven user array
    numbers = []; // random generated numbers ini
    demomodus = true;  // is het demo of player mode
    gamestarter = true; // is de game bezig , of game over
    demoMode(); // start van de eerste demo mode
}




//  vergelijke de user array met de generated array
function compareInput(inputArray) {
    // Vergelijk de invoer van de speler met de huidige reeks
    for (var i = 0; i < inputArray.length ; i++) {
        if (inputArray[i] !== numbers[i]) {
            return false; // Als zelfs één element niet overeenkomt, return false
        }
    }  return true; // Als alle elementen overeenkomen, return true
}


//Elke button click wordt verwerkt
//if gamestarter true, dan wordt het verwerkt, niet gestart, message melding
//Als een button klik in demo modus gebeurd, wordt deze niet verwerkt in een array
//Als een button klik in een player modus gebeurd, wordt deze toegevoegd aan een array en vergeleken met de random gen array.
function clickMe(lbl, nums) {

    elm = document.getElementById(lbl);
    elm.addEventListener("click", alerter(lbl));
    if (gamestarter) {
        if (demomodus === false) {
            document.body.style.backgroundColor = "#011F3F";
            colorbuttonpicker("Deze kilk op " + lbl + " was tijdens play mode ! ", '.boven');
            colorbuttonpicker(nums, '.onder');

            userSequenceNew.push(nums);
            paragraphs.textContent = userSequenceNew.join(", ");
                if (compareInput(userSequenceNew) === true) {
                    colorbuttonpicker("juiste kleur", '.onder');

                    if (userSequenceNew.length === round) {
                        setTimeout(function () {
                            userSequenceNew = [];
                            numbers = [];
                            round++;
                            demoMode();
                        }, timing); }
                   
                }
                else { colorbuttonpicker("foute kleur", '.onder'); gameover(); } 
        }
        else if (demomodus === true) { 
            colorbuttonpicker(nums, '.onder');
            colorbuttonpicker(lbl, '.boven');
            colorbuttonpicker("Kleur " + lbl + " was tijdens demo mode ! ", '.boven');

    }
    } else { colorbuttonpicker("game is nog niet gestart", '.boven'); }
}


function gameover() {
    document.body.style.backgroundColor = "red";
    gamestarter = false;
    demomodus = false;
    colorbuttonpicker("Game OVER !!!! ", '.onder');

    if (round - 1  < 2) { colorbuttonpicker((round - 1) + " ronde ", '.boven'); }
    else   colorbuttonpicker((round - 1) +" rondes ", '.boven');
}



// in demo mode worden de klikken niet geregistreed, die in de functie click me
function demoMode() {
    
    demomodus = true;
    colorbuttonpicker("round :" + round + " Demo Start.");
    numbers = [];
    var j = 0;


    function playNext() {
        document.body.style.backgroundColor = "gray";
        var randomNumber = Math.floor(Math.random() * 4) + 1;
        numbers.push(randomNumber);
        
        if (randomNumber === 1) { clickMe("yellow", 1); }
        else if (randomNumber === 2) { clickMe("green", 2); }
        else if (randomNumber === 3) { clickMe("blue", 3); }
        else if (randomNumber === 4) { clickMe("red", 4); }

        paragraphs.textContent = numbers.join(", ");

        if (++j < round) {
            setTimeout(playNext, timing);
        } else {
            setTimeout(function () {
                document.body.style.backgroundColor = "#011F3F";
                colorbuttonpicker(" jou beurt !", '.boven');
                demomodus = false;
            }, timing);
        }
    }

    // Call playNext to start the sequence
    playNext();
}





//slechte naam, maar dit is eigenlijk de messagebar, boven of onder
function colorbuttonpicker(lbl, lbl2) {
    document.querySelectorAll(lbl2).forEach(function (element) {
        element.textContent = lbl;
    });
}



//zorgt voor de press animatie en het geluid animatie 
function alerter(keyss) {
    playSound("./sounds/" + keyss + ".mp3");
    presser();
}



//visueel press effect toevoegen en wegnemen
function presser() {
    elm.classList.add("pressed")
    setTimeout(function () {
        elm.classList.remove("pressed");
    }, 300);
}


//speelt de geluiden af
function playSound(filename) {
    var audio = new Audio(filename);
    var volumeSlider = document.getElementById('volumeSlider');
    audio.volume = volumeSlider.value;
    audio.play();
}

function playClockSound() {
    var audio = new Audio('https://freesound.org/data/previews/33/33021_3314-lq.mp3'); // Link naar een geluidsbestand van een tikkende klok

    audio.play();
    return audio;
}

function toggleMute() {
    var audio = document.getElementsByTagName('audio')[0];
    var volumeSlider = document.getElementById('volumeSlider');
    var volumeIcon = document.querySelector('.volume-icon');
    
    if (audio.volume === 0) {
        // Unmute
        audio.volume = volumeSlider.value;
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    } else {
        // Mute
        audio.volume = 0;
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    }
}





