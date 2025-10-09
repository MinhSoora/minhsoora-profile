import { useState, useRef, useEffect } from 'react';
import Discord from "../../api/userInfo";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faDiscord, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPlay, faPause, faVolumeMute, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const audioRef = useRef(null);

  // Thông tin bài hát
  const songTitle = "Bầu Trời Mới - DaLAB ft. Minh Tốc & Lam";
  const audioSrc = "https://minhsoora.site/[Lyrics] Bầu Trời Mới - DaLAB ft. Minh Tốc & Lam - 𝐥𝐠𝐠 𝐚𝐧𝐝 𝐩𝐞𝐚𝐜𝐞𝐟𝐮𝐥.mp3";
  const youtubeUrl = "https://youtu.be/gNZVw_stSZE?si=WAg1XgP-nWK7QFYM";

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

  const handleYoutubeClick = () => {
    setShowYoutubeModal(true);
  };

  const confirmYoutubeRedirect = () => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    setShowYoutubeModal(false);
  };

  const closeModal = () => {
    setShowYoutubeModal(false);
  };

  return (
    <div className='p-5 md:rounded-xl bg-white shadow-sm text-neutral-800'>
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
        
        {/* Song Title */}
        <div className='mb-3 flex items-center justify-between'>
          <h3 className='text-sm font-medium text-gray-700'>{songTitle}</h3>
          <Tippy animation='scale' content='Nghe trên YouTube'>
            <button
              onClick={handleYoutubeClick}
              className='text-cyan-500 hover:text-cyan-600 transition-colors'
              aria-label='Open on YouTube'>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </button>
          </Tippy>
        </div>

        <div className='flex items-center gap-3'>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className='rounded-full bg-cyan-500 hover:bg-cyan-600 size-10 flex items-center justify-center text-white transition-colors'
            aria-label={isPlaying ? 'Pause' : 'Play'}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className='rounded-full bg-gray-200 hover:bg-gray-300 size-10 flex items-center justify-center text-gray-700 transition-colors'
            aria-label={isMuted ? 'Unmute' : 'Mute'}>
            <FontAwesomeIcon icon={faVolumeMute} className={isMuted ? 'text-red-500' : ''} />
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
        </div>
      </div>

      {/* YouTube Redirect Modal */}
      {showYoutubeModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={closeModal}>
          <div className='bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>Rời khỏi trang</h3>
            <p className='text-gray-600 mb-6'>Bạn sẽ được chuyển đến YouTube để nghe bài hát này. Bạn có muốn tiếp tục?</p>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={closeModal}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors'>
                Hủy
              </button>
              <button
                onClick={confirmYoutubeRedirect}
                className='px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors'>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
