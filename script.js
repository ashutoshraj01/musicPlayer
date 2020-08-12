const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = [
   "Chord Overstreet - Hold On",
   "gnash - i hate u, i love u ft. olivia o'brien",
   "Imagine Dragons - Demons",
   "Imagine Dragons - Radioactive",
   "Imagine Dragons - Whatever It Takes",
   "Justin Bieber - Love Yourself",
   "Lord Huron - The Night We Met",
   "OneRepublic - Counting Stars",
   "Shawn Mendes - There's Nothing Holdin' Me Back",
  ];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);



//volume controler
document.getElementById("volDn").addEventListener("click", function () {
  setVol(-.1); // down by 10%
}, false);
document.getElementById("volUp").addEventListener("click", function () {
  setVol(.1); // up by 10%
}, false);


// change volume based on incoming value 
  function setVol(value) {
      console.log('Called');
      var vol = audio.volume;
      vol += value;
      //  test for range 0 - 1 to avoid exceptions
      if (vol >= 0 && vol <= 1) {
          // if valid value, use it
          audio.volume = vol;
      } else {
          // otherwise substitute a 0 or 1
          audio.volume = (vol < 0) ? 0 : 1;                        
      }
  }

