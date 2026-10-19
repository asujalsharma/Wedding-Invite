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

export const LandscapeAnnouncementScene: React.FC<Props> = ({
  onProceedToEnvelope,
  partnerOne = 'Uday',
  partnerTwo = 'Priti',
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
      {/* Background Scenic Watercolor: Ornate Stone Arch, Lake, Mountains, Balustrade Terrace */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/lake_arch_scenic.jpg')" }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />

      {/* Floating Petals Layer */}
      <FloatingPetals count={10} />

      {/* Soft Vignette & Paper texture gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E1EDF5]/40 via-transparent to-[#FDFCF7]/60 pointer-events-none" />

      {/* Top Tagline */}
      <motion.div
        className="relative z-30 pt-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#2A5171] font-semibold bg-white/75 backdrop-blur-md px-5 py-2 rounded-full border border-[#9ECAE4]/40 shadow-sm">
          Save the Date
        </span>
      </motion.div>

      {/* Center Announcement Typography Card */}
      <motion.div
        className="relative z-30 flex flex-col items-center text-center max-w-lg px-6 my-auto"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative p-8 sm:p-11 rounded-t-[120px] sm:rounded-t-[160px] rounded-b-3xl bg-white/80 backdrop-blur-md border border-[#D4AF37]/40 shadow-[0_25px_60px_rgba(42,81,113,0.18)] flex flex-col items-center">
          {/* Webgency Luxury Monogram Badge */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FDFCF7] to-[#E1EDF5] border-2 border-[#D4AF37]/60 shadow-md flex items-center justify-center mb-4 text-[#2A5171] font-serif font-bold text-sm tracking-widest relative">
            <span className="relative z-10">UP</span>
            <div className="absolute inset-1 rounded-full border border-[#D4AF37]/30 pointer-events-none" />
          </div>

          {/* Subtle Decorative Floral Ornament */}
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <span className="h-[1px] w-8 bg-[#73B2D9]" />
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="h-[1px] w-8 bg-[#73B2D9]" />
          </div>

          {/* Couple's Names in Romantic Cursive Typography */}
          <h1 className="text-4xl sm:text-6xl font-cursive text-[#1F3C55] tracking-wide leading-tight py-1">
            {partnerOne} & {partnerTwo}
          </h1>

          {/* Announcement Subtitle */}
          <p className="mt-3 text-lg sm:text-xl font-serif italic text-[#3D7BAA] tracking-wider">
            {announcementText}
          </p>

          {/* Refined Serif Date */}
          <div className="mt-5 pt-4 border-t border-[#C4DCED]/60 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#586A56] font-medium">
              We warmly invite you on
            </span>
            <span className="mt-1 text-base sm:text-lg font-serif font-semibold text-[#2A5171] tracking-wide">
              {weddingDate}
            </span>
            <span className="text-xs text-[#73B2D9] font-serif italic mt-0.5">
              Shri Radhey Paradise Marriage Garden • Gwalior
            </span>
          </div>

          {/* Call to Action Button */}
          <motion.button
            onClick={handleProceed}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-7 flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-[#5297C7] to-[#3D7BAA] text-white font-sans text-xs uppercase tracking-[0.2em] font-medium shadow-lg hover:shadow-[#5297C7]/30 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>Open Sealed Letter</span>
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
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#31628A] opacity-80 mb-1">
          Proceed to Invitation
        </span>
        <ChevronDown className="w-4 h-4 text-[#31628A] animate-bounce" />
      </motion.div>
    </div>
  );
};
