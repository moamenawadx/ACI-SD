import { useLanguage } from '../contexts/LanguageContext';
import { Building2, GraduationCap, Target, Lightbulb } from 'lucide-react';

function formatWithSuperscript(text: string): string {
  return text
    .replace(/\b(\d+)(st|nd|rd|th)\b/gi, '$1<sup>$2</sup>');
}

const objectives = [
  'about_objective_1',
  'about_objective_2',
  'about_objective_3',
  'about_objective_4',
  'about_objective_5',
  'about_objective_6',
  'about_objective_7',
  'about_objective_8'
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('about_title')}
        </h2>

        <div className="space-y-14">
          {/* Invitation */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E73A8]/10 text-[#1E73A8]">
                <span className="text-sm font-bold">01</span>
              </span>
              {t('about_invite_title')}
            </h3>
            <p
              className="text-base text-muted-foreground leading-relaxed text-justify whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatWithSuperscript(t('about_invite')) }}
            />
          </div>

          {/* Host Organization */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2CA6C4]/10 text-[#2CA6C4]">
                <Building2 className="h-5 w-5" />
              </span>
              {t('about_host_title')}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* SSC Card */}
              <div className="rounded-2xl border border-border bg-card/70 p-6 transition-all duration-300 hover:border-[#1E73A8]/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-6 w-6 text-[#1E73A8]" />
                  <h4 className="text-lg font-bold text-foreground">Scientific Society of Chemistry (SSC)</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {t('about_ssc')}
                </p>
              </div>

              {/* BATU Card */}
              <div className="rounded-2xl border border-border bg-card/70 p-6 transition-all duration-300 hover:border-[#2CA6C4]/40 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-[#2CA6C4]" />
                  <h4 className="text-lg font-bold text-foreground">Borg Al Arab Technological University (BATU)</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {t('about_batu')}
                </p>
              </div>
            </div>
          </div>

          {/* Conference Theme */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F2B21A]/10 text-[#F2B21A]">
                <Lightbulb className="h-5 w-5" />
              </span>
              {t('about_theme_title')}
            </h3>
            <p
              className="text-base text-muted-foreground leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: formatWithSuperscript(t('about_theme')) }}
            />
          </div>

          {/* Objectives */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#146C43]/10 text-[#146C43]">
                <Target className="h-5 w-5" />
              </span>
              {t('about_obj_title')}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              {t('about_obj_lead')}
            </p>
            <ul className="space-y-3">
              {objectives.map((key) => (
                <li key={key} className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed">
                  <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E73A8]" />
                  <span className="text-justify">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
