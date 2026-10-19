import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';

interface Props {
  onScrollToDetails: () => void;
  partnerOne?: string;
  partnerTwo?: string;
  heading?: string;
  body?: string;
  signoff?: string;
}

export const EnvelopeLetterScene: React.FC<Props> = ({
  onScrollToDetails,
  partnerOne = 'Uday',
  partnerTwo = 'Priti',
  heading = "You're invited!",
  body = "Dear Friends and Family,\n\nAs we get ready to say 'I do,' we feel grateful for the wonderful people in our lives.\n\nYour support means the world to us, and we would be honored to have you with us as we begin our life together.",
  signoff = "With love,\nUday & Priti"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-[#F0F6FA] via-[#E1EDF5]/40 to-[#FDFCF7] overflow-hidden select-none">
      {/* Floating Petals */}
      <FloatingPetals count={8} />

      {/* Top Hint */}
      <div className="relative z-20 mb-8 text-center">
        <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#73B2D9] font-semibold bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#C4DCED] shadow-sm">
          Handcrafted Letter
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-cursive text-[#1F3C55]">
          A Message from {partnerOne} & {partnerTwo}
        </h2>
        <p className="mt-1 text-xs font-serif italic text-[#586A56]">
          {isOpen ? "Click envelope to close" : "Click the heart seal to open the letter"}
        </p>
      </div>

      {/* User's Exact Animated Envelope Component */}
      <div className="envelope-container relative z-30 my-4">
        <div
          className={`envelope-wrapper ${isOpen ? 'flap' : ''}`}
          onClick={toggleEnvelope}
          role="button"
          tabIndex={0}
          aria-label="Wedding Invitation Envelope"
        >
          <div className="envelope">
            <div className="letter">
              <div className="text">
                <strong className="block text-sm sm:text-base font-bold text-[#1F3C55] mb-1.5">
                  {heading}
                </strong>
                <div className="text-content space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-[#2C3E50]">
                  {body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <p className="sincerely mt-2 text-xs sm:text-sm font-semibold text-[#3D7BAA]">
                  {signoff.split('\n')[0]} {signoff.split('\n')[1] || `${partnerOne} & ${partnerTwo}`} ❤️
                </p>
              </div>
            </div>
          </div>
          <div className="heart" />
        </div>
      </div>

      {/* Post-Open Action Button to View Details */}
      <div className="relative z-30 mt-12 flex flex-col items-center">
        <button
          onClick={onScrollToDetails}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#5297C7] to-[#3D7BAA] text-white font-sans text-xs uppercase tracking-[0.2em] font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span>View Wedding Details</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
        <p className="mt-3 text-xs font-serif italic text-[#3D7BAA]/80 tracking-wide text-center">
          Scroll down to discover ceremonies & venue details
        </p>
      </div>

      {/* Scoped CSS Implementation matching user's exact specification */}
      <style>{`
        :root {
          --primary: #FFFFFF;
          --bg-envelope-color: #B9D6EC;
          --envelope-tab: #97C0DE;
          --envelope-cover: #7CB0D5;
          --shadow-color: rgba(30, 60, 90, 0.22);
          --heart-color: #c2465d;
          --txt-color: #1F3C55;
        }

        .envelope-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
        }

        .envelope-wrapper {
          position: relative;
          background: var(--bg-envelope-color);
          box-shadow: 0 15px 40px var(--shadow-color);
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .envelope-wrapper:hover {
          transform: translateY(-2px);
        }

        .envelope-wrapper > .envelope {
          position: relative;
          width: 340px;
          height: 240px;
        }

        @media (min-width: 640px) {
          .envelope-wrapper > .envelope {
            width: 360px;
            height: 250px;
          }
        }

        /* Top Flap (Triangular fold) */
        .envelope-wrapper > .envelope::before {
          content: "";
          position: absolute;
          top: 0;
          z-index: 2;
          border-top: 130px solid var(--envelope-tab);
          border-right: 170px solid transparent;
          border-left: 170px solid transparent;
          transform-origin: top;
          transition: all 0.5s ease-in-out 0.7s;
        }

        @media (min-width: 640px) {
          .envelope-wrapper > .envelope::before {
            border-right: 180px solid transparent;
            border-left: 180px solid transparent;
          }
        }

        /* Bottom & Side Pocket Folds */
        .envelope-wrapper > .envelope::after {
          content: "";
          position: absolute;
          z-index: 2;
          width: 0px;
          height: 0px;
          border-top: 130px solid transparent;
          border-right: 170px solid var(--envelope-cover);
          border-bottom: 120px solid var(--envelope-cover);
          border-left: 170px solid var(--envelope-cover);
        }

        @media (min-width: 640px) {
          .envelope-wrapper > .envelope::after {
            border-right: 180px solid var(--envelope-cover);
            border-left: 180px solid var(--envelope-cover);
          }
        }

        .sincerely {
          text-align: right;
        }

        /* Letter Inside Envelope */
        .envelope > .letter {
          position: absolute;
          right: 13%;
          bottom: 0;
          width: 74%;
          height: 84%;
          background: var(--primary);
          text-align: center;
          transition: all 1s ease-in-out;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
          padding: 16px 14px;
          border-radius: 6px;
          box-sizing: border-box;
          overflow: hidden;
          z-index: 1;
        }

        .envelope > .letter > .text {
          font-family: "Caveat", cursive;
          font-style: normal;
          color: var(--txt-color);
          text-align: justify;
          font-size: 13px;
          line-height: 1.35;
          padding-right: 2px;
        }

        .text strong {
          font-size: 15px;
          font-family: "Caveat", cursive;
          letter-spacing: 0.5px;
        }

        /* Romantic Heart Seal */
        .heart {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 16px;
          height: 16px;
          background: var(--heart-color);
          z-index: 4;
          transform: translate(-50%, -20%) rotate(45deg);
          transition: transform 0.5s ease-in-out 1s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }

        .heart:before, 
        .heart:after {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: var(--heart-color);
          border-radius: 50%;
        }

        .heart:before {
          top: -8px;
        }

        .heart:after {
          right: 8px;
        }

        /* Open Flap State */
        .flap > .envelope::before {
          transform: rotateX(180deg);
          z-index: 0;
        }

        .flap > .envelope > .letter {
          bottom: 95px;
          transform: scale(1.42);
          transition-delay: 0.9s;
          z-index: 5;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 639px) {
          .flap > .envelope > .letter {
            bottom: 85px;
            transform: scale(1.32);
          }
        }

        .flap > .heart {
          transform: rotate(90deg);
          transition-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
