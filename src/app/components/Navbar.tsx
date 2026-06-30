import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Globe, Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from './ui/utils';

const navLinks = [
  { key: 'home', href: '/#home' },
  { key: 'about', href: '/#about' },
  { key: 'topics', href: '/#topics' },
  { key: 'committee', to: '/committees' },
  { key: 'abstract', href: '/#abstract' },
  { key: 'dates_title', href: '/#dates' },
  { key: 'registration', href: '/#registration' },
  { key: 'venue', href: '/#venue' },
  { key: 'contact', href: '/#contact' },
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname, hash } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, hash]);

  const isActive = (link: typeof navLinks[number]) => {
    if ('to' in link && link.to) {
      return pathname.startsWith(link.to);
    }
    if ('href' in link && link.href) {
      const sectionId = link.href.replace('/#', '');
      return hash === `#${sectionId}` || (!hash && sectionId === 'home');
    }
    return false;
  };

  const renderNavLink = (link: typeof navLinks[number]) => {
    const active = isActive(link);
    const classes = cn(
      'text-sm font-medium transition-colors',
      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    );

    if ('to' in link && link.to) {
      return <Link key={link.key} to={link.to} className={classes}>{t(link.key)}</Link>;
    }
    return <a key={link.key} href={link.href!} className={classes}>{t(link.key)}</a>;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="shrink-0">
            <img src="/ACI-SD.png" alt="ACI-SD 2027" className="h-10 md:h-12 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(renderNavLink)}
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
          {navLinks.map((link) => {
            const active = isActive(link);
            const classes = cn(
              'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            );
            if ('to' in link && link.to) {
              return <Link key={link.key} to={link.to} className={classes}>{t(link.key)}</Link>;
            }
            return <a key={link.key} href={link.href!} className={classes}>{t(link.key)}</a>;
          })}
          <div className="pt-2">
            <Link
              to="/register"
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
