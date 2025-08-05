let wrapper = document.querySelector(".wrapper"),
    musicimage = wrapper.querySelector("img"),
    musicname = wrapper.querySelector(".name"),
    musicartist = wrapper.querySelector(".artists"),
    playpausebtn = wrapper.querySelector(".play-pause"),
    prevbtn = wrapper.querySelector("#prev"),
    nextbtn = wrapper.querySelector("#next"),
    maudio = wrapper.querySelector("#m-audio"),
    progressarea = wrapper.querySelector(".progress-area"),
    progressbar = wrapper.querySelector(".progressbar"),
    start = wrapper.querySelector(".current-time"),
    end = wrapper.querySelector(".max-duration"),
    musiclist = wrapper.querySelector(".music-list"),
    menulistbtn = wrapper.querySelector("#menu-list"),
    closemusicbtn = wrapper.querySelector("#close");

let musicall = [
    {
        id: "music-1",
        name: "Let Me Down Slowly",
        artist: "Alec Benjamin",
        img: "./images/letmedown_slowly.jpg",
        link: "./musicname/Let_me_down_slowly.mp3"
    },
    {
        id: "music-2",
        name: "Apna Bana Le",
        artist: "Arjit sigh",
        img: "./images/apna.png",
        link: "./musicname/Apna Bana Le.mp3"
    },
    {
        id: "music-3",
        name: "Baby",
        artist: "Justin Bieber, Ludacris",
        img: "./images/baby_song.jpg",
        link: "./musicname/Baby_song.mp3"
    },
    {
        id: "music-4",
        name: "Shape Of You",
        artist: "Ed Sheeran",
        img: "./images/Shapeof_you.jpg",
        link: "./musicname/Shape_of_you.mp3"
    },
    {
        id: "music-5",
        name: "Azhagiye",
        artist: "AR.Rahman",
        img: "./images/Azhagiye.jpg",
        link: "./musicname/Azhagiye.mp3"
    },
    {
        id: "music-6",
        name: "Safari",
        artist: "Serena",
        img: "./images/safari.jpg",
        link: "./musicname/Safari_song.mp3"
    },
    {
        id: "music-7",
        name: "Stereo Hearts",
        artist: "Adam Levine & Travie McCoy",
        img: "./images/Stereo hearts.png",
        link: "./musicname/Stereo.mp3"
    },
    {
        id: "music-8",
        name: "Sugar & Brownies",
        artist: "Dharia",
        img: "./images/sugar_brownies.jpg",
        link: "./musicname/Sugar_brownies_song.mp3"
    },
    {
        id: "music-9",
        name: "Marudhaani Marudhaani",
        artist: "AR.Rahman",
        img: "./images/Marudhaani.png",
        link: "./musicname/Marudhaani.mp3"
    },
];

let musicIndex = 0;
window.addEventListener("load", function () {
    loadMusic(musicIndex);
    playingSong();
})
// load Music function
function loadMusic(indexNumb) {
    musicimage.src = musicall[indexNumb].img;
    maudio.src = musicall[indexNumb].link;
    musicname.innerHTML = musicall[indexNumb].name;
    musicartist.innerHTML = musicall[indexNumb].artist;
}
// play Music function
function playMusic() {
    wrapper.classList.add("paused")
    musicimage.classList.add("rotate");
    playpausebtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    maudio.play();
}
// pause Music function
function pauseMusic() {
    wrapper.classList.remove("paused")
    musicimage.classList.remove("rotate");
    playpausebtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    maudio.pause();
}
// play or music button event
playpausebtn.addEventListener("click", function () {
    if (wrapper.classList.contains("paused")) {
        pauseMusic();
    }
    else {
        playMusic();
    }

})
//prev button event
prevbtn.addEventListener("click", function () {
    prevMusic();
})
// prev music function
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musicall.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}
//next button event
nextbtn.addEventListener("click", function () {
    nextMusic();
})
// next music function
function nextMusic() {
    musicIndex++;
    if (musicIndex > musicall.length - 1) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}
maudio.onloadedmetadata = function () {
    //update music total duration
    progressbar.max = maudio.duration;
    progressbar.value = maudio.currentTime;

    setInterval(() => {
        let min = Math.floor(maudio.duration / 60);
        let sec = Math.floor(maudio.duration % 60);
        let curMin = Math.floor(maudio.currentTime / 60);
        let curSec = Math.floor(maudio.currentTime % 60);

        if (sec < 10) { //if sec is less than 10 then add 0 before it
            sec = "0" + sec;
        }
        if (curSec < 10) {
            curSec = "0" + curSec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (curMin < 10) {
            curMin = "0" + curMin;
        }

        let total_duration= min + ":" + sec;
        start.innerHTML = curMin + ":" + curSec;
        if(maudio.duration){
            end.innerHTML =   `${total_duration}`;
        }
    }, 1000);
};

//  update progressbar width according to music current time
maudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressbar.style.width = `${progressWidth}%`;
});

