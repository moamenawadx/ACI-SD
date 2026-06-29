import { useLanguage } from '../contexts/LanguageContext';
import type { ReactNode } from 'react';
import { Users } from 'lucide-react';
import { CommitteeMemberCard } from './CommitteeMemberCard';
import {
  executiveCommitteeMembers,
  organizingCommitteeMembers
} from '../data/committees';

export function Committee() {
  const { language, t } = useLanguage();

  const text = {
    en: {
      intro:
        'The conference features dedicated organizing and scientific committees, each with a distinct role in delivering academic excellence and operational quality.',
      executiveTitle: 'The Executive Committees',
      organizingTitle: 'The Organizing Committee'
    },
    ar: {
      intro:
        'يضم المؤتمر لجانًا تنظيمية وعلمية متخصصة، ولكل منها دور محوري في تحقيق التميز الأكاديمي والجودة التنظيمية.',
      executiveTitle: 'اللجان التنفيذية',
      organizingTitle: 'اللجنة التنظيمية'
    }
  };

  const SectionHeading = ({
    title,
    icon
  }: {
    title: string;
    icon: ReactNode;
  }) => (
    <div className="mb-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
      <div className="flex items-center gap-3 text-center">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2CA6C4]/25 bg-[#2CA6C4]/10 text-[#1E73A8] shadow-lg shadow-[#2CA6C4]/10">
          {icon}
        </span>
        <h3 className="text-2xl font-bold text-foreground md:text-4xl">{title}</h3>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
    </div>
  );

  return (
    <section id="committee" className="bg-muted/20 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('committee_title')}
        </h2>

        <p className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed mb-16">
          {text[language].intro}
        </p>

        <div className="space-y-24">
          <section id="executive-committee" className="scroll-mt-24">
            <SectionHeading title={text[language].executiveTitle} icon={<Users className="h-5 w-5" />} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-6">
              {executiveCommitteeMembers.map((member) => (
                <CommitteeMemberCard
                  key={`${member.role}-${member.name}`}
                  image={member.image}
                  name={member.name}
                  role={member.role}
                  institution={member.institution}
                  country={member.country}
                />
              ))}
            </div>
          </section>

          <section id="organizing-committee" className="scroll-mt-24">
            <SectionHeading title={text[language].organizingTitle} icon={<Users className="h-5 w-5" />} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-6">
              {organizingCommitteeMembers.map((member) => (
                <CommitteeMemberCard
                  key={`${member.name}-${member.institution}-${member.country}`}
                  image={member.image}
                  name={member.name}
                  role={member.role}
                  institution={member.institution}
                  country={member.country}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
