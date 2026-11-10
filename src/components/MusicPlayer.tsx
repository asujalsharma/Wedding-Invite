import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingMusic } from '../utils/audioPlayer';

interface Props {
  customTrackUrl?: string;
  trackTitle?: string;
}

export const MusicPlayer: React.FC<Props> = ({ customTrackUrl, trackTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (customTrackUrl) {
      weddingMusic.setCustomUrl(customTrackUrl);
    }
    weddingMusic.setListener((playing) => {
      setIsPlaying(playing);
      if (playing) setHasInteracted(true);
    });
  }, [customTrackUrl]);

  const handleToggle = async () => {
    setHasInteracted(true);
    await weddingMusic.toggle();
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-md ${
          isPlaying
            ? 'bg-[#FFFDF9]/95 border-[#D4AF37] text-[#5C0D1E] shadow-[#D4AF37]/25'
            : 'bg-[#FFFDF9]/85 hover:bg-[#FFFDF9] border-[#D4AF37]/50 text-[#8C6718] hover:text-[#5C0D1E]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[#FFFDF9] transition-all duration-500 shadow-xs ${
              isPlaying
                ? 'bg-gradient-to-tr from-[#7E152D] to-[#D4AF37] animate-spin [animation-duration:8s]'
                : 'bg-[#D4AF37]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
          </div>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9E243F]"></span>
            </span>
          )}
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6718]">
            {isPlaying ? '॥ मंगल धुन ॥' : 'Wedding Music'}
          </p>
          <p className="text-xs font-serif italic text-[#5C0D1E] max-w-[140px] truncate font-medium">
            {trackTitle || 'Sacred Raag Melody'}
          </p>
        </div>

        <div className="pl-1 text-[#7E152D]">
          {isPlaying ? <Volume2 className="w-4 h-4 text-[#7E152D]" /> : <VolumeX className="w-4 h-4 opacity-70" />}
        </div>
      </button>
    </div>
  );
};
