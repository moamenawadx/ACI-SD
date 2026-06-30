import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Globe, Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { cn } from './ui/utils';

const sectionLinks = [
  { key: 'home', section: 'home' },
  { key: 'about', section: 'about' },
  { key: 'topics', section: 'topics' },
  { key: 'abstract', section: 'abstract' },
  { key: 'dates_title', section: 'dates' },
  { key: 'registration', section: 'registration' },
  { key: 'venue', section: 'venue' },
  { key: 'contact', section: 'contact' },
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, hash]);

  const goToSection = (section: string) => {
    setMobileOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `/#${section}`);
      }
    } else {
      navigate(`/#${section}`);
    }
  };

  const isActiveSection = (section: string) => {
    if (pathname !== '/') return false;
    if (section === 'home' && !hash) return true;
    return hash === `#${section}`;
  };

  const isCommitteesActive = pathname.startsWith('/committees');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="shrink-0">
            <img src="/ACI-SD.png" alt="ACI-SD 2027" className="h-10 md:h-12 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {sectionLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => goToSection(link.section)}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isActiveSection(link.section) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(link.key)}
              </button>
            ))}
            <Link
              to="/committees"
              className={cn(
                'text-sm font-medium transition-colors',
                isCommitteesActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t('committee')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="hidden lg:inline-flex px-5 py-2 rounded-xl bg-[#F2B21A] text-[#0A0F1E] font-semibold text-sm hover:shadow-2xl hover:shadow-[#F2B21A]/30 transition-all duration-300"
            >
              {t('registerNow')}
            </Link>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-[500px]' : 'max-h-0'
        )}
      >
        <div className="border-t border-border bg-card px-4 py-4 space-y-1">
          {sectionLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => goToSection(link.section)}
              className={cn(
                'block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActiveSection(link.section) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {t(link.key)}
            </button>
          ))}
          <Link
            to="/committees"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isCommitteesActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {t('committee')}
          </Link>
          <div className="pt-2">
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-3 rounded-xl bg-[#F2B21A] text-[#0A0F1E] font-semibold text-sm"
            >
              {t('registerNow')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
