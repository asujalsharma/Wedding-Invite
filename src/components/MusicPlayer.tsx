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
            ? 'bg-white/90 border-[#73B2D9] text-[#2A5171] shadow-[#73B2D9]/20'
            : 'bg-white/80 hover:bg-white border-[#C4DCED] text-[#586A56] hover:text-[#2A5171]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-all duration-500 ${
              isPlaying
                ? 'bg-gradient-to-tr from-[#5297C7] to-[#73B2D9] animate-spin [animation-duration:8s]'
                : 'bg-[#9ECAE4]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
          </div>
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#73B2D9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3D7BAA]"></span>
            </span>
          )}
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-[10px] tracking-wider uppercase font-medium text-[#73B2D9]">
            {isPlaying ? 'Music Playing' : 'Romantic Music'}
          </p>
          <p className="text-xs font-serif italic text-gray-700 max-w-[130px] truncate">
            {trackTitle || 'Acoustic Melody'}
          </p>
        </div>

        <div className="pl-1 text-[#3D7BAA]">
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
        </div>
      </button>
    </div>
  );
};
