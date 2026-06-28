import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, Globe, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img src="/ACI-SD.png" alt="ACI-SD 2027" className="h-12 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#home" className="text-foreground hover:text-primary transition-colors">{t('home')}</a>
            <a href="/#about" className="text-foreground hover:text-primary transition-colors">{t('about')}</a>
            <a href="/#topics" className="text-foreground hover:text-primary transition-colors">{t('topics')}</a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors outline-none">
                  <span>{t('committee')}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={language === 'ar' ? 'end' : 'start'}
                className="min-w-52 border-border bg-card/95 backdrop-blur-xl"
              >
                <DropdownMenuItem asChild>
                  <Link to="/committees/organizing" className="cursor-pointer">
                    {t('organizingCommitteeNav')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/committees/scientific" className="cursor-pointer">
                    {t('scientificCommitteeNav')}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="/#abstract" className="text-foreground hover:text-primary transition-colors">{t('abstract')}</a>
            <a href="/#dates" className="text-foreground hover:text-primary transition-colors">{t('dates_title')}</a>
            <a href="/#registration" className="text-foreground hover:text-primary transition-colors">{t('registration')}</a>
            <a href="/#contact" className="text-foreground hover:text-primary transition-colors">{t('contact')}</a>
          </div>

          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
