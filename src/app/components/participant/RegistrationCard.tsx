import { FileText } from 'lucide-react';

interface RegistrationCardProps {
  onViewDetails: () => void;
}

export function RegistrationCard({ onViewDetails }: RegistrationCardProps) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-xl bg-[#1E73A8]/10 dark:bg-[#2CA6C4]/10 flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-[#1E73A8] dark:text-[#2CA6C4]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground">My Registration</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            View all information submitted during your conference registration.
          </p>
          <button
            onClick={onViewDetails}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <FileText className="w-4 h-4" />
            View Registration Details
          </button>
        </div>
      </div>
    </div>
  );
}
