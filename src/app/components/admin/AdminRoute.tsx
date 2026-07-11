import { Navigate } from 'react-router';
import { adminSessionService } from '../../../services/adminSessionService';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  if (!adminSessionService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
