import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Beaker, Users, MapPin } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: Globe, label: t('stat_international'), color: 'text-[#2CA6C4]' },
    { icon: Beaker, label: t('stat_topics'), color: 'text-[#F2B21A]' },
    { icon: Users, label: t('stat_speakers'), color: 'text-[#146C43]' },
    { icon: MapPin, label: t('stat_location'), color: 'text-[#35B0B7]' }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('about_title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              {t('about_desc')}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {t('about_desc_2')}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {t('about_desc_3')}
            </p>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">{t('mgpr_title')}</h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                {t('mgpr_desc')}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t('mgpr_desc_2')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