// update playing song current width according to the progress bar width
progressarea.addEventListener("click", (e) => {
    let progressWidth = progressarea.clientWidth; //getting width of porgress bar
    let poffsetX = e.offsetX; //getting offset x value
    let songDuration = maudio.duration; //getting song total duration

    maudio.currentTime = (poffsetX / progressWidth) * songDuration;
    playMusic();
})

// When music ended
maudio.addEventListener("ended", () => {
    nextMusic();
})

// Show the music list
menulistbtn.addEventListener("click", () => {
    musiclist.classList.toggle("show");
})

// Close button in music list
closemusicbtn.addEventListener("click", () => {
    menulistbtn.click();
})

const ultag = wrapper.querySelector("ul")
// create li tags according to array length for list
for (let i = 0; i < musicall.length; i++) {
    let litag = `<li  li-index="${i}">
    <div class="row">
        <span>${musicall[i].name}</span>
        <p>${musicall[i].artist}</p>
    </div>
    <audio  class="${musicall[i].id}" src="${musicall[i].link}" type="audio/mp3"></audio>
    <span id="${musicall[i].id}" class="audio-duration m-list">02:49</span>
</li>`
    ultag.insertAdjacentHTML("beforeend", litag);

    let liaudiodurationtag = ultag.querySelector(`#${musicall[i].id}`)
    let liaudiotag = ultag.querySelector(`.${musicall[i].id}`)
    liaudiotag.addEventListener("loadeddata", () => {
        let duration = liaudiotag.duration;
        let min = Math.floor(duration / 60);
        let sec = Math.floor(duration % 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        liaudiodurationtag.innerHTML = min + ":" + sec;
    })
    
}

//play particular song from the list
let litags = ultag.querySelectorAll("li")
function playingSong() {
    for (let j = 0; j < litags.length; j++) {
        let audioTag = litags[j].querySelector(".audio-duration");
        if (litags[j].classList.contains("playing")) {
            litags[j].classList.remove("playing")
            audioTag.innerHTML="";
        }
        if (litags[j].getAttribute("li-index") == musicIndex) {
            litags[j].classList.add("playing");
            audioTag.innerHTML = `<iconify-icon icon="streamline:music-equalizer" style="color: #72a2ea;" width="20" height="20"></iconify-icon>`
        }
        // adding on click attribute in all li
        litags[j].setAttribute("onclick", "clicked(this)");
    }
}

// play song on click li
function clicked(element) {
    //getting li index of particular clicked li tag
    let getliindex = element.getAttribute("li-index");
    musicIndex = getliindex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// Get elements
const openLyricsOptionsBtn = document.getElementById('open-lyrics-options-btn');
const fileUpload = document.getElementById('file-upload');

// Open options when the Add button is clicked
openLyricsOptionsBtn.onclick = function() {
    // Here you can prompt the user for different actions
    // For example, you can trigger a file upload prompt
    fileUpload.click();
}

// Handle file upload
fileUpload.onchange = function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Get the content of the file and display it in the lyrics input field
            document.getElementById('lyrics-input-slide').value = e.target.result;
            
            // Optionally, you could automatically save the lyrics as well:
            document.getElementById('save-lyrics-slide-btn').click();
        };
        reader.readAsText(file);
    }
};

let favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || []; // Load favorite songs from localStorage or initialize empty array
let currentSong = musicall[musicIndex]; // Example song object, adjust accordingly

// Function to update the heart button based on whether the song is favorited or not
function updateFavoriteButton() {
    const favoriteButton = document.querySelector('.fa-heart');
    if (favoriteSongs.includes(currentSong.id)) {
        favoriteButton.classList.add('active'); // Add active class if the song is favorited
    } else {
        favoriteButton.classList.remove('active'); // Remove active class if not favorited
    }
}

// Add event listener to the heart button to toggle the favorite status
document.getElementById('favorite').addEventListener('click', function () {
    const favoriteButton = document.querySelector('.fa-heart');
    currentSong = musicall[musicIndex]; // Update current song to the one playing

    if (favoriteSongs.includes(currentSong.id)) {
        // Remove from favorites if it's already in the list
        favoriteSongs = favoriteSongs.filter(id => id !== currentSong.id);
        favoriteButton.classList.remove('active');
    } else {
        // Add to favorites if it's not in the list
        favoriteSongs.push(currentSong.id);
        favoriteButton.classList.add('active');
    }

    // Save the updated favorite songs array to localStorage
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
});

// Load favorite songs from localStorage on page load and update the button accordingly
window.addEventListener('load', function () {
    favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    currentSong = musicall[musicIndex]; // Make sure currentSong is updated when the page loads

    // Update the heart icon based on the current song's favorite status
    updateFavoriteButton();
});



