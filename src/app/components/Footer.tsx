import { useLanguage } from '../contexts/LanguageContext';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('home'), href: '/#home', isRoute: false },
    { label: t('about'), href: '/#about', isRoute: false },
    { label: t('topics'), href: '/#topics', isRoute: false },
    { label: t('abstract'), href: '/#abstract', isRoute: false },
    { label: t('committee'), href: '/committees', isRoute: true },
    { label: t('dates_title'), href: '/#dates', isRoute: false },
    { label: t('registration'), href: '/#registration', isRoute: false },
    { label: t('venue'), href: '/#venue', isRoute: false },
    { label: t('contact'), href: '/#contact', isRoute: false }
  ];

  return (
    <footer id="contact" className="bg-[#0A0F1E] text-white">
      <div className="border-t-2 border-[#F2B21A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src="/ACI-SD.png" alt="ACI-SD 2027" className="h-16 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer_desc')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F2B21A]">{t('footer_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#2CA6C4] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#2CA6C4] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#F2B21A]">{t('footer_contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2CA6C4] flex-shrink-0 mt-0.5" />
                <a href="mailto:sci.s.o.chemistry@gmail.com" className="text-gray-400 text-sm hover:text-[#2CA6C4] transition-colors">sci.s.o.chemistry@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2CA6C4] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Sharm El-Sheikh, Egypt</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2CA6C4] flex-shrink-0 mt-0.5" />
                <a href="tel:+201091898891" className="text-gray-400 text-sm hover:text-[#2CA6C4] transition-colors" dir="ltr">+20 109 189 8891</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
