const timer = document.getElementById('timer');
const sbutton = document.getElementById('start_button');
const rbutton = document.getElementById('reset_button');
const isrest = document.getElementById('isrest')
const round_elem = document.getElementById('roundcounter')

var round_start_audio = new Audio('sounds/round_start_sound.mp3')
var round_end_audio = new Audio('sounds/round_end_sound.mp3') // Import the audio files

sbutton.style.backgroundColor = "green";
rbutton.style.backgroundColor = "red";

let secondsLeft = 10;
let countdownTimeout;
let isCountdownRunning = false; // Variable to track the countdown status
let nround = 1;

function countdown(seclef=10) {
  if (seclef > 0) {
    seclef--;
    minl = Math.floor(seclef / 60);
    lsec = seclef % 60;
    timer.innerHTML = (`${minl}min ${lsec}s`);
    countdownTimeout = setTimeout(() => countdown(seclef), 1000);
  } else {
    isrest.innerHTML = "RESTING"
    round_end_audio.play()
    rest_countdown()
  }
}

function rest_countdown(seclef=5) {
  if (seclef > 0) {
    seclef--;
    minl = Math.floor(seclef / 60);
    lsec = seclef % 60;
    timer.innerHTML = (`${minl}min ${lsec}s`);
    countdownTimeout = setTimeout(() => rest_countdown(seclef), 1000);
  } else {
    isrest.innerHTML = "NOT RESTING";
    nround = nround + 1;
    round_elem.innerHTML = nround;
    round_start_audio.play();
    countdown()
  }
}


function reset_counter() {
  clearTimeout(countdownTimeout);

  secondsLeft = 180;
  minl = Math.floor(secondsLeft / 60);
  lsec = secondsLeft % 60;
  timer.innerHTML = (`${minl}min ${lsec}s`);

  isCountdownRunning = false;
  nround = 1;
  round_elem.innerHTML = nround;
}

function start_counter() {
  if (!isCountdownRunning) {
    isCountdownRunning = true; // Set countdown status
    round_start_audio.play();
    countdown(secondsLeft); // Start the countdown process
  }
}

sbutton.addEventListener("click", start_counter);
rbutton.addEventListener("click", reset_counter);