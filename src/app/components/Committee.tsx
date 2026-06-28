import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function Committee() {
  const { language, t } = useLanguage();

  const committeePages = [
    {
      title: {
        en: 'Organizing Committees',
        ar: 'اللجان التنظيمية'
      },
      description: {
        en: 'Meet the leadership team responsible for conference planning, coordination, partnerships, and successful event management.',
        ar: 'تعرّف على فريق القيادة المسؤول عن تخطيط المؤتمر والتنسيق والشراكات والتنفيذ الناجح للفعاليات.'
      },
      href: '/committees/organizing',
      accent: 'from-[#1E73A8] to-[#2CA6C4]'
    },
    {
      title: {
        en: 'Scientific Committees',
        ar: 'اللجان العلمية'
      },
      description: {
        en: 'Explore the panel of distinguished scholars and experts supporting the conference scientific program and review process.',
        ar: 'استكشف نخبة العلماء والخبراء الذين يدعمون البرنامج العلمي للمؤتمر وعملية التحكيم العلمي.'
      },
      href: '/committees/scientific',
      accent: 'from-[#F2B21A] to-[#2CA6C4]'
    }
  ];

  const text = {
    en: {
      intro:
        'The conference features dedicated organizing and scientific committees, each with a distinct role in delivering academic excellence and operational quality.',
      openPage: 'Open Committee Page'
    },
    ar: {
      intro:
        'يضم المؤتمر لجانًا تنظيمية وعلمية متخصصة، ولكل منها دور محوري في تحقيق التميز الأكاديمي والجودة التنظيمية.',
      openPage: 'فتح صفحة اللجنة'
    }
  };

  return (
    <section id="committee" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('committee_title')}
        </h2>

        <p className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed mb-12">
          {text[language].intro}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {committeePages.map((committee) => (
            <Link
              key={committee.href}
              to={committee.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${committee.accent} opacity-0 transition-opacity group-hover:opacity-10`} />
              <div className="relative">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${committee.accent} text-white font-bold text-lg mb-5`}>
                  {committee.title.en.charAt(0)}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {committee.title[language]}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {committee.description[language]}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                  {text[language].openPage}
                  <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
