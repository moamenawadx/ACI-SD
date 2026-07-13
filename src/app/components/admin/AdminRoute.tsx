import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { checkIsAdmin } from '../../../services/adminService';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [adminStatus, setAdminStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setAdminStatus('unauthorized');
      return;
    }
    checkIsAdmin().then((isAdmin) => {
      setAdminStatus(isAdmin ? 'authorized' : 'unauthorized');
    });
  }, [user, authLoading]);

  if (authLoading || adminStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (adminStatus === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
