import { useLanguage } from '../contexts/LanguageContext';
import { Users, Globe, Home, Car, GraduationCap, CreditCard } from 'lucide-react';
import { useState } from 'react';

export function Registration() {
  const { t } = useLanguage();
  const [showBankDetails, setShowBankDetails] = useState(false);

  const packages = [
    {
      icon: Users,
      title: t('reg_egyptian'),
      price: 'L.E',
      features: [t('reg_accommodation'), t('reg_discount')],
      color: 'from-[#1E73A8] to-[#2CA6C4]'
    },
    {
      icon: Globe,
      title: t('reg_international'),
      price: 'USD',
      features: [t('reg_accommodation'), t('reg_discount')],
      color: 'from-[#F2B21A] to-[#2CA6C4]'
    }
  ];

  return (
    <section id="registration" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          {t('registration_title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-2xl bg-card border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${pkg.color} mb-6`}>
                  <pkg.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-6">{pkg.title}</h3>
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${pkg.color}`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#146C43]" />
                  <span className="text-sm font-medium text-[#146C43]">{t('reg_discount')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowBankDetails(!showBankDetails)}
            className="w-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4]">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-foreground">{t('bank_details')}</span>
            </div>
            <svg
              className={`w-5 h-5 text-muted-foreground transition-transform ${showBankDetails ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showBankDetails && (
            <div className="mt-4 p-6 rounded-2xl bg-card border border-border space-y-2">
              <p className="text-foreground">{t('bank_account')}</p>
              <p className="text-foreground">{t('bank_name')}</p>
              <p className="text-foreground font-mono text-sm">IBAN: EG310007001150200111100436900</p>
              <p className="text-foreground font-mono text-sm">SWIFT: ARLBEGCAXXX</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <button className="px-10 py-4 rounded-xl bg-[#F2B21A] text-[#0A0F1E] font-medium hover:shadow-2xl hover:shadow-[#F2B21A]/30 transition-all duration-300 transform hover:scale-105">
            {t('registerNow')}
          </button>
        </div>
      </div>
    </section>
  );
}
