import React from 'react';
import { MapPin, Navigation, Car, Compass, ExternalLink } from 'lucide-react';

interface VenueData {
  name: string;
  tagline?: string;
  address: string;
  city: string;
  state?: string;
  mapUrl: string;
  details?: string;
  image?: string;
}

interface Props {
  venue: VenueData;
}

export const VenueSection: React.FC<Props> = ({ venue }) => {
  return (
    <section id="venue" className="py-20 px-4 bg-[#FFFDF9] border-t border-[#D4AF37]/35 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/45 shadow-xs">
              <span className="text-[#D4AF37] text-xs">卐</span>
              <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#7E152D] font-bold">
                ॥ विवाह स्थल ॥ • Sacred Destination & Reception Venue
              </span>
              <span className="text-[#D4AF37] text-xs">卐</span>
            </span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-serif text-[#5C0D1E] font-bold">
            {venue.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-serif italic text-[#8B6508]">
            {venue.address}, {venue.city}
          </p>
        </div>

        {/* Venue Card Showcase */}
        <div className="bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-xl">
          {/* Large Watercolor Venue Image */}
          <div className="relative w-full h-72 sm:h-96 overflow-hidden">
            <img
              src={venue.image || '/assets/venue_villa.jpg'}
              alt={venue.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white">
                <span className="text-xs uppercase tracking-widest text-[#FDE68A] font-semibold">
                  {venue.tagline || 'Wedding & Reception Venue'}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mt-1">
                  {venue.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/90 mt-1 font-serif">
                  {venue.address}, {venue.city}
                </p>
              </div>
            </div>
          </div>

          {/* Details & Map Action */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-[#7E152D]">
                  Venue Address
                </h4>
                <p className="mt-1 text-base font-serif text-[#5C0D1E] font-semibold leading-relaxed">
                  {venue.name}, {venue.address}, {venue.city}
                </p>
              </div>

              {venue.details && (
                <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E0] to-[#FFFDF9] border-2 border-[#D4AF37]/55 rounded-2xl p-4 shadow-xs">
                  <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-[#7E152D] flex items-center gap-1.5">
                    <span>॥ बारात प्रस्थान सूचना • Baraat Procession Departure Note ॥</span>
                  </h4>
                  <p className="mt-1.5 text-sm font-serif text-[#5C0D1E] font-bold leading-relaxed">
                    {venue.details}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-[#FAF5EB] border border-[#D4AF37]/30 p-3.5 rounded-2xl">
                  <Car className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#5C0D1E]">Valet & Guest Parking</span>
                    <p className="text-[11px] text-gray-600">Ample parking space available at the garden</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FAF5EB] border border-[#D4AF37]/30 p-3.5 rounded-2xl">
                  <Compass className="w-5 h-5 text-[#2D5A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#5C0D1E]">Warm Traditional Hospitality</span>
                    <p className="text-[11px] text-gray-600">Traditional welcome, tilak & guest assistance upon arrival</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div className="flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-[#FAF5EB] to-[#FFFDF9] rounded-2xl border border-[#D4AF37]/45 shadow-sm">
              <MapPin className="w-8 h-8 text-[#9E243F] mb-2" />
              <h5 className="font-serif font-bold text-[#5C0D1E] text-lg">Navigate to Venue</h5>
              <p className="text-xs text-[#8B6508] mt-1 mb-5 font-serif italic">
                Get real-time turn-by-turn directions to the marriage garden
              </p>

              <a
                href={venue.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-[#7E152D] via-[#9E243F] to-[#7E152D] text-[#FFFDF9] font-sans text-xs uppercase tracking-wider font-semibold border border-[#D4AF37]/50 shadow-md hover:shadow-[#7E152D]/40 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 ml-1 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
