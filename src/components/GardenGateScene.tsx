import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { weddingMusic } from '../utils/audioPlayer';

interface Props {
  onOpenGate: () => void;
  partnerOne?: string;
  partnerTwo?: string;
}

export const GardenGateScene: React.FC<Props> = ({
  onOpenGate,
  partnerOne = 'Uday',
  partnerTwo = 'Preeti'
}) => {
  const [isUntied, setIsUntied] = useState(false);
  const [gatesSwungOpen, setGatesSwungOpen] = useState(false);

  const handleUntie = async () => {
    if (isUntied) return;
    setIsUntied(true);

    // Start romantic music on first interaction
    try {
      if (!weddingMusic.getIsPlaying()) {
        await weddingMusic.play();
      }
    } catch (e) {
      // ignore auto-play restriction
    }

    // Step 1: Ribbon dissolves & gate begins swinging open
    setTimeout(() => {
      setGatesSwungOpen(true);
    }, 900);

    // Step 2: Transition into scenic announcement
    setTimeout(() => {
      onOpenGate();
    }, 2400);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#F0F6FA] flex items-center justify-center select-none">
      {/* Background Watercolor Garden Landscape */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/garden_gate.jpg')",
          filter: gatesSwungOpen ? 'blur(1px)' : 'none'
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{
          scale: gatesSwungOpen ? 1.25 : 1,
          opacity: 1
        }}
        transition={{
          scale: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.2 }
        }}
      />

      {/* Soft watercolor paper overlay for authentic painted texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none" />

      {/* Symmetrical Left and Right 3D Swinging Wrought-Iron Gate Doors */}
      <div className="absolute inset-x-0 bottom-0 top-[15%] max-w-md mx-auto pointer-events-none perspective-1200 flex justify-center px-6">
        {/* Left Gate Wing */}
        <motion.div
          className="w-1/2 h-full flex justify-end origin-left"
          animate={{
            rotateY: gatesSwungOpen ? -88 : 0,
            opacity: gatesSwungOpen ? 0.3 : 1,
            x: gatesSwungOpen ? -40 : 0
          }}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <svg viewBox="0 0 160 360" className="h-full max-h-[580px] w-auto drop-shadow-lg" fill="none">
            {/* Blue wrought iron scrollwork */}
            <rect x="10" y="20" width="140" height="320" rx="8" stroke="#3D7BAA" strokeWidth="3.5" fill="none" opacity="0.85" />
            <path d="M10 60 Q80 30 150 60" stroke="#3D7BAA" strokeWidth="2.5" />
            <path d="M10 140 Q80 110 150 140" stroke="#3D7BAA" strokeWidth="2.5" />
            <path d="M10 220 Q80 190 150 220" stroke="#3D7BAA" strokeWidth="2.5" />
            <path d="M10 300 Q80 270 150 300" stroke="#3D7BAA" strokeWidth="2.5" />
            {/* Vertical bars with finials */}
            <line x1="40" y1="20" x2="40" y2="340" stroke="#5297C7" strokeWidth="2" />
            <line x1="75" y1="20" x2="75" y2="340" stroke="#5297C7" strokeWidth="2" />
            <line x1="110" y1="20" x2="110" y2="340" stroke="#5297C7" strokeWidth="2" />
            <line x1="145" y1="20" x2="145" y2="340" stroke="#3D7BAA" strokeWidth="3" />
            {/* Ornate fleur-de-lis / heart scroll in center */}
            <path d="M75 140 C55 110 55 80 75 60 C95 80 95 110 75 140 Z" stroke="#31628A" strokeWidth="2" fill="none" />
            <circle cx="75" cy="180" r="14" stroke="#3D7BAA" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>

        {/* Right Gate Wing */}
        <motion.div
          className="w-1/2 h-full flex justify-start origin-right"
          animate={{
            rotateY: gatesSwungOpen ? 88 : 0,
            opacity: gatesSwungOpen ? 0.3 : 1,
            x: gatesSwungOpen ? 40 : 0
          }}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <svg viewBox="0 0 160 360" className="h-full max-h-[580px] w-auto drop-shadow-lg" fill="none">
            <rect x="10" y="20" width="140" height="320" rx="8" stroke="#3D7BAA" strokeWidth="3.5" fill="none" opacity="0.85" />
            <path d="M10 60 Q80 30 150 60" stroke="#3D7BAA" strokeWidth="2.5" />
            <path d="M10 140 Q80 110 150 140" stroke="#3D7BAA" strokeWidth="2.5" />
            <path d="M10 220 Q80 190 150 220" stroke="#3D7BAA" strokeWidth="2.5" />
            <path d="M10 300 Q80 270 150 300" stroke="#3D7BAA" strokeWidth="2.5" />
            <line x1="15" y1="20" x2="15" y2="340" stroke="#3D7BAA" strokeWidth="3" />
            <line x1="50" y1="20" x2="50" y2="340" stroke="#5297C7" strokeWidth="2" />
            <line x1="85" y1="20" x2="85" y2="340" stroke="#5297C7" strokeWidth="2" />
            <line x1="120" y1="20" x2="120" y2="340" stroke="#5297C7" strokeWidth="2" />
            <path d="M85 140 C65 110 65 80 85 60 C105 80 105 110 85 140 Z" stroke="#31628A" strokeWidth="2" fill="none" />
            <circle cx="85" cy="180" r="14" stroke="#3D7BAA" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* Top Header Monogram / Pre-title */}
      <motion.div
        className="absolute top-10 inset-x-0 flex flex-col items-center justify-center text-center z-30 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#31628A] bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#C4DCED]/50 shadow-sm">
          Wedding Celebration
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-cursive text-[#2A5171] drop-shadow-sm">
          {partnerOne} & {partnerTwo}
        </h1>
      </motion.div>

      {/* Centerpiece: Large White Satin Ribbon & Realistic Bow across the gate */}
      <AnimatePresence>
        {!isUntied && (
          <motion.div
            className="absolute z-40 flex flex-col items-center justify-center cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 1.15,
              opacity: 0,
              y: -30,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            transition={{ delay: 0.6, duration: 1 }}
            onClick={handleUntie}
          >
            {/* Satin Horizontal Ribbon Band */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-[320px] sm:w-[420px] h-9 bg-gradient-to-r from-transparent via-[#FFFFFF] to-transparent shadow-md opacity-90 border-y border-[#E8E3D5]" />
              
              {/* Detailed Satin Bow SVG */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 drop-shadow-xl"
              >
                <svg
                  width="190"
                  height="130"
                  viewBox="0 0 240 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left Loop */}
                  <path
                    d="M120 75 C80 20 20 40 25 75 C30 110 85 95 120 80 Z"
                    fill="url(#satinWhiteGrad)"
                    stroke="#D8D2C2"
                    strokeWidth="1.5"
                  />
                  {/* Right Loop */}
                  <path
                    d="M120 75 C160 20 220 40 215 75 C210 110 155 95 120 80 Z"
                    fill="url(#satinWhiteGrad)"
                    stroke="#D8D2C2"
                    strokeWidth="1.5"
                  />
                  {/* Ribbon Tails hanging down */}
                  <path
                    d="M110 85 C95 110 70 145 60 155 C75 145 105 130 115 100 Z"
                    fill="#F7F4EA"
                    stroke="#E2DCCB"
                    strokeWidth="1"
                  />
                  <path
                    d="M130 85 C145 110 170 145 180 155 C165 145 135 130 125 100 Z"
                    fill="#FDFCF7"
                    stroke="#E2DCCB"
                    strokeWidth="1"
                  />
                  {/* Center Knot */}
                  <ellipse
                    cx="120"
                    cy="78"
                    rx="18"
                    ry="14"
                    fill="url(#satinKnotGrad)"
                    stroke="#D8D2C2"
                    strokeWidth="1.5"
                  />
                  {/* Subtle golden pearl brooch on knot */}
                  <circle cx="120" cy="78" r="4.5" fill="#D4AF37" stroke="#FFF4D0" strokeWidth="1" />

                  <defs>
                    <linearGradient id="satinWhiteGrad" x1="25" y1="20" x2="215" y2="110" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="0.5" stopColor="#F8F6F0" />
                      <stop offset="1" stopColor="#EFECE2" />
                    </linearGradient>
                    <linearGradient id="satinKnotGrad" x1="102" y1="64" x2="138" y2="92" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" />
                      <stop offset="0.7" stopColor="#ECE7DA" />
                      <stop offset="1" stopColor="#DCD4C0" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            {/* Prompt Text */}
            <motion.div
              className="mt-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <p className="text-sm font-serif italic text-[#31628A] tracking-wide mb-3 drop-shadow-sm">
                A little something special awaits...
              </p>

              {/* Action Button */}
              <motion.button
                onClick={handleUntie}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/95 text-[#2A5171] font-sans text-xs uppercase tracking-[0.2em] font-medium border border-[#73B2D9]/40 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                <span>Untie the Ribbon</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#73B2D9] group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button for quick accessibility */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center z-30">
        <button
          onClick={onOpenGate}
          className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#586A56] hover:text-[#2A5171] transition-colors underline-offset-4 hover:underline py-1 px-3 bg-white/40 backdrop-blur-sm rounded-full"
        >
          Skip to Invitation
        </button>
      </div>
    </div>
  );
};