let isShuffle = false;
// Shuffle functionality
const shuffleButton = document.getElementById('shuffle');
if (shuffleButton) {
    shuffleButton.addEventListener('click', function () {
        isShuffle = !isShuffle;
        this.classList.toggle('active'); // Toggle active state
    });
}
let isRepeat = false;
// Repeat functionality
const repeatButton = document.getElementById('repeat');
if (repeatButton) {
    repeatButton.addEventListener('click', function () {
        isRepeat = !isRepeat;
        this.classList.toggle('active'); // Toggle active state
    });
}

// Show more content
const moreButton = document.getElementById('more');
if (moreButton) {
    moreButton.addEventListener('click', function () {
        const moreContentBox = document.getElementById('more-content-box');
        if (moreContentBox) {
            moreContentBox.style.display = moreContentBox.style.display === 'none' || moreContentBox.style.display === '' ? 'block' : 'none';
        }
    });
}

// Show sleep timer modal
document.getElementById('sleep-timer').addEventListener('click', function () {
    document.getElementById('sleep-timer-modal').style.display = 'block';
});

// Add event listeners for timer buttons
const timerButtons = document.querySelectorAll('.timer-btn');
timerButtons.forEach(button => {
    button.addEventListener('click', function () {
        const timerMinutes = parseInt(this.getAttribute('data-time')); // Get the data-time attribute
        const timerMilliseconds = timerMinutes * 60 * 1000; // Convert to milliseconds

        // Start a countdown
        setTimeout(() => {
            stopMusic(); // Call your function to stop the currently playing song
            alert('Timer finished. Stopping music.');
        }, timerMilliseconds);

        // Hide the modal after setting the timer
        document.getElementById('sleep-timer-modal').style.display = 'none';
    });
});

// Cancel button functionality
document.getElementById('cancel-timer').addEventListener('click', function () {
    document.getElementById('sleep-timer-modal').style.display = 'none';
});

// Ringtone Editor functionality
document.getElementById('ringtone-editor').addEventListener('click', function () {
    document.getElementById('ringtone-editor-modal').style.display = 'block';
});

// Function to trim and save the ringtone (replace with your actual logic)
function trimAndSaveRingtone(startTime, endTime) {
    console.log(`Trimming ringtone from ${startTime} to ${endTime}`); // Placeholder for actual logic
    // Implement your logic to trim and save the ringtone here
}

// Update the display of the start time
document.getElementById('start-time').addEventListener('input', function () {
    const startTimeDisplay = document.getElementById('start-time-display');
    const startTime = parseInt(this.value);
    startTimeDisplay.textContent = formatTime(startTime);
});

// Update the display of the end time
document.getElementById('end-time').addEventListener('input', function () {
    const endTimeDisplay = document.getElementById('end-time-display');
    const endTime = parseInt(this.value);
    endTimeDisplay.textContent = formatTime(endTime);
});

// Function to format time in minutes and seconds
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Save ringtone functionality
document.getElementById('save-ringtone').addEventListener('click', function () {
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    // Save the ringtone from the current song between startTime and endTime
    trimAndSaveRingtone(startTime, endTime);

    document.getElementById('ringtone-editor-modal').style.display = 'none';
});

// Cancel button functionality
document.getElementById('cancel-ringtone').addEventListener('click', function () {
    document.getElementById('ringtone-editor-modal').style.display = 'none';
});


// Share functionality
document.getElementById('share').addEventListener('click', function () {
    const songUrl = getCurrentSongUrl(); // Get the current song's URL
    if (navigator.share) {
        navigator.share({
            title: 'Check out this song!',
            text: 'I am listening to this awesome song!',
            url: songUrl
        }).catch((error) => console.log('Error sharing:', error));
    } else {
        alert('Sharing not supported on this browser.');
    }
});

// Define the getCurrentSongUrl function
function getCurrentSongUrl() {
    // Logic to retrieve the current song's URL from your music player
    // Replace the below example with your actual implementation
    const currentSong = document.querySelector('.current-song'); // Example of a song element
    if (currentSong && currentSong.dataset.url) {
        return currentSong.dataset.url; // Assume the URL is stored in a data attribute
    }
    return 'https://music-player/task3/musicname'; // Fallback URL if no current song
}


// Show equalizer modal
document.getElementById('equalizer').addEventListener('click', function () {
    document.getElementById('equalizer-modal').style.display = 'block';
});

// Apply equalizer settings based on selected genre
document.querySelectorAll('.music-genre').forEach(function(button) {
    button.addEventListener('click', function() {
        const genre = this.value; // Get the value of the clicked button
        applyEqualizer(genre); // Call the applyEqualizer function
    });
});

// Function to apply equalizer settings (to be implemented)
function applyEqualizer(genre) {
    console.log("Equalizer settings applied for genre: " + genre);
    document.getElementById('equalizer-modal').style.display = 'none'; // Hide modal after applying
}

// Cancel button to close the modal
document.getElementById('cancel-equalizer').addEventListener('click', function () {
    document.getElementById('equalizer-modal').style.display = 'none';
});

