import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ParticipantProvider } from './contexts/ParticipantContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { VenuePage } from './pages/VenuePage';
import { CommitteePage } from './components/CommitteePage';
import { ParticipantLoginPage } from './pages/ParticipantLoginPage';
import { ParticipantDashboardPage } from './pages/ParticipantDashboardPage';
import { ProtectedRoute } from './components/participant/ProtectedRoute';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminSubmissionPage } from './pages/AdminSubmissionPage';
import { AdminRoute } from './components/admin/AdminRoute';
import { AdminLayout } from './components/admin/AdminLayout';

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
        <AuthProvider>
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
            <Route path="/participant/login" element={<ParticipantLoginPage />} />
            <Route
              path="/participant"
              element={
                <ProtectedRoute>
                  <ParticipantProvider>
                    <ParticipantDashboardPage />
                  </ParticipantProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/submissions"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminSubmissionPage />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route path="/admin/abstracts" element={<Navigate to="/admin/submissions" replace />} />
          </Routes>
          <Footer />
          <BackToTopButton />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
