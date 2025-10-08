import { useState, useRef, useEffect } from 'react';
import Discord from "../../api/userInfo";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faDiscord, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPlay, faPause, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Đường dẫn file MP3 - thay đổi URL này theo file MP3 của bạn
  const audioSrc = "https://minhsoora.site/Yêu một người có lẽ - Lou Hoàng, Miu Lê _ hqhuy cover (ft. Hziaa).mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('Autoplay prevented:', error);
          setIsPlaying(false);
        });
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`p-5 md:rounded-xl shadow-sm transition-all duration-1000 relative overflow-hidden ${
      isPlaying 
        ? 'bg-black text-white' 
        : 'bg-white text-neutral-800'
    }`}>
      {/* Animated Background Lights khi đang phát nhạc */}
      {isPlaying && (
        <>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
          <div className='absolute top-1/2 right-1/3 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>
        </>
      )}
      
      <div className='relative z-10'>
        <Discord></Discord>
        <div className='flex mt-4 gap-2 text-xl'>
          <Tippy animation='scale' content='Gmail'>
            <a target='_blank' rel='noopener noreferrer' className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500' href='mailto:minhsoora@gmail.com'>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </Tippy>
          <Tippy animation='scale' content='Discord'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500'
              href='https://discordredirect.discordsafe.com/users/915876843884777472'>
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </Tippy>
          <Tippy animation='scale' content='Youtube'>
            <a target='_blank' rel='noopener noreferrer' className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500' href='https://youtube.com/@MinhSoora'>
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </Tippy>
          <Tippy animation='scale' content='Facebook'>
            <a target='_blank' rel='noopener noreferrer' className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500' href='https://www.facebook.com/share/1JMPBYJmV9/'>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </Tippy>
        </div>

        {/* MP3 Player */}
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <audio ref={audioRef} src={audioSrc} preload='metadata' />
          
          <div className='flex items-center gap-3'>
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className='rounded-full bg-cyan-500 hover:bg-cyan-600 size-10 flex items-center justify-center text-white transition-colors'
              aria-label={isPlaying ? 'Pause' : 'Play'}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>

            {/* Progress Bar */}
            <div className='flex-1'>
              <input
                type='range'
                min='0'
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className='flex justify-between text-xs text-gray-500 mt-1'>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className='flex items-center gap-2'>
              <button
                onClick={toggleMute}
                className='text-cyan-500 hover:text-cyan-600 transition-colors'
                aria-label={isMuted ? 'Unmute' : 'Mute'}>
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
              </button>
              <input
                type='range'
                min='0'
                max='1'
                step='0.01'
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className='w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`p-5 md:rounded-xl shadow-sm transition-all duration-1000 relative overflow-hidden ${
      isPlaying 
        ? 'bg-black text-white' 
        : 'bg-white text-neutral-800'
    }`}>
      {/* Animated Background Lights khi đang phát nhạc */}
      {isPlaying && (
        <>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
          <div className='absolute top-1/2 right-1/3 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }}></div>
        </>
      )}
      
      <div className='relative z-10'>
        <Discord></Discord>
      <div className='flex mt-4 gap-2 text-xl'>
        <Tippy animation='scale' content='Gmail'>
          <a target='_blank' rel='noopener noreferrer' className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500' href='mailto:minhsoora@gmail.com'>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </Tippy>
        <Tippy animation='scale' content='Discord'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500'
            href='https://discordredirect.discordsafe.com/users/915876843884777472'>
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </Tippy>
        <Tippy animation='scale' content='Youtube'>
          <a target='_blank' rel='noopener noreferrer' className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500' href='https://youtube.com/@MinhSoora'>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </Tippy>
        <Tippy animation='scale' content='Facebook'>
          <a target='_blank' rel='noopener noreferrer' className='rounded-full bg-cyan-200 size-[38px] items-center flex justify-center hover:bg-cyan-500' href='https://www.facebook.com/share/1JMPBYJmV9/'>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </Tippy>
      </div>

      {/* MP3 Player */}
      <div className='mt-4 pt-4 border-t border-gray-200'>
        <audio ref={audioRef} src={audioSrc} preload='metadata' />
        
        <div className='flex items-center gap-3'>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className='rounded-full bg-cyan-500 hover:bg-cyan-600 size-10 flex items-center justify-center text-white transition-colors'
            aria-label={isPlaying ? 'Pause' : 'Play'}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          {/* Progress Bar */}
          <div className='flex-1'>
            <input
              type='range'
              min='0'
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className='flex justify-between text-xs text-gray-500 mt-1'>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className='flex items-center gap-2'>
            <button
              onClick={toggleMute}
              className='text-cyan-500 hover:text-cyan-600 transition-colors'
              aria-label={isMuted ? 'Unmute' : 'Mute'}>
              <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
            </button>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className='w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

export default Header;
