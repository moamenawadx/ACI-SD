import { Navigate } from 'react-router';
import { sessionService } from '../../../services/sessionService';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!sessionService.isAuthenticated()) {
    return <Navigate to="/participant/login" replace />;
  }

  return <>{children}</>;
}
