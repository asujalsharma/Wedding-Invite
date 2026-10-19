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
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-emerald-600" />;
      case 'Music': return <Music className="w-5 h-5 text-indigo-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />;
      default: return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  const getLookbookImage = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('reception')) return '/assets/dress-code/blacktie-lookbook.jpg';
    if (lower.includes('sangeet')) return '/assets/dress-code/burgundy-lookbook.jpg';
    if (lower.includes('mehendi')) return '/assets/dress-code/natural-lookbook.jpg';
    return '/assets/dress-code/pastel-lookbook.jpg';
  };

  return (
    <section id="functions" className="py-20 px-4 bg-[#F8F9FA] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-1">
            <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#73B2D9] font-semibold">
              Wedding Itinerary & Auspicious Ceremonies
            </span>
          </div>
          <h2 className="mt-1 text-4xl sm:text-5xl font-serif text-[#1F3C55] font-bold">
            Wedding Festivities
          </h2>
          <p className="mt-3 text-sm sm:text-base font-serif italic text-[#586A56] max-w-md mx-auto">
            Celebrating the sacred and joyous union of Uday & Priti
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-[1px] w-12 bg-[#C4DCED]" />
            <span className="text-xs text-[#D4AF37]">✦</span>
            <span className="h-[1px] w-12 bg-[#C4DCED]" />
          </div>
        </div>

        {/* Timeline / Card List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 sm:before:left-1/2 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#C4DCED] before:to-transparent before:-translate-x-1/2">
          {functions.map((fn, index) => {
            const isEven = index % 2 === 0;
            const lookbookImg = getLookbookImage(fn.title);

            return (
              <div
                key={fn.id || index}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#73B2D9] shadow-md flex items-center justify-center z-10">
                  {getIcon(fn.icon)}
                </div>

                {/* Event Card Content */}
                <div className="w-full sm:w-[calc(50%-2rem)] pl-16 sm:pl-0">
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#C4DCED]/60 shadow-[0_10px_25px_-5px_rgba(50,80,110,0.06)] hover:shadow-[0_15px_30px_-5px_rgba(50,80,110,0.12)] transition-all duration-300 group">
                    
                    {/* Optional Thumbnail Banner */}
                    {fn.image && (
                      <div className="w-full h-36 rounded-2xl overflow-hidden mb-5">
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
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#73B2D9] bg-[#F0F6FA] px-3 py-1 rounded-full">
                        Ceremony {index + 1}
                      </span>
                      {fn.subtitle && (
                        <span className="text-xs font-serif italic text-gray-500">
                          {fn.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-[#1F3C55] group-hover:text-[#3D7BAA] transition-colors">
                      {fn.title}
                    </h3>

                    {/* Date and Time */}
                    <div className="mt-3 space-y-1.5 text-xs text-[#334E68]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#73B2D9] shrink-0" />
                        <span className="font-semibold text-gray-700">{fn.date}</span>
                        <span className="text-gray-400">•</span>
                        <span>{fn.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#889C86] shrink-0" />
                        <span className="font-medium text-gray-700">{fn.venue}</span>
                        <span className="text-gray-400">({fn.address})</span>
                      </div>

                      {fn.dressCode && (
                        <div className="flex items-center justify-between gap-2 pt-1 text-[#2A5171]">
                          <div className="flex items-center gap-2">
                            <Shirt className="w-4 h-4 text-[#D4AF37] shrink-0" />
                            <span className="font-medium">Attire:</span>
                            <span className="italic font-serif">{fn.dressCode}</span>
                          </div>

                          {/* Lookbook Button */}
                          <button
                            type="button"
                            onClick={() => setActiveLookbook({ title: fn.title, image: lookbookImg, dressCode: fn.dressCode || '' })}
                            className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#5297C7] hover:text-[#2A5171] flex items-center gap-1 shrink-0 bg-[#F0F6FA] px-2 py-0.5 rounded-md hover:bg-[#E1EDF5] transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Lookbook</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {fn.description && (
                      <p className="mt-4 pt-3 border-t border-gray-100 text-xs font-serif leading-relaxed text-gray-600">
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
        <div className="mt-14 max-w-2xl mx-auto bg-gradient-to-r from-[#FFF9E6] via-white to-[#FFF9E6] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-7 shadow-md text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#9A751F]">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold">Baraat Procession Departure</span>
          </div>
          <p className="font-serif text-base sm:text-lg text-[#1F3C55] font-semibold leading-relaxed">
            The Baraat will depart on Wednesday, November 25, 2026 at 8:30 PM from Hazira Mallgaddha Police Station towards Shri Radhey Paradise Marriage Garden.
          </p>
          <p className="mt-2 text-xs font-serif italic text-gray-500">
            All family and friends are warmly invited to join the joyful wedding procession.
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
            className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#73B2D9]">
                  Guest Attire Guide
                </span>
                <h4 className="font-serif font-bold text-gray-900 text-base">
                  {activeLookbook.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveLookbook(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex flex-col items-center">
              <div className="w-full h-80 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
                <img
                  src={activeLookbook.image}
                  alt={activeLookbook.dressCode}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs uppercase font-sans font-semibold text-gray-500 tracking-wider">
                  Recommended Color Palette & Style
                </span>
                <p className="text-sm font-serif italic text-[#1F3C55] font-medium mt-0.5">
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
