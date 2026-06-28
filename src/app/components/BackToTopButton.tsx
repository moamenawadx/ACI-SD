import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function BackToTopButton() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('back_to_top')}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] text-white shadow-xl shadow-[#1E73A8]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#2CA6C4]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
