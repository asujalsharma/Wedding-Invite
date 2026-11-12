import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ChevronDown } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';
import { weddingMusic } from '../utils/audioPlayer';

interface Props {
  onProceedToEnvelope: () => void;
  partnerOne?: string;
  partnerTwo?: string;
  announcementText?: string;
  weddingDate?: string;
}

// Elegant Minimalist Sacred Ganesha Icon
export const SacredGaneshaIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 text-[#D4AF37]' }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Auspicious Ganesha Calligraphic Form */}
    <path d="M50 8C48 8 45 10 45 13C45 16 48 18 50 18C52 18 55 16 55 13C55 10 52 8 50 8Z" />
    <path d="M49 22C42 22 36 26 33 32C30 38 31 46 36 51C39 54 44 56 48 56C51 56 53 58 53 61C53 66 49 70 44 70C41 70 38 69 36 67C34.5 65.5 32 66 31 68C30 70 30.5 72.5 32.5 74C35.5 76.5 40 78 44 78C53.5 78 61 70.5 61 61C61 54 56 48 50 48C46 48 41 45 40 41C39 37 41 33 45 31C47 29.5 50 29 53 29.5C55 30 57 28.5 57.5 26.5C58 24.5 56.5 22.5 54.5 22C52.7 21.9 50.8 22 49 22Z" />
    <path d="M64 34C60 34 57 37 57 41C57 43 58.5 44.5 60.5 44.5C62.5 44.5 64 43 64 41C64 39.5 65 38.5 66.5 38.5C68 38.5 69 39.5 69 41C69 44 65.5 47 62 48.5C60.5 49 59.5 51 60 52.5C60.5 54 62.5 55 64 54C69 52 76 48 76 41C76 37 71 34 64 34Z" />
    <circle cx="56" cy="33" r="2.5" />
    {/* Auspicious Tilak / Tika mark */}
    <path d="M49 14L51 14L50.5 19L49.5 19Z" fill="#C92A42" />
  </svg>
);

export const LandscapeAnnouncementScene: React.FC<Props> = ({
  onProceedToEnvelope,
  partnerOne = 'Uday',
  partnerTwo = 'Preeti',
  announcementText = 'are getting married!',
  weddingDate = 'Wednesday, November 25, 2026'
}) => {
  const handleProceed = async () => {
    try {
      if (!weddingMusic.getIsPlaying()) {
        await weddingMusic.play();
      }
    } catch (e) {
      // ignore
    }
    onProceedToEnvelope();
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-between select-none">
      {/* Background Royal Indian Palace Courtyard & Ornate Jharokha Arch */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/indian_wedding_palace_scenic.jpg')" }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />

      {/* Floating Rose & Marigold Petals Layer */}
      <FloatingPetals count={14} />

      {/* Cinematic Dark Vignette Overlay for Crisp Readability & Contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />

      {/* Auspicious Sanskrit Invocation Header */}
      <motion.div
        className="relative z-30 pt-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FFFDF8] border-2 border-[#D4AF37] shadow-[0_4px_25px_rgba(0,0,0,0.35)]">
          <span className="text-[#B8860B] text-xs">卐</span>
          <span className="text-xs sm:text-sm font-devanagari font-bold text-[#7E152D] tracking-widest">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <span className="text-[#B8860B] text-xs">卐</span>
        </div>
      </motion.div>

      {/* Center Announcement Typography Card with Indian Royal Jharokha Arch */}
      <motion.div
        className="relative z-30 flex flex-col items-center text-center max-w-lg px-6 my-auto"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative p-7 sm:p-10 rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl bg-[#FFFDF8] border-2 border-[#D4AF37] shadow-[0_25px_70px_rgba(0,0,0,0.55)] flex flex-col items-center w-full">
          
          {/* Ornate Gold Filigree Inner Border Accent */}
          <div className="absolute inset-2.5 rounded-t-[130px] sm:rounded-t-[170px] rounded-b-2xl border border-dashed border-[#D4AF37]/50 pointer-events-none" />

          {/* Sacred Ganesha Emblem Medallion */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7E152D] to-[#9E243F] border-2 border-[#D4AF37] shadow-lg flex items-center justify-center mb-2.5 relative">
            <SacredGaneshaIcon className="w-9 h-9 text-[#FDE68A]" />
            <div className="absolute inset-1 rounded-full border border-[#D4AF37]/50 pointer-events-none" />
          </div>

          {/* Auspicious Shubh Vivah Tag in High-Contrast Gold Pill */}
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#7E152D] font-bold bg-[#FAF2DE] border border-[#D4AF37]/70 px-4 py-1 rounded-full mb-1.5 shadow-2xs">
            शुभ विवाह • Save the Date
          </span>

          {/* Decorative Gold & Floral Divider */}
          <div className="flex items-center gap-3 mb-1.5 opacity-90">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-xs text-[#B8860B]">✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Couple's Names in Romantic Royal Typography - Deep Royal Maroon for High Contrast */}
          <h1 className="text-4xl sm:text-6xl font-cursive text-[#4A0815] tracking-wide leading-tight py-1 font-bold">
            {partnerOne} & {partnerTwo}
          </h1>

          {/* Announcement Subtitle */}
          <p className="mt-1 text-base sm:text-lg font-serif italic text-[#5C0D1E] font-medium tracking-wide">
            {announcementText}
          </p>

          {/* Refined Traditional Auspicious Date & Venue */}
          <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/40 flex flex-col items-center w-full">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#7E152D] font-bold font-sans">
              Solicit your gracious presence & blessings on
            </span>
            <span className="mt-1 text-base sm:text-lg font-serif font-bold text-[#4A0815] tracking-wide">
              {weddingDate}
            </span>
            <span className="text-xs text-[#5C0D1E] font-serif font-semibold mt-1">
              Shri Radhey Paradise Marriage Garden • Gwalior (M.P.)
            </span>
          </div>

          {/* Call to Action Button in Royal Crimson & Gold */}
          <motion.button
            onClick={handleProceed}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-6 flex items-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-[#7E152D] via-[#9E243F] to-[#7E152D] text-[#FFFDF9] font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-lg hover:shadow-[#7E152D]/40 border border-[#D4AF37]/60 transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-[#FDE68A]" />
            <span>Open Auspicious Invitation</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom Hint / Skip */}
      <motion.div
        className="relative z-30 pb-6 flex flex-col items-center cursor-pointer"
        onClick={handleProceed}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white font-semibold drop-shadow-md mb-1">
          Proceed to Invitation Details
        </span>
        <ChevronDown className="w-4 h-4 text-white drop-shadow-md animate-bounce" />
      </motion.div>
    </div>
  );
};
