import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Globe, Moon, Sun, Menu, X, User, LayoutDashboard, FileText, Upload, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { cn } from './ui/utils';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { sessionService } from '../../services/sessionService';

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

function ParticipantDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const session = sessionService.getSession();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setOpen(false);
    sessionService.logout();
    navigate('/');
  };

  if (!session) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => navigate('/participant/login')}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Participant Portal
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'p-2 rounded-full transition-colors',
              open ? 'bg-muted/80' : 'bg-muted hover:bg-muted/80'
            )}
          >
            <User className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Participant Portal
        </TooltipContent>
      </Tooltip>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-card border border-border shadow-2xl shadow-black/10 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{session.fullName}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">{session.registrationNumber}</p>
              </div>
            </div>
          </div>

          <div className="p-2 space-y-1">
            <button
              onClick={() => handleNavigation('/participant')}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
            >
              <LayoutDashboard className="w-4 h-4 text-[#1E73A8] shrink-0" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation('/participant#registration-details')}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
            >
              <FileText className="w-4 h-4 text-[#1E73A8] shrink-0" />
              Registration Details
            </button>
            <button
              onClick={() => handleNavigation('/participant#upload-abstract')}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
            >
              <Upload className="w-4 h-4 text-[#1E73A8] shrink-0" />
              Upload Abstract
            </button>
            <div className="border-t border-border pt-1 mt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = sessionService.getSession();

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

  const handleMobileNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  const handleMobileLogout = () => {
    setMobileOpen(false);
    sessionService.logout();
    navigate('/');
  };

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

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden lg:block">
              <ParticipantDropdown />
            </div>

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
          mobileOpen ? 'max-h-[700px]' : 'max-h-0'
        )}
      >
        <div className="border-t border-border bg-card px-4 py-4 space-y-1">
          {session ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-muted/50">
                <div className="size-10 rounded-full bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{session.fullName}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">{session.registrationNumber}</p>
                </div>
              </div>
              <button
                onClick={() => handleMobileNav('/participant')}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                <LayoutDashboard className="w-4 h-4 text-[#1E73A8]" />
                Dashboard
              </button>
              <button
                onClick={() => handleMobileNav('/participant#registration-details')}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                <FileText className="w-4 h-4 text-[#1E73A8]" />
                Registration Details
              </button>
              <button
                onClick={() => handleMobileNav('/participant#upload-abstract')}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors text-left"
              >
                <Upload className="w-4 h-4 text-[#1E73A8]" />
                Upload Abstract
              </button>
              <div className="pt-1">
                <button
                  onClick={handleMobileLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
              <div className="border-t border-border pt-3 mt-2 space-y-1">
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
              </div>
            </>
          ) : (
            <>
              <Link
                to="/participant/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <User className="w-4 h-4" />
                Participant Portal
              </Link>
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
            </>
          )}
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
