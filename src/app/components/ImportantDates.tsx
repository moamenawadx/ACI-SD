import { useLanguage } from '../contexts/LanguageContext';
import { FileText, CheckCircle, Upload, Calendar } from 'lucide-react';

export function ImportantDates() {
  const { t } = useLanguage();

  const dates = [
    { icon: FileText, label: t('date_submission'), date: '30 August 2026', color: 'from-[#F2B21A] to-[#2CA6C4]' },
    { icon: CheckCircle, label: t('date_acceptance'), date: '30 September 2026', color: 'from-[#2CA6C4] to-[#35B0B7]' },
    { icon: Upload, label: t('date_final_paper'), date: '30 October 2026', color: 'from-[#1E73A8] to-[#2CA6C4]' },
    { icon: Calendar, label: t('date_registration'), date: '30 November 2026', color: 'from-[#146C43] to-[#2CA6C4]' }
  ];

  return (
    <section id="dates" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('dates_title')}
        </h2>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 rtl:right-1/2 w-1 bg-gradient-to-b from-[#F2B21A] via-[#2CA6C4] to-[#1E73A8] transform -translate-x-1/2 rtl:translate-x-1/2" />

          <div className="space-y-3">
            {dates.map((item, index) => (
              <div key={index} className="relative flex items-center">
                <div className="absolute left-1/2 rtl:right-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#F2B21A] to-[#2CA6C4] transform -translate-x-1/2 rtl:translate-x-1/2 ring-4 ring-card shadow-lg shadow-primary/20" />

                <div className={`${index % 2 === 0 ? 'pr-1/2 rtl:pl-1/2 rtl:pr-0' : 'pl-1/2 rtl:pr-1/2 rtl:pl-0'} w-1/2 ${index % 2 === 0 ? 'text-right rtl:text-left' : 'text-left rtl:text-right ml-auto rtl:mr-auto rtl:ml-0'}`}>
                  <div className="p-3 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-3`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
