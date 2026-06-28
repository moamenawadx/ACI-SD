import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Hotel, Plane, Languages } from 'lucide-react';

export function Venue() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('venue_title')}
        </h2>

        <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
          <div className="aspect-[21/9] bg-gradient-to-br from-[#1E73A8] via-[#2CA6C4] to-[#35B0B7] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-3xl font-bold mb-2">{t('venue_location')}</h3>
                <p className="text-xl opacity-90">{t('venue_region')}</p>
              </div>
            </div>
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
