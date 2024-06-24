let songIndex = 0;
let audioElement = new Audio('yaalo yala.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('progressbar');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "ammayi song", filePath: "1.mp3", duration: "05:22" },
    { songName: "nanna nuvu na pranam", filePath: "2.mp3", duration: "04:30" },
    { songName: "ney verey", filePath: "3.mp3", duration: "03:45" },
    { songName: "evarevaro", filePath: "4.mp3", duration: "05:00" },
    { songName: "yaalo yala", filePath: "5.mp3", duration: "04:15" }
];

// Update song list display
const updateSongList = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
        element.querySelector('.songitem').textContent = songs[i].songName;
        element.querySelector('.timeBar').textContent = songs[i].duration;
    });
};

updateSongList();

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        makeAllPlays();
        document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
        document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        makeAllPlays();
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressbar.value = progress;
});

progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        if (songIndex === i) {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        } else {
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
    document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById(songIndex.toString()).classList.remove('fa-circle-play');
    document.getElementById(songIndex.toString()).classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
