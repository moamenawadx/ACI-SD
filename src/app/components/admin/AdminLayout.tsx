import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, FileText, LogOut } from 'lucide-react';
import { getAdminInfo, logoutAdmin } from '../../../services/adminService';
import type { AdminInfo } from '../../../services/adminService';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

  useEffect(() => {
    getAdminInfo().then(setAdminInfo);
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground">Admin Panel</h1>
                {adminInfo && (
                  <p className="text-xs text-muted-foreground">{adminInfo.fullName}</p>
                )}
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/submissions')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <FileText className="w-4 h-4" />
                Submissions
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
