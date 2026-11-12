import React, { useState } from 'react';
import { Share2, Heart, Calendar, Check, Lock } from 'lucide-react';
import { generateGoogleCalendarUrl } from '../utils/calendar';
import { Link } from 'react-router-dom';

interface Props {
  partnerOne?: string;
  partnerTwo?: string;
  weddingDateStr?: string | Date;
}

export const ClosingSection: React.FC<Props> = ({
  partnerOne = 'Uday',
  partnerTwo = 'Preeti',
  weddingDateStr = '2026-11-25T17:00:00.000Z'
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${partnerOne} & ${partnerTwo} Wedding Invitation`,
      text: `You are cordially invited to celebrate the wedding of ${partnerOne} & ${partnerTwo} on November 25, 2026.`,
      url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      alert(`Invitation link: ${url}`);
    }
  };

  const handleAddToCalendar = () => {
    const url = generateGoogleCalendarUrl({
      title: `Wedding of ${partnerOne} & ${partnerTwo}`,
      description: `Wedding celebration at Shri Radhey Paradise Marriage Garden, Gwalior`,
      location: 'Shri Radhey Paradise Marriage Garden, Near Hazira Mallgaddha Police Station, Mau, Bhadroli Road, Gwalior (M.P.)',
      startDate: new Date('2026-11-25T17:00:00.000Z'),
      endDate: new Date('2026-11-25T23:30:00.000Z')
    });
    window.open(url, '_blank');
  };

  return (
    <footer className="py-20 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] text-center relative overflow-hidden">
      {/* Decorative floral watermark */}
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Floating Auspicious Kalash / Diya Medallion */}
        <div className="w-14 h-14 rounded-full bg-[#FFFDF9] shadow-md border-2 border-[#D4AF37] flex items-center justify-center text-[#7E152D] mb-5">
          <span className="text-xl">🪔</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFDF9] border border-[#D4AF37]/45 mb-2 shadow-2xs">
          <span className="text-[#D4AF37] text-xs">卐</span>
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#7E152D] font-bold">
            ॥ कृतज्ञता एवं शुभाशीर्वाद ॥
          </span>
          <span className="text-[#D4AF37] text-xs">卐</span>
        </div>

        <h2 className="mt-2 text-4xl sm:text-5xl font-cursive text-[#5C0D1E]">
          With Gratitude & Joy
        </h2>

        <p className="mt-4 text-sm font-serif italic text-[#7E152D] max-w-md leading-relaxed">
          "We cannot wait to celebrate the beginning of our new chapter surrounded by the sacred blessings, love, and joy of our dearest family and friends."
        </p>

        <p className="mt-6 font-cursive text-3xl sm:text-4xl text-[#5C0D1E]">
          {partnerOne} & {partnerTwo}
        </p>

        <p className="mt-1.5 font-serif text-xs text-[#8C6718] uppercase tracking-widest font-semibold">
          November 25, 2026 • Shri Radhey Paradise, Gwalior
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#5C0D1E] border border-[#D4AF37]/70 shadow-sm hover:bg-[#FAF7F0] text-xs font-sans uppercase tracking-wider font-semibold transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Share Invitation</span>
              </>
            )}
          </button>

          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7E152D] via-[#9E243F] to-[#7E152D] text-[#FFF9E6] border border-[#D4AF37]/50 shadow-md hover:shadow-[#7E152D]/30 text-xs font-sans uppercase tracking-wider font-semibold transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Add to Calendar</span>
          </button>
        </div>

        {/* Admin Link at the very bottom */}
        <div className="mt-16 pt-8 border-t border-[#D4AF37]/35 flex items-center justify-center gap-2 text-[11px] text-[#8C6718]/80">
          <span>Royal Indian Bespoke Wedding Invitation</span>
          <span>•</span>
          <Link
            to="/admin"
            className="flex items-center gap-1 text-[#7E152D] hover:text-[#5C0D1E] font-medium transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Host Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
