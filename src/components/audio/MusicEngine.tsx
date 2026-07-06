import { useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Disc3 } from 'lucide-react';

export const MusicEngine = () => {
  const { isAudioPlaying, toggleAudio } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Placeholder for actual romantic orchestral music
      audioRef.current.src = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_73229bbf78.mp3?filename=romantic-piano-113262.mp3'; 
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    if (isAudioPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-8 right-8 z-[100] p-3 rounded-full glass-panel text-white hover:bg-white/20 transition-all duration-300 group shadow-xl hover:shadow-primary/50"
      aria-label="Toggle Music"
    >
      {isAudioPlaying ? (
        <Disc3 className="w-8 h-8 animate-[spin_3s_linear_infinite] text-primary" />
      ) : (
        <Disc3 className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
      <div className="absolute top-full mt-2 right-0 whitespace-nowrap text-xs font-body text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
        {isAudioPlaying ? 'Pause Our Song' : 'Play Our Song'}
      </div>
    </button>
  );
};
