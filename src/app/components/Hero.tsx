import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin } from 'lucide-react';
import heroBackground from '../../imports/sharm-el-sheikh.png';
import sscLogo from '../../imports/SSC logo.png';
import batuLogo from '../../imports/BATU.png';
import mgprLogo from '../../imports/MGPR.png';

export function Hero() {
  const { t, language } = useLanguage();

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
        <div className="mb-6">
          <img
            src="/ACI-SD.png"
            alt="ACI-SD 2027"
            className="h-25 md:h-30 w-auto object-contain drop-shadow-2xl mx-auto mb-6"
          />
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 mb-6">
            <img
              src={sscLogo}
              alt="SSC logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-2xl"
            />
            <img
              src={batuLogo}
              alt="BATU logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-2xl"
            />
            <img
              src={mgprLogo}
              alt="Mediterranean Group of Pesticide Research logo"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <p className="text-xl md:text-2xl text-foreground font-semibold mb-4 leading-relaxed max-w-4xl mx-auto drop-shadow-lg">
            {language === 'en' ? (
              <>1<sup>st</sup> International Conference on Advancing Chemistry and Innovation Towards Sustainable Development</>
            ) : (
              t('hero_subtitle')
            )}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            {language === 'en' ? (
              <>11<sup>th</sup> Mediterranean Group of Pesticide Research Symposium</>
            ) : (
              t('hero_subtitle2')
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-lg">{t('hero_date')}</span>
          </div>
          <div className="flex items-center gap-10 text-foreground">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-lg">{t('hero_location')}</span>
          </div>
        </div>

        <a
          href={t('hero_discount_url')}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-9xl mx-auto mb-5 group"
        >
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl px-6 py-4 shadow-lg group-hover:bg-white/20 dark:group-hover:bg-white/10 group-hover:border-primary/50 group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
            <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
              {t('hero_discount_text')}
            </p>
          </div>
        </a>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 opacity-80">
          <div className="text-sm text-muted-foreground">{t('organized_by')}</div>
          <div className="h-6 w-px bg-border" />
          <div className="text-sm font-medium text-foreground">Scientific Society of Chemistry</div>
          <div className="h-6 w-px bg-border" />
          <div className="text-sm font-medium text-foreground">Borg Al Arab Technological University</div>
          <div className="h-6 w-px bg-border" />
          <div className="text-sm font-medium text-foreground">Mediterranean Group of Pesticide Research</div>
        </div>
      </div>
    </section>
  );
}
