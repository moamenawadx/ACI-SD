import { useLanguage } from '../contexts/LanguageContext';
import { Mail, FileText, Type, Calendar, MessageSquare, Image as ImageIcon } from 'lucide-react';

export function CallForAbstracts() {
  const { t } = useLanguage();

  const details = [
    { icon: Mail, label: t('abstract_email') },
    { icon: FileText, label: t('abstract_words') },
    { icon: Type, label: t('abstract_format') },
    { icon: Calendar, label: t('abstract_deadline') }
  ];

  const presentations = [
    { icon: MessageSquare, label: t('abstract_oral'), color: 'from-[#2CA6C4] to-[#35B0B7]' },
    { icon: ImageIcon, label: t('abstract_poster'), color: 'from-[#1E73A8] to-[#2CA6C4]' }
  ];

  return (
    <section id="abstract" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#F2B21A] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('abstract_title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-[#F2B21A] to-[#2CA6C4]">
                <detail.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-foreground font-medium">{detail.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {presentations.map((presentation, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-2xl bg-card border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${presentation.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative flex flex-col items-center text-center">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${presentation.color} mb-4`}>
                  <presentation.icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-foreground">{presentation.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#F2B21A] to-[#2CA6C4] text-white font-medium hover:shadow-2xl hover:shadow-[#F2B21A]/30 transition-all duration-300 transform hover:scale-105">
            {t('downloadTemplate')}
          </button>
        </div>
      </div>
    </section>
  );
}
