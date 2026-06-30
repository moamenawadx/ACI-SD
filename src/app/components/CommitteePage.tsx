import { ArrowLeft, Users, Crown, Shield, Building2, Microscope } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import {
  leadershipMembers,
  executiveCommitteeMembers,
  organizingCommitteeMembers,
  scientificCommitteeMembers
} from '../data/committees';
import { CommitteeMemberCard } from './CommitteeMemberCard';

const sections = [
  {
    key: 'leadership',
    icon: Crown,
    titleEn: 'Conference Committees',
    titleAr: 'لجان المؤتمر',
    members: leadershipMembers
  },
  {
    key: 'executive',
    icon: Shield,
    titleEn: 'Executive Committee',
    titleAr: 'اللجنة التنفيذية',
    members: executiveCommitteeMembers
  },
  {
    key: 'organizing',
    icon: Building2,
    titleEn: 'Organizing Committee',
    titleAr: 'اللجنة التنظيمية',
    members: organizingCommitteeMembers
  },
  {
    key: 'scientific',
    icon: Microscope,
    titleEn: 'Scientific Committee',
    titleAr: 'اللجنة العلمية',
    members: scientificCommitteeMembers
  }
];

export function CommitteePage() {
  const { language } = useLanguage();

  const text = {
    en: {
      backHome: 'Back to Home',
      pageTitle: 'Committees',
      pageDesc:
        'Meet the distinguished committee members supporting the conference through leadership, coordination, academic guidance, and international scientific collaboration.'
    },
    ar: {
      backHome: 'العودة إلى الرئيسية',
      pageTitle: 'اللجان',
      pageDesc:
        'تعرّف على أعضاء اللجان المتميزين الذين يدعمون المؤتمر من خلال القيادة والتنسيق والإشراف الأكاديمي والتعاون العلمي الدولي.'
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-20 pt-28 animate-[committee-page-in_420ms_cubic-bezier(0.22,1,0.36,1)_both] sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span>{text[language].backHome}</span>
          </Link>
        </div>

        <section className="relative overflow-hidden rounded-[28px] border border-border bg-card/80 p-8 shadow-2xl shadow-primary/5 md:p-10 mb-14">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(30,115,168,0.12),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(44,166,196,0.2),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(242,178,26,0.16),_transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,_rgba(44,166,196,0.3)_1px,_transparent_1px),linear-gradient(180deg,_rgba(44,166,196,0.3)_1px,_transparent_1px)] [background-size:34px_34px]" />
          <div className="relative">
            <h1 className="mx-auto max-w-4xl animate-[committee-title-in_520ms_cubic-bezier(0.22,1,0.36,1)_120ms_both] text-center text-4xl font-bold leading-tight bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent md:text-5xl">
              {text[language].pageTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-center text-muted-foreground leading-relaxed">
              {text[language].pageDesc}
            </p>
          </div>
        </section>

        {sections.map((section, sectionIndex) => (
          <section key={section.key} className="mb-14 last:mb-0">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-border" />
              <div className="flex items-center gap-3">
                <section.icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                  {language === 'en' ? section.titleEn : section.titleAr}
                </h2>
              </div>
              <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-border" />
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {section.members.map((member) => (
                  <CommitteeMemberCard
                    key={`${member.name}-${sectionIndex}`}
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
        ))}
      </div>
    </main>
  );
}
