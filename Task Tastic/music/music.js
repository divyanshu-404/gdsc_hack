var currentAudio;
var playPauseButton;

function playMusic(url) {
  if (currentAudio) {
    currentAudio.pause();
  }

  var audio = new Audio(url);
  audio.addEventListener("ended", function () {
    playPauseButton.innerHTML = "Play";
  });

  audio.play();
  currentAudio = audio;
  playPauseButton = document.getElementById("playPauseButton");
  playPauseButton.innerHTML = "Pause";
}

function togglePlayPause() {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
      playPauseButton.innerHTML = "Pause";
    } else {
      currentAudio.pause();
      playPauseButton.innerHTML = "Play";
    }
  }
}
