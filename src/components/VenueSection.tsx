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
    <section id="venue" className="py-20 px-4 bg-[#FDFCFA] border-t border-[#E1EDF5] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-1">
            <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#73B2D9] font-semibold">
              The Destination • Wedding & Reception Venue
            </span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-serif text-[#1F3C55] font-bold">
            {venue.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-serif italic text-[#586A56]">
            {venue.address}, {venue.city}
          </p>
        </div>

        {/* Venue Card Showcase */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#C4DCED]/70 shadow-xl">
          {/* Large Watercolor Venue Image */}
          <div className="relative w-full h-72 sm:h-96 overflow-hidden">
            <img
              src={venue.image || '/assets/venue_villa.jpg'}
              alt={venue.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white">
                <span className="text-xs uppercase tracking-widest text-[#9ECAE4] font-medium">
                  {venue.tagline || 'Wedding & Reception Venue'}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mt-1">
                  {venue.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 font-serif">
                  {venue.address}, {venue.city}
                </p>
              </div>
            </div>
          </div>

          {/* Details & Map Action */}
          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-[#73B2D9]">
                  Full Address
                </h4>
                <p className="mt-1 text-base font-serif text-[#1F3C55] font-medium leading-relaxed">
                  {venue.name}, {venue.address}, {venue.city}
                </p>
              </div>

              {venue.details && (
                <div className="bg-[#FFF9E6] border border-[#D4AF37]/40 rounded-2xl p-4">
                  <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-[#9A751F] flex items-center gap-1.5">
                    <span>Baraat Procession Departure Note</span>
                  </h4>
                  <p className="mt-1 text-sm font-serif text-[#1F3C55] font-semibold leading-relaxed">
                    {venue.details}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-[#F0F6FA] p-3.5 rounded-2xl">
                  <Car className="w-5 h-5 text-[#5297C7] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-gray-800">Valet & Guest Parking</span>
                    <p className="text-[11px] text-gray-500">Ample parking space available at the garden</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#F0F6FA] p-3.5 rounded-2xl">
                  <Compass className="w-5 h-5 text-[#889C86] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-gray-800">Warm Hospitality</span>
                    <p className="text-[11px] text-gray-500">Traditional welcome and assistance upon arrival</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div className="flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-[#F0F6FA] to-white rounded-2xl border border-[#C4DCED]">
              <MapPin className="w-8 h-8 text-[#5297C7] mb-2" />
              <h5 className="font-serif font-bold text-gray-800 text-lg">Navigate to Venue</h5>
              <p className="text-xs text-gray-500 mt-1 mb-5 font-serif italic">
                Get real-time turn-by-turn directions via Google Maps
              </p>

              <a
                href={venue.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(venue.name + ' ' + venue.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-[#5297C7] to-[#3D7BAA] text-white font-sans text-xs uppercase tracking-wider font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 ml-1 opacity-75" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
