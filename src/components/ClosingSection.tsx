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
  partnerTwo = 'Priti',
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
    <footer className="py-20 px-4 bg-gradient-to-b from-[#FDFCFA] to-[#E1EDF5]/40 text-center relative overflow-hidden">
      {/* Decorative floral arch watermark */}
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Floating Heart Icon */}
        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#C4DCED] flex items-center justify-center text-[#5297C7] mb-6">
          <Heart className="w-6 h-6 fill-[#E1EDF5]" />
        </div>

        <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#73B2D9] font-semibold">
          With Gratitude & Joy
        </span>

        <h2 className="mt-2 text-4xl sm:text-5xl font-cursive text-[#1F3C55]">
          Thank You
        </h2>

        <p className="mt-4 text-sm font-serif italic text-[#334E68] max-w-md leading-relaxed">
          "We cannot wait to celebrate the beginning of our new chapter surrounded by the people who mean the world to us."
        </p>

        <p className="mt-6 font-cursive text-3xl text-[#2A5171]">
          {partnerOne} & {partnerTwo}
        </p>

        <p className="mt-1 font-serif text-xs text-[#889C86] uppercase tracking-widest">
          November 25, 2026 • Shri Radhey Paradise, Gwalior
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#2A5171] border border-[#73B2D9] shadow-sm hover:bg-[#F0F6FA] text-xs font-sans uppercase tracking-wider font-medium transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#5297C7]" />
                <span>Share Invitation</span>
              </>
            )}
          </button>

          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#5297C7] to-[#3D7BAA] text-white shadow-sm hover:shadow-md text-xs font-sans uppercase tracking-wider font-medium transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </button>
        </div>

        {/* Admin Link at the very bottom */}
        <div className="mt-16 pt-8 border-t border-[#C4DCED]/50 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <span>Custom European Animated Wedding Invitation</span>
          <span>•</span>
          <Link
            to="/admin"
            className="flex items-center gap-1 text-[#73B2D9] hover:text-[#2A5171] transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
