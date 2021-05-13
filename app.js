// importing everything from html
const img1 = document.getElementById("img-middle")
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const audio = document.querySelector("audio");
const power = document.getElementById("power");
const wrapper = document.getElementById("wrapper");
const title = document.getElementById("tittle-song");
const artist = document.getElementById("artist-name");
const row = document.querySelector(".row");
// next prev
const ne = document.getElementById("next");
const pre = document.getElementById("prev");

// progrees
let progress = document.getElementById("progress-bar");
let finish = document.getElementById("finish");
let idel = document.getElementById("idel");
let progrees_main = document.getElementById("progress_div")

let isplaying = false;



const playMusic = () => {
        isplaying = true;
        audio.play();
        img1.classList.add("anime");
        play.classList.add("pause");
        play.classList.replace('fa-play', "fa-pause");
        wrapper.classList.add("glow");
    }
    // pause function

const pauseMusic = () => {
        isplaying = false;
        audio.pause();
        img1.classList.remove("anime")
        play.classList.remove("pause")
        play.classList.replace('fa-pause', "fa-play")
        wrapper.classList.remove("glow");
    }
    // play function
    // progress
audio.addEventListener("timeupdate", (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    // console.log(progress_time)
    progress.style.width = `${progress_time}%`
    let min_duration = Math.floor(duration / 60);

    let sec_duration = Math.floor(duration % 60);
    if (min_duration < 10) {
        min_duration = `0${min_duration}`;
    }
    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }
    let tot = `${min_duration}:${sec_duration}`;

    if (duration) {
        finish.textContent = `${tot}`;
    }
    // sec
    let min_current = Math.floor(currentTime / 60);

    let sec_current = Math.floor(currentTime % 60);
    if (sec_current < 10) {
        sec_current = `0${sec_current}`;
    }
    if (min_current < 10) {
        min_current = `0${min_current}`;
    }
    let tot_s = `${min_current}:${sec_current}`;
    if (currentTime) {
        idel.textContent = `${tot_s}`;
    }
});

play.addEventListener("click", () => {
    if (isplaying) {
        pauseMusic();
    } else {
        playMusic();

    }
});
// Some important tips:
// 1)the name of the song should same for image and song for music to play.
// 

// creating array


const songs = [{
        name: "Savannah",
        title: "Savannah",
        artist: "NCS - Philly K",

    },
    {
        name: "Heroes Tonight",
        title: "Heroes Tonight",
        artist: "NCS - Johnning",

    },
    {
        name: "careless",
        title: "Care-less",
        artist: "Neffex",

    },
    {
        name: "Warriyo - Mortals",
        title: "Warriyo - Mortals",
        artist: "NCS -  Laura Brehm",

    },
    {
        name: "fightback",
        title: "Fight-back",
        artist: "Neffex",

    }, {
        name: "playdate",
        title: "Play-date",
        artist: "AlanWalker",
    },

]

// load songs
let loadsongs = (songs) => {
        title.textContent = songs.title;
        artist.textContent = songs.artist;
        audio.src = "musics/" + songs.name + ".mp3";
        img1.src = "images/" + songs.name + ".jpg";
    }
    // assigning a index
let songind = 0;



let nextsong = () => {
    songind = (songind + 1) % songs.length;
    loadsongs(songs[songind]);
    audio.play();
    playMusic();


}
let prevsong = () => {
    songind = (songind - 1 + songs.length) % songs.length;
    loadsongs(songs[songind])
    audio.play();
    playMusic();
}

// progress clicking
progrees_main.addEventListener("click", (event) => {
    // console.log(event);  
    const { duration } = audio;
    let movement = (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = movement;
});

ne.addEventListener("click", nextsong);
pre.addEventListener("click", prevsong);
audio.addEventListener('ended', nextsong);