import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useParticipant } from '../../contexts/ParticipantContext';

export function DashboardHeader() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { participant } = useParticipant();

  const handleLogout = async () => {
    await signOut();
    navigate('/participant/login');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
          Participant Portal
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, {participant?.full_name}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}
