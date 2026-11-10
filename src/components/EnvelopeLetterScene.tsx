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
  body = "Dear Friends and Family,\n\nWith the divine blessings of Lord Ganesha and our beloved elders, we are overjoyed to embark on this sacred journey of holy matrimony.\n\nYour presence, blessings, and warm wishes mean the world to us as we unite our lives in the sacred bond of marriage.",
  signoff = "With love & respect,\nUday & Priti"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-[#FAF7F0] via-[#FAF1D6]/35 to-[#FFFDF9] overflow-hidden select-none">
      {/* Floating Auspicious Petals */}
      <FloatingPetals count={10} />

      {/* Top Header Tag */}
      <div className="relative z-20 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9]/95 backdrop-blur-sm border border-[#D4AF37]/50 shadow-sm mb-2">
          <span className="text-[#D4AF37] text-xs">卐</span>
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#7E152D] font-bold">
            शुभ निमंत्रण • Sacred Invitation
          </span>
          <span className="text-[#D4AF37] text-xs">卐</span>
        </div>
        <h2 className="mt-1 text-3xl sm:text-4xl font-cursive text-[#5C0D1E]">
          A Heartfelt Message from {partnerOne} & {partnerTwo}
        </h2>
        <p className="mt-1.5 text-xs font-serif italic text-[#8B6508]">
          {isOpen ? "Click envelope to fold back" : "Tap the royal golden wax seal to unseal the invitation"}
        </p>
      </div>

      {/* Royal Indian Wedding Envelope (Kankotri) */}
      <div className="envelope-container relative z-30 my-4">
        <div
          className={`envelope-wrapper ${isOpen ? 'flap' : ''}`}
          onClick={toggleEnvelope}
          role="button"
          tabIndex={0}
          aria-label="Wedding Invitation Envelope"
        >
          <div className="envelope">
            {/* The Handcrafted Letter inside */}
            <div className="letter">
              <div className="letter-border">
                {/* Traditional Sanskrit Header */}
                <div className="text-center pb-0.5">
                  <span className="text-[10px] font-devanagari font-bold text-[#7E152D] tracking-widest">
                    ॥ श्री गणेशाय नमः ॥
                  </span>
                </div>
                
                <div className="text flex-1 flex flex-col justify-between">
                  <div>
                    <strong className="block text-xs sm:text-[13px] font-bold text-[#5C0D1E] mb-1 text-center font-royal tracking-wide">
                      {heading}
                    </strong>
                    <div className="text-content space-y-1 text-[13.5px] sm:text-xs leading-snug text-[#3D0612]">
                      {body.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                  <p className="sincerely mt-1.5 text-[11px] sm:text-xs font-semibold text-[#7E152D]">
                    {signoff.split('\n')[0]}{' '}
                    <span className="text-[#9E243F] font-bold">{signoff.split('\n')[1] || `${partnerOne} & ${partnerTwo}`}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Royal 24K Gold Wax Seal with Auspicious Om / Ganpati relief */}
          <div className="gold-wax-seal" title="Tap to open sealed letter">
            <span className="seal-symbol">ॐ</span>
          </div>
        </div>
      </div>

      {/* Post-Open Action Button to View Details */}
      <div className="relative z-30 mt-12 flex flex-col items-center">
        <button
          onClick={onScrollToDetails}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7E152D] via-[#9E243F] to-[#7E152D] text-[#FFF9E6] font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-xl hover:shadow-[#7E152D]/40 hover:scale-105 border border-[#D4AF37]/50 transition-all duration-300"
        >
          <span>View Ceremonies & Venue</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FDE68A]" />
        </button>
        <p className="mt-3 text-xs font-serif italic text-[#7E152D]/85 tracking-wide text-center">
          Scroll down to discover auspicious wedding ceremonies, muhurat & directions
        </p>
      </div>

      {/* Scoped CSS Implementation for Royal Indian Envelope */}
      <style>{`
        :root {
          --primary: #FFFDF9;
          --bg-envelope-color: #8C1D34;
          --envelope-tab: #A32842;
          --envelope-cover: #731326;
          --shadow-color: rgba(92, 13, 30, 0.35);
          --seal-gold-1: #FFE79A;
          --seal-gold-2: #D4AF37;
          --seal-gold-3: #8C6718;
          --txt-color: #3D0612;
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
          box-shadow: 0 18px 45px var(--shadow-color);
          border-radius: 6px;
          cursor: pointer;
          transition: transform 0.3s ease;
          border: 1px solid rgba(212, 175, 55, 0.4);
        }

        .envelope-wrapper:hover {
          transform: translateY(-3px);
        }

        .envelope-wrapper > .envelope {
          position: relative;
          width: 350px;
          height: 250px;
        }

        @media (min-width: 640px) {
          .envelope-wrapper > .envelope {
            width: 380px;
            height: 265px;
          }
        }

        /* Top Flap (Triangular fold with gold lining) */
        .envelope-wrapper > .envelope::before {
          content: "";
          position: absolute;
          top: 0;
          z-index: 2;
          border-top: 135px solid var(--envelope-tab);
          border-right: 175px solid transparent;
          border-left: 175px solid transparent;
          transform-origin: top;
          transition: all 0.5s ease-in-out 0.7s;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        @media (min-width: 640px) {
          .envelope-wrapper > .envelope::before {
            border-top: 140px solid var(--envelope-tab);
            border-right: 190px solid transparent;
            border-left: 190px solid transparent;
          }
        }

        /* Bottom & Side Pocket Folds */
        .envelope-wrapper > .envelope::after {
          content: "";
          position: absolute;
          z-index: 2;
          width: 0px;
          height: 0px;
          border-top: 135px solid transparent;
          border-right: 175px solid var(--envelope-cover);
          border-bottom: 125px solid var(--envelope-cover);
          border-left: 175px solid var(--envelope-cover);
        }

        @media (min-width: 640px) {
          .envelope-wrapper > .envelope::after {
            border-top: 140px solid transparent;
            border-right: 190px solid var(--envelope-cover);
            border-bottom: 135px solid var(--envelope-cover);
            border-left: 190px solid var(--envelope-cover);
          }
        }

        .sincerely {
          text-align: right;
        }

        /* Letter Inside Envelope */
        .envelope > .letter {
          position: absolute;
          right: 7%;
          bottom: 0;
          width: 86%;
          height: 90%;
          background: var(--primary);
          text-align: center;
          transition: all 1s ease-in-out;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
          padding: 6px;
          border-radius: 6px;
          box-sizing: border-box;
          overflow: hidden;
          z-index: 1;
        }

        .letter-border {
          width: 100%;
          height: 100%;
          border: 1.5px solid #D4AF37;
          border-radius: 4px;
          padding: 8px 10px;
          box-sizing: border-box;
          outline: 1px dashed rgba(212, 175, 55, 0.45);
          outline-offset: -3px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: radial-gradient(circle at center, #FFFDF9 60%, #FAF2DE 100%);
        }

        .envelope > .letter .text {
          font-family: "Caveat", cursive;
          font-style: normal;
          color: var(--txt-color);
          text-align: justify;
          font-size: 11.5px;
          line-height: 1.32;
        }

        @media (min-width: 640px) {
          .envelope > .letter .text {
            font-size: 12.5px;
            line-height: 1.35;
          }
        }

        .text strong {
          font-size: 13.5px;
          font-family: "Cinzel", "Cormorant Garamond", serif;
          letter-spacing: 0.5px;
        }

        /* Royal 24K Gold Wax Seal */
        .gold-wax-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, var(--seal-gold-1) 0%, var(--seal-gold-2) 55%, var(--seal-gold-3) 100%);
          border: 2px solid #FFF2BD;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.6);
          transform: translate(-50%, -20%);
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.5s ease-in-out 1s, opacity 0.4s ease;
        }

        .seal-symbol {
          font-family: "Tiro Devanagari Hindi", serif;
          font-size: 19px;
          font-weight: 700;
          color: #5C0D1E;
          text-shadow: 0 1px 1px rgba(255, 240, 180, 0.8), 0 -1px 1px rgba(90, 15, 30, 0.5);
          line-height: 1;
        }

        /* Open Flap State */
        .flap > .envelope::before {
          transform: rotateX(180deg);
          z-index: 0;
        }

        .flap > .envelope > .letter {
          bottom: 105px;
          height: 94%;
          transform: scale(1.36);
          transition-delay: 0.9s;
          z-index: 5;
          box-shadow: 0 18px 35px rgba(92, 13, 30, 0.3);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #D4AF37 transparent;
        }

        .flap > .envelope > .letter::-webkit-scrollbar {
          width: 3px;
        }

        .flap > .envelope > .letter::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 3px;
        }

        @media (max-width: 639px) {
          .flap > .envelope > .letter {
            bottom: 90px;
            transform: scale(1.26);
          }
        }
        }

        .flap > .gold-wax-seal {
          transform: translate(-50%, -20%) scale(0.6) rotate(90deg);
          transition-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};
