import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin } from 'lucide-react';
import heroBackground from '../../imports/hurghada-egypt.png';
import sscLogo from '../../imports/SSC logo.png';
import batuLogo from '../../imports/BATU.png';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E]/85 via-[#0F1E35]/80 to-[#1E3A5F]/85 dark:opacity-100 opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7FAFC]/90 via-[#E2E8F0]/85 to-[#CBD5E1]/90 dark:opacity-0 opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2CA6C4] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F2B21A] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 mb-8">
            <img
              src={sscLogo}
              alt="SSC logo"
              className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl"
            />
            <img
              src="/ACI-SD.png"
              alt="ACI-SD 2027"
              className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl"
            />
            <img
              src={batuLogo}
              alt="BATU logo"
              className="h-32 md:h-40 w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <p className="text-xl md:text-2xl text-foreground font-semibold mb-4 leading-relaxed max-w-4xl mx-auto drop-shadow-lg">
            {t('hero_subtitle')}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            {t('hero_subtitle2')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-lg">{t('hero_date')}</span>
          </div>
          <div className="flex items-center gap-10 text-foreground">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-lg">{t('hero_location')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white font-medium hover:shadow-2xl hover:shadow-[#2CA6C4]/40 transition-all duration-300 transform hover:scale-105">
            {t('submitAbstract')}
          </button>
          <button className="px-8 py-4 rounded-xl bg-[#F2B21A] text-[#0A0F1E] font-medium hover:shadow-2xl hover:shadow-[#F2B21A]/40 transition-all duration-300 transform hover:scale-105">
            {t('registerNow')}
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 opacity-60">
          <div className="text-sm text-muted-foreground">{t('organized_by')}</div>
          <div className="h-8 w-px bg-border" />
          <div className="text-sm font-medium text-foreground">Scientific Society of Chemistry</div>
          <div className="h-8 w-px bg-border" />
          <div className="text-sm font-medium text-foreground">MGPR</div>
        </div>
      </div>
    </section>
  );
}
