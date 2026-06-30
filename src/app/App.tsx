import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { VenuePage } from './pages/VenuePage';
import { CommitteePage } from './components/CommitteePage';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background transition-colors duration-500">
          <Navbar />
          <ScrollHandler />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/venue" element={<VenuePage />} />
            <Route path="/committees" element={<CommitteePage />} />
            <Route path="/committees/executive" element={<CommitteePage />} />
            <Route path="/committees/organizing" element={<CommitteePage />} />
            <Route path="/committees/scientific" element={<CommitteePage />} />
          </Routes>
          <Footer />
          <BackToTopButton />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
