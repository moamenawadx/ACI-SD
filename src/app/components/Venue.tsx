import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Hotel, Plane, Languages } from 'lucide-react';

import venue1 from '../../imports/venue/28246618.jpg';
import venue2 from '../../imports/venue/141654579.jpg';
import venue3 from '../../imports/venue/141654523.jpg';
import venue4 from '../../imports/venue/141654436.jpg';
import venue5 from '../../imports/venue/197379422.jpg';
import venue6 from '../../imports/venue/47471157.jpg';
import venue7 from '../../imports/venue/4360620.jpg';
import venue8 from '../../imports/venue/246288115.jpg';

const images = [venue1, venue2, venue3, venue4, venue5, venue6, venue7, venue8];

export function Venue() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % images.length) + images.length) % images.length);
  }, []);

  const goNext = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) goNext();
      else goPrev();
    }
  };

  return (
    <section id="venue" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('venue_title')}
        </h2>

        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="aspect-[21/9] relative">
            {images.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                <img
                  src={src}
                  alt={`Venue image ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold">Rehana Sharm Resort</h3>
                <p className="text-lg md:text-xl opacity-90">Sharm El-Sheikh, Egypt</p>
              </div>
            </div>
          </div>

          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-white w-6 h-2.5'
                    : 'bg-white/50 hover:bg-white/80 w-2.5 h-2.5'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="max-w-4xl mx-auto text-center text-muted-foreground leading-relaxed mb-10">
          {t('venue_intro')}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] mb-4">
              <Hotel className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('venue_accommodation_title')}</h3>
            <p className="text-sm text-muted-foreground">{t('venue_accommodation_desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-[#2CA6C4] to-[#35B0B7] mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('venue_tour')}</h3>
            <p className="text-sm text-muted-foreground">{t('venue_tour_desc')}</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-[#35B0B7] to-[#146C43] mb-4">
              <Languages className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('venue_language')}</h3>
            <p className="text-sm text-muted-foreground">{t('venue_language_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
