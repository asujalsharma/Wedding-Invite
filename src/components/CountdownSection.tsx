import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Download, Sparkles, Wand2 } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { ScratchCard } from './ScratchCard';
import confetti from 'canvas-confetti';

interface Props {
  targetDateStr?: string | Date;
  partnerOne?: string;
  partnerTwo?: string;
}

export const CountdownSection: React.FC<Props> = ({
  targetDateStr = '2026-11-25T17:00:00.000Z',
  partnerOne = 'Uday',
  partnerTwo = 'Preeti'
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [scratchKey, setScratchKey] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const eventData = {
    title: `Wedding of ${partnerOne} & ${partnerTwo}`,
    description: `Wedding ceremony & celebration of ${partnerOne} & ${partnerTwo} at Shri Radhey Paradise Marriage Garden, Gwalior.`,
    location: 'Shri Radhey Paradise Marriage Garden, Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road, Gwalior (M.P.)',
    startDate: new Date('2026-11-25T17:00:00.000Z'),
    endDate: new Date('2026-11-25T23:30:00.000Z')
  };

  const handleGoogleCalendar = () => {
    window.open(generateGoogleCalendarUrl(eventData), '_blank');
  };

  const handleIcsDownload = () => {
    downloadIcsFile(eventData, `wedding-${partnerOne.toLowerCase()}-${partnerTwo.toLowerCase()}.ics`);
  };

  const handleCardRevealed = () => {
    setRevealedCount(prev => {
      const next = prev + 1;
      if (next >= 4) {
        setAllRevealed(true);
      }
      return next;
    });
  };

  const revealAllCards = () => {
    setAllRevealed(true);
    try {
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#9E1B32', '#F59E0B', '#FFF9E6']
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <section className="py-16 px-4 bg-[#FFFDF9] border-y border-[#D4AF37]/30 relative overflow-hidden select-none">
      {/* Decorative Auspicious Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FDF1D6]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/45 mb-2">
          <span className="text-[#D4AF37] text-xs">卐</span>
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#7E152D] font-bold">
            शुभ लग्न मुहूर्त • Auspicious Countdown
          </span>
          <span className="text-[#D4AF37] text-xs">卐</span>
        </div>

        {/* Date Header with Optional Scratch Banner */}
        <div className="mt-2 flex justify-center">
          <ScratchCard
            className="rounded-2xl max-w-md w-full"
            cardLabel="Auspicious Date"
            brushSize={26}
            revealThreshold={0.3}
          >
            <div className="py-2.5 px-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#D4AF37]/50 shadow-sm">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5C0D1E]">
                Wednesday, November 25, 2026
              </h2>
            </div>
          </ScratchCard>
        </div>

        <p className="mt-3 text-sm font-serif italic text-[#8C6718]">
          "The sacred hour approaches as two hearts unite in eternal Vedic bond"
        </p>

        {/* Scratch Instruction Badge */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF9E6] border border-[#E9C775] text-[11px] font-sans text-[#7E152D] font-medium shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Scratch with your finger or cursor to unveil</span>
          </span>

          {!allRevealed && (
            <button
              onClick={revealAllCards}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-[#FAF7F0] border border-[#D4AF37]/50 text-[10px] font-sans uppercase tracking-wider text-[#7E152D] font-semibold transition-colors shadow-xs"
            >
              <Wand2 className="w-3 h-3 text-[#D4AF37]" />
              <span>Reveal All</span>
            </button>
          )}
        </div>

        {/* Scratch-off Countdown Time Cards */}
        <div className="mt-7 grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <ScratchCard
              key={idx}
              id={`scratch-${idx}`}
              className="rounded-2xl shadow-sm border border-[#D4AF37]/50 overflow-hidden"
              cardLabel={item.label}
              brushSize={20}
              revealThreshold={0.35}
              onRevealed={handleCardRevealed}
            >
              <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] p-3 sm:p-5 flex flex-col items-center justify-center h-24 sm:h-28 transition-transform hover:-translate-y-0.5">
                <span className="text-2xl sm:text-4xl font-serif font-bold text-[#5C0D1E] tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-[#B8860B] font-bold mt-1">
                  {item.label}
                </span>
              </div>
            </ScratchCard>
          ))}
        </div>

        {/* Add to Calendar Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleGoogleCalendar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#5C0D1E] border border-[#D4AF37]/60 shadow-sm hover:bg-[#FAF7F0] text-xs font-sans uppercase tracking-wider font-semibold transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#9E243F]" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={handleIcsDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#5C0D1E] border border-[#D4AF37]/60 shadow-sm hover:bg-[#FAF7F0] text-xs font-sans uppercase tracking-wider font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#7E152D]" />
            <span>Download .ICS (Apple/Outlook)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
