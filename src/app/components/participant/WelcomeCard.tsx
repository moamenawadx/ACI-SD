import { User, BadgeCheck } from 'lucide-react';
import { sessionService } from '../../../services/sessionService';

export function WelcomeCard() {
  const session = sessionService.getSession();

  if (!session) return null;

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4">
        <div className="size-14 rounded-full bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] flex items-center justify-center shrink-0">
          <User className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground">
            Welcome, {session.fullName}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-mono tracking-wide">
            {session.registrationNumber}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
            <BadgeCheck className="w-3.5 h-3.5" />
            Registered Participant
          </div>
        </div>
      </div>
    </div>
  );
}
