function logger(msg) {
  console.log("logger:", msg);
};

logger("custom video control scripts have been called")

function elementSelector(queryIdentifier, element) {
  const parentElement = document.querySelector(`[data-acc-text = "${queryIdentifier}"]`);
  const targetElement = parentElement.getElementsByTagName(element);

  if (targetElement.length == 0) {
      logger(`${queryIdentifier} MISSING`);
      return undefined 
  } else {
      logger(`${queryIdentifier} FOUND`)
      return targetElement[0];
  }
};

const video = elementSelector("SL-custom-player-video.mp4", "video");
const customPlayBtn = elementSelector("custom-play-btn.png", "image");
const customPauseBtn = elementSelector("custom-pause-btn.png", "image");
const turnCaptionsOn = elementSelector("captions-on.png", "image");
const turnCaptionsOff = elementSelector("captions-off.png", "image");
const reverseSeek = elementSelector("reverse-seek.png", "image");
const forwardSeek = elementSelector("forward-seek.png", "image");
const progressIndicator = elementSelector("progress-bar.png", "image");


// Values used for progressIndicator
let value = 0
let min = 0

// Event that moves the progressIndicator
video.addEventListener('timeupdate', function() {
 value = video.currentTime;
 progressIndicator.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
});


// Control display of buttons
forwardSeek.style.display = "none"
turnCaptionsOff.style.display = "none"

turnCaptionsOn.addEventListener('click', function() {
turnCaptionsOff.style.display = "block";
turnCaptionsOn.style.display = "none";
console.log('captions turned on')
});

turnCaptionsOff.addEventListener('click', function() {
turnCaptionsOff.style.display = "none";
turnCaptionsOn.style.display = "block";
 console.log('captions turned off')
});

video.addEventListener('pause', function() {
console.log('Video has been paused')
customPlayBtn.style.display = "block"
customPauseBtn.style.display = "none"
});

video.addEventListener('play', function() {
console.log('Video has been paused')
customPlayBtn.style.display = "none"
customPauseBtn.style.display = "block"
});

video.addEventListener('ended', function() {
console.log('Video has ended')
customPlayBtn.style.display = "block"
customPauseBtn.style.display = "none"
forwardSeek.style.display = "block"
});

// Control the play and pause actions
customPlayBtn.addEventListener('click', function() {
  video.play()
})

customPauseBtn.addEventListener('click', function() {
  video.pause()
})

// Control forward and reverse seeking actions
const seekAmountSeconds = 10

reverseSeek.addEventListener('click', function() {
  if (video.currentTime - seekAmountSeconds > 0) {
      video.currentTime = video.currentTime - 10;    
  } else {
      video.currentTime = 0;
  }
});

forwardSeek.addEventListener('click', function() {
  if (video.currentTime + seekAmountSeconds < video.duration) {
      video.currentTime = video.currentTime + 10;    
  } else {
      video.currentTime = video.duration;
  }
});
