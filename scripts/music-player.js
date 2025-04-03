class MusicPlayer {
    constructor() {
        // DOM Elements
        this.musicPlayer = document.getElementById('musicPlayer');
        this.audioElement = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progress = document.getElementById('progress');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.songTitle = document.getElementById('songTitle');
        this.songArtist = document.getElementById('songArtist');
        this.currentTimeElement = document.getElementById('currentTime');
        this.totalTimeElement = document.getElementById('totalTime');
        this.playlistElement = document.getElementById('playlist');
        this.playlistToggle = document.getElementById('playlistToggle');
        
        // Player state
        this.isPlaying = false;
        this.currentSongIndex = 0;
        
        // Playlist - Add your songs here
        // You'll need to add your own MP3 files to a 'music' folder
        this.playlist = [
            {
                title: "Social Path (feat. LiSA)",
                artist: "Stray Kids",
                src: "music/social-path.mp3"
            },
            {
                title: "Overdose",
                artist: "Natori",
                src: "music/overdose.mp3"
            },
            {
                title: "Standing Next To You",
                artist: "Jungkook",
                src: "music/next-to-you.mp3"
            },
            {
                title: "Is This Love",
                artist: "XG",
                src: "music/is-this-love.mp3"
            },
            {
                title: "Fire",
                artist: "Alan Walker, YUQI",
                src: "music/fire.mp3"
            },
            {
                title: "ETA",
                artist: "NewJeans",
                src: "music/eta.mp3"
            },
            {
                title: "Cool With You",
                artist: "NewJeans",
                src: "music/cool-with-you.mp3"
            },
            {
                title: "Come Over",
                artist: "Le Sserafim",
                src: "music/come-over.mp3"
            },
            {
                title: "Butterfly",
                artist: "Junha Park",
                src: "music/butterfly.mp3"
            },
            {
                title: "Back For More",
                artist: "TXT",
                src: "music/back-for-more.mp3"
            }
        ];
        
        this.initPlayer();
    }
    
    initPlayer() {
        // Create playlist items
        this.createPlaylist();
        
        // Set initial volume
        this.audioElement.volume = this.volumeSlider.value;
        
        // Load first song
        this.loadSong(this.currentSongIndex);
        
        // Event listeners
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        this.volumeSlider.addEventListener('input', () => {
            this.audioElement.volume = this.volumeSlider.value;
        });
        
        this.progressBar.addEventListener('click', (e) => {
            const progressBarRect = this.progressBar.getBoundingClientRect();
            const clickPosition = e.clientX - progressBarRect.left;
            const clickPercentage = clickPosition / progressBarRect.width;
            const seekTime = clickPercentage * this.audioElement.duration;
            this.audioElement.currentTime = seekTime;
        });
        
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.nextSong());
        this.audioElement.addEventListener('loadedmetadata', () => {
            this.totalTimeElement.textContent = this.formatTime(this.audioElement.duration);
        });
        
        // Toggle playlist visibility
        this.playlistToggle.addEventListener('click', () => {
            this.playlistElement.classList.toggle('show-playlist');
        });
    }
    
    createPlaylist() {
        this.playlistElement.innerHTML = '';
        
        this.playlist.forEach((song, index) => {
            const li = document.createElement('div');
            li.classList.add('playlist-item');
            if (index === this.currentSongIndex) {
                li.classList.add('active');
            }
            
            li.innerHTML = `
                <span class="playlist-song-title">${song.title}</span>
                <span class="playlist-song-artist">${song.artist}</span>
            `;
            
            li.addEventListener('click', () => {
                this.currentSongIndex = index;
                this.loadSong(this.currentSongIndex);
                this.playSong();
            });
            
            this.playlistElement.appendChild(li);
        });
    }
    
    loadSong(index) {
        const song = this.playlist[index];
        this.songTitle.textContent = song.title;
        this.songArtist.textContent = song.artist;
        this.audioElement.src = song.src;
        
        // Update playlist active item
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    playSong() {
        this.isPlaying = true;
        this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.audioElement.play();
    }
    
    pauseSong() {
        this.isPlaying = false;
        this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.audioElement.pause();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    }
    
    prevSong() {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0) {
            this.currentSongIndex = this.playlist.length - 1;
        }
        
        this.loadSong(this.currentSongIndex);
        this.playSong();
    }
    
    nextSong() {
        this.currentSongIndex++;
        if (this.currentSongIndex >= this.playlist.length) {
            this.currentSongIndex = 0;
        }
        
        this.loadSong(this.currentSongIndex);
        this.playSong();
    }
    
    updateProgress() {
        const { currentTime, duration } = this.audioElement;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        
        this.currentTimeElement.textContent = this.formatTime(currentTime);
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
}