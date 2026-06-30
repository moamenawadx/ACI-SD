import { useLanguage } from '../contexts/LanguageContext';
import type { ReactNode } from 'react';
import { Users, Crown } from 'lucide-react';
import { CommitteeMemberCard } from './CommitteeMemberCard';
import {
  leadershipMembers,
  executiveCommitteeMembers,
} from '../data/committees';

export function Committee() {
  const { language, t } = useLanguage();

  const text = {
    en: {
      intro:
        'The conference is led by distinguished experts driving scientific excellence and strategic direction.',
      leadershipTitle: 'Conference Committees',
      executiveTitle: 'Executive Committee',
    },
    ar: {
      intro:
        'يقود المؤتمر نخبة من الخبراء البارزين في مجال التوجيه الاستراتيجي والتميز العلمي.',
      leadershipTitle: 'لجان المؤتمر',
      executiveTitle: 'اللجنة التنفيذية',
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
          <section id="leadership-committee" className="scroll-mt-24">
            <SectionHeading title={text[language].leadershipTitle} icon={<Crown className="h-5 w-5" />} />
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {leadershipMembers.map((member) => (
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
            </div>
          </section>

          <section id="executive-committee" className="scroll-mt-24">
            <SectionHeading title={text[language].executiveTitle} icon={<Users className="h-5 w-5" />} />
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
