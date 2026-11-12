import React, { useState } from 'react';
import { Sun, Flower2, Music, Heart, Sparkles, MapPin, Clock, Shirt, X, Eye } from 'lucide-react';

interface WeddingFunction {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode?: string;
  description?: string;
  icon?: string;
  image?: string;
}

interface Props {
  functions: WeddingFunction[];
}

export const WeddingFunctionsSection: React.FC<Props> = ({ functions }) => {
  const [activeLookbook, setActiveLookbook] = useState<{ title: string; image: string; dressCode: string } | null>(null);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-600" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-emerald-700" />;
      case 'Music': return <Music className="w-5 h-5 text-amber-700" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#9E243F] fill-[#FDE68A]" />;
      default: return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const getLookbookImage = (title: string, fallbackImg?: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('panigrahan') || lower.includes('wedding') || lower.includes('tika')) {
      return '/assets/indian_panigrahan_saat_phere.jpg';
    }
    if (lower.includes('reception') || lower.includes('aashirwad') || lower.includes('preetibhoj')) {
      return '/assets/indian_reception_celebration.jpg';
    }
    if (lower.includes('mandap')) {
      return '/assets/indian_mandap_ceremony.jpg';
    }
    if (lower.includes('vadhu') || lower.includes('aagman')) {
      return '/assets/indian_vadhu_aagman.jpg';
    }
    return fallbackImg || '/assets/indian_wedding_palace_scenic.jpg';
  };

  return (
    <section id="functions" className="py-20 px-4 bg-[#FAF7F0] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-xs">
              <span className="text-[#D4AF37] text-xs">卐</span>
              <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#7E152D] font-bold">
                ॥ मांगलिक कार्यक्रम ॥ • Sacred Vedic Itinerary
              </span>
              <span className="text-[#D4AF37] text-xs">卐</span>
            </span>
          </div>
          <h2 className="mt-2 text-4xl sm:text-5xl font-serif text-[#5C0D1E] font-bold">
            Auspicious Ceremonies
          </h2>
          <p className="mt-3 text-sm sm:text-base font-serif italic text-[#8B6508] max-w-md mx-auto">
            Celebrating the sacred and joyous union of Uday & Preeti with Vedic traditions
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-xs text-[#D4AF37]">✦</span>
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
        </div>

        {/* Timeline / Card List with Royal Gold Thread */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 sm:before:left-1/2 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#D4AF37]/60 before:to-transparent before:-translate-x-1/2">
          {functions.map((fn, index) => {
            const isEven = index % 2 === 0;
            const lookbookImg = getLookbookImage(fn.title, fn.image);

            return (
              <div
                key={fn.id || index}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#FFFDF9] border-2 border-[#D4AF37] shadow-md flex items-center justify-center z-10">
                  {getIcon(fn.icon)}
                </div>

                {/* Event Card Content */}
                <div className="w-full sm:w-[calc(50%-2rem)] pl-16 sm:pl-0">
                  <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border border-[#D4AF37]/45 shadow-[0_10px_25px_-5px_rgba(92,13,30,0.06)] hover:shadow-[0_15px_30px_-5px_rgba(92,13,30,0.14)] hover:border-[#D4AF37] transition-all duration-300 group">
                    
                    {/* Optional Thumbnail Banner */}
                    {fn.image && (
                      <div className="w-full h-36 rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/25">
                        <img
                          src={fn.image}
                          alt={fn.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#7E152D] bg-[#FAF3E0] border border-[#D4AF37]/35 px-3 py-1 rounded-full">
                        Ceremony {index + 1}
                      </span>
                      {fn.subtitle && (
                        <span className="text-xs font-serif italic text-[#8C6718]">
                          {fn.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-[#5C0D1E] group-hover:text-[#9E243F] transition-colors">
                      {fn.title}
                    </h3>

                    {/* Date and Time */}
                    <div className="mt-3.5 space-y-2 text-xs text-[#3D0612]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="font-semibold text-[#5C0D1E]">{fn.date}</span>
                        <span className="text-[#D4AF37]">•</span>
                        <span className="font-medium text-[#7E152D]">{fn.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#9E243F] shrink-0" />
                        <span className="font-semibold text-gray-800">{fn.venue}</span>
                        <span className="text-gray-500">({fn.address})</span>
                      </div>

                      {fn.dressCode && (
                        <div className="flex items-center justify-between gap-2 pt-1 text-[#5C0D1E]">
                          <div className="flex items-center gap-2">
                            <Shirt className="w-4 h-4 text-[#B8860B] shrink-0" />
                            <span className="font-semibold">Poshak / Attire:</span>
                            <span className="italic font-serif text-[#7E152D]">{fn.dressCode}</span>
                          </div>

                          {/* Lookbook Button */}
                          <button
                            type="button"
                            onClick={() => setActiveLookbook({ title: fn.title, image: lookbookImg, dressCode: fn.dressCode || '' })}
                            className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#7E152D] hover:text-[#5C0D1E] flex items-center gap-1 shrink-0 bg-[#FAF3E0] border border-[#D4AF37]/40 px-2.5 py-1 rounded-md hover:bg-[#F3E6C4] transition-colors"
                          >
                            <Eye className="w-3 h-3 text-[#B8860B]" />
                            <span>Attire Guide</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {fn.description && (
                      <p className="mt-4 pt-3 border-t border-[#D4AF37]/25 text-xs font-serif leading-relaxed text-[#5C0D1E]/80">
                        {fn.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spacer for desktop symmetry */}
                <div className="hidden sm:block w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>

        {/* Special Baraat Procession Notice Banner from Wedding Card */}
        <div className="mt-14 max-w-2xl mx-auto bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E0] to-[#FFFDF9] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-7 shadow-md text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#7E152D]">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold">
              ॥ बारात प्रस्थान • Baraat Procession Departure ॥
            </span>
          </div>
          <p className="font-serif text-base sm:text-lg text-[#5C0D1E] font-bold leading-relaxed">
            The Baraat will depart on Wednesday, November 25, 2026 at 8:30 PM from Hazira Mallgaddha Police Station towards Shri Radhey Paradise Marriage Garden.
          </p>
          <p className="mt-2 text-xs font-serif italic text-[#8B6508]">
            All family, friends & well-wishers are warmly invited to join the joyful royal wedding procession.
          </p>
        </div>
      </div>

      {/* Lookbook Modal Popup */}
      {activeLookbook && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLookbook(null)}
        >
          <div
            className="bg-[#FFFDF9] rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-[#D4AF37]/50 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#FAF5EB]">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#7E152D]">
                  ॥ परिधान मार्गदर्शिका • Guest Attire Guide ॥
                </span>
                <h4 className="font-serif font-bold text-[#5C0D1E] text-base">
                  {activeLookbook.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveLookbook(null)}
                className="w-8 h-8 rounded-full bg-[#FAF3E0] hover:bg-[#F3E6C4] text-[#7E152D] flex items-center justify-center transition-colors border border-[#D4AF37]/35"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex flex-col items-center">
              <div className="w-full h-80 rounded-2xl overflow-hidden bg-gray-100 border border-[#D4AF37]/30 shadow-inner">
                <img
                  src={activeLookbook.image}
                  alt={activeLookbook.dressCode}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs uppercase font-sans font-bold text-[#8C6718] tracking-wider">
                  Suggested Festive Palette & Traditional Style
                </span>
                <p className="text-sm font-serif italic text-[#5C0D1E] font-semibold mt-1">
                  "{activeLookbook.dressCode}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
