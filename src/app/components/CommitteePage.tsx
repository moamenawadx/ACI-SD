import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { CommitteeMember } from '../data/committees';

interface CommitteePageProps {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  members: CommitteeMember[];
}

function getInitials(name: string) {
  return name
    .replace(/\./g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function CommitteePage({ title, description, members }: CommitteePageProps) {
  const { language } = useLanguage();

  const text = {
    en: {
      backHome: 'Back to Home',
      totalMembers: 'Committee Members',
      email: 'Email'
    },
    ar: {
      backHome: 'العودة إلى الرئيسية',
      totalMembers: 'أعضاء اللجنة',
      email: 'البريد الإلكتروني'
    }
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-foreground transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
          >
            <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span>{text[language].backHome}</span>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-border bg-card/80 p-8 md:p-10 shadow-2xl shadow-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(44,166,196,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(242,178,26,0.14),_transparent_30%)]" />
          <div className="relative">
            <h1 className="max-w-4xl text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
              {title[language]}
            </h1>
            <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
              {description[language]}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border/80 bg-background/50 px-5 py-4">
              <span className="text-3xl font-bold text-foreground">{members.length}</span>
              <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                {text[language].totalMembers}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((member) => (
            <article
              key={`${member.name}-${member.institution}-${member.country}`}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] text-lg font-semibold text-white">
                  {getInitials(member.name)}
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-snug">{member.name}</h2>
                {member.institution ? (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{member.institution}</p>
                ) : null}
                <div className="mt-4 inline-flex rounded-full border border-border/80 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/80">
                  {member.country}
                </div>
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-secondary"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{text[language].email}: {member.email}</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
