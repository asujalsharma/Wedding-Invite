import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  category?: string;
}

interface Props {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<Props> = ({ gallery }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIdx(index);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % gallery.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-[#F8F9FA] relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#73B2D9] font-semibold">
            Cherished Memories
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-cursive text-[#1F3C55]">
            Our Love Story
          </h2>
          <p className="mt-2 text-sm font-serif italic text-[#586A56]">
            Glimpses of the journey leading to our forever
          </p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-[#C4DCED]/50 shadow-md hover:shadow-xl transition-all duration-500 aspect-[4/5]"
            >
              <img
                src={item.url}
                alt={item.caption || 'Wedding celebration'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Overlay with zoom icon and caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#C4DCED]">
                    {item.category || 'Memory'}
                  </span>
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                <p className="mt-1 font-serif text-sm font-medium text-white/95">
                  {item.caption || 'Uday & Priti'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Active Image Box */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[activeIdx].url}
              alt={gallery[activeIdx].caption || ''}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            {gallery[activeIdx].caption && (
              <p className="mt-4 text-white/90 font-serif text-base text-center italic max-w-xl">
                {gallery[activeIdx].caption}
              </p>
            )}
            <span className="text-white/50 text-xs mt-1 font-sans">
              {activeIdx + 1} of {gallery.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
