import { Route, Routes } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { HomePage } from './pages/HomePage';
import { OrganizingCommitteePage } from './pages/OrganizingCommitteePage';
import { ScientificCommitteePage } from './pages/ScientificCommitteePage';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background transition-colors duration-500">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/committees/organizing" element={<OrganizingCommitteePage />} />
            <Route path="/committees/scientific" element={<ScientificCommitteePage />} />
          </Routes>
          <Footer />
          <BackToTopButton />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
