import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

function MP3Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Autoplay khi vào trang
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = volume;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Autoplay bị chặn:', error);
        // Autoplay có thể bị chặn bởi trình duyệt
      }
    };
    playAudio();
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-4 w-80 backdrop-blur-lg bg-opacity-90">
      <audio
        ref={audioRef}
        src="Yêu một người có lẽ - Lou Hoàng, Miu Lê _ hqhuy cover (ft. Hziaa).mp3" // Thay đổi đường dẫn file MP3 của bạn
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        loop
      />
      
      <div className="flex flex-col gap-3">
        {/* Title */}
        <div className="text-white font-semibold text-center truncate">
          🎵 Background Music
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 text-white text-xs">
          <span className="w-10">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <span className="w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="bg-white text-purple-600 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-xl" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 flex-1 ml-4">
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-white bg-opacity-30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MP3Player;
