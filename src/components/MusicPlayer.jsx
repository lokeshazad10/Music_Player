import React, { useState, useEffect, useRef } from "react";
import "../styles/MusicPlayer.css";

const MusicPlayer = () => {
  const [songs] = useState([
    { id: 1, name: "Fine Shyt", file: "/Audio/Fine Shyt.mp3" },
    { id: 2, name: "Shkini", file: "/Audio/SHKINI.mp3" },
    { id: 3, name: "Nain Bengali", file: "/Audio/Nain Bengali.mp3" },
    { id: 4, name: "Sirra", file: "/Audio/Sirra.mp3" },
    { id: 5, name: "Azul", file: "/Audio/AZUL.mp3" },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
      setIsPlaying(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    } else {
      audio.pause();
    }
  }, [currentSongIndex, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const playNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1,
    );
    setIsPlaying(true);
  };

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="music-player-container">
      <audio ref={audioRef} src={currentSong.file} preload="auto" />

      <div className="music-player">
        <div className="song-info">
          <h2 className="song-name">{currentSong.name}</h2>
          <p className="song-artist">
            Song {currentSongIndex + 1} of {songs.length}
          </p>
          {songs.length > 1 && (
            <button
              className="playlist-btn"
              onClick={() => setShowPlaylist((prev) => !prev)}
              title="Toggle Playlist"
            >
              📋 Playlist
            </button>
          )}
        </div>

        <div className="progress-section">
          <span className="time-label">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time-label">{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button className="control-btn" onClick={playPrev} title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          <button
            className="control-btn play-btn"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button className="control-btn" onClick={playNext} title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 18h2V6h-2v12zM2 18l8.5-6L2 6v12z" />
            </svg>
          </button>
        </div>

        <div className="volume-section">
          <svg className="volume-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>

        {showPlaylist && songs.length > 1 && (
          <div className="playlist">
            <h3 className="playlist-title">Playlist</h3>
            <div className="playlist-items">
              {songs.map((song, index) => (
                <button
                  key={song.id}
                  className={`playlist-item ${
                    index === currentSongIndex ? "active" : ""
                  }`}
                  onClick={() => playSong(index)}
                >
                  <span className="song-number">{index + 1}</span>
                  <span className="song-title">{song.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
