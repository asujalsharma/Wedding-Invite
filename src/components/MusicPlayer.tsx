import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, ExternalLink } from 'lucide-react';
import { weddingMusic } from '../utils/audioPlayer';

interface Props {
  customTrackUrl?: string;
  trackTitle?: string;
  trackArtist?: string;
  spotifyUrl?: string;
}

export const MusicPlayer: React.FC<Props> = ({
  customTrackUrl,
  trackTitle = 'Pal Pal Dil Ke Paas',
  trackArtist = 'Paras Nath • Unwind Instrumental',
  spotifyUrl = 'https://open.spotify.com/track/1Dt1SdjNS7NBuQLB5cVW1o'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setHasInteracted] = useState(false);

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
      {/* Main Music Toggle Pill */}
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-md transition-all duration-300 shadow-md ${
          isPlaying
            ? 'bg-[#FFFDF9]/95 border-[#D4AF37] text-[#5C0D1E] shadow-[#D4AF37]/25 ring-1 ring-[#D4AF37]/40'
            : 'bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] border-[#D4AF37]/50 text-[#8C6718] hover:text-[#5C0D1E]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[#FFFDF9] transition-all duration-500 shadow-xs ${
              isPlaying
                ? 'bg-gradient-to-tr from-[#7E152D] via-[#B8860B] to-[#7E152D] animate-spin [animation-duration:8s]'
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
          <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6718] flex items-center gap-1.5">
            <span>{isPlaying ? '॥ मंगल धुन ॥' : 'Wedding Music'}</span>
            {isPlaying && (
              <span className="inline-flex items-center gap-0.5">
                <span className="w-1 h-2 bg-[#9E243F] animate-pulse rounded-full" />
                <span className="w-1 h-3.5 bg-[#D4AF37] animate-pulse [animation-delay:150ms] rounded-full" />
                <span className="w-1 h-2 bg-[#9E243F] animate-pulse [animation-delay:300ms] rounded-full" />
              </span>
            )}
          </p>
          <p className="text-xs font-serif italic text-[#5C0D1E] max-w-[150px] truncate font-semibold" title={`${trackTitle} — ${trackArtist}`}>
            {trackTitle}
          </p>
        </div>

        <div className="pl-1 text-[#7E152D]">
          {isPlaying ? <Volume2 className="w-4 h-4 text-[#7E152D]" /> : <VolumeX className="w-4 h-4 opacity-70" />}
        </div>
      </button>

      {/* Spotify External Link Pill */}
      {spotifyUrl && (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`Listen to "${trackTitle}" on Spotify`}
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] border border-[#1DB954]/50 hover:border-[#1DB954] text-[#1DB954] text-xs font-medium shadow-md backdrop-blur-md transition-all hover:scale-105"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.216.353-.675.467-1.028.25-2.816-1.72-6.36-2.11-10.536-1.157-.402.092-.801-.16-.893-.563-.092-.403.16-.802.563-.894 4.57-1.042 8.484-.598 11.644 1.336.353.217.467.676.25 1.028zm1.464-3.256c-.272.441-.853.582-1.294.31-3.223-1.98-8.136-2.553-11.95-1.396-.497.15-1.025-.133-1.176-.63-.15-.497.133-1.024.63-1.176 4.364-1.324 9.787-.68 13.48 1.598.441.272.582.853.31 1.294zm.126-3.393c-3.864-2.295-10.245-2.507-13.93-1.388-.593.18-1.223-.157-1.403-.75-.18-.593.157-1.223.75-1.403 4.24-1.288 11.285-1.04 15.71 1.587.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.519.413z"/>
          </svg>
          <span className="text-[11px] font-sans font-semibold text-[#191414]">Spotify</span>
          <ExternalLink className="w-3 h-3 text-[#1DB954]" />
        </a>
      )}
    </div>
  );
};
