import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, Loader2, AlertTriangle, Eye, EyeOff, BadgeCheck } from 'lucide-react';
import { loginParticipant, ParticipantError } from '../../services/participantService';
import { sessionService } from '../../services/sessionService';

export function ParticipantLoginPage() {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [passportId, setPassportId] = useState('');
  const [showPassport, setShowPassport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationNumber.trim() || !passportId.trim()) {
      setError('Please enter both your Registration Number and National ID / Passport Number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const session = await loginParticipant(
        registrationNumber.trim(),
        passportId.trim()
      );
      sessionService.login(session);
      navigate('/participant', { replace: true });
    } catch (err) {
      if (err instanceof ParticipantError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/20 flex items-center justify-center">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="size-16 rounded-full bg-gradient-to-br from-[#1E73A8] to-[#2CA6C4] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] bg-clip-text text-transparent">
            Participant Portal
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Sign in with your Registration Number and National ID / Passport Number
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Registration Number
              </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => { setRegistrationNumber(e.target.value); setError(null); }}
                placeholder="e.g. ACI-2027-000123"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                National ID / Passport Number
              </label>
              <div className="relative">
                <input
                  type={showPassport ? 'text' : 'password'}
                  value={passportId}
                  onChange={(e) => { setPassportId(e.target.value); setError(null); }}
                  placeholder="Enter your National ID or Passport Number"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassport(!showPassport)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassport ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <BadgeCheck className="w-4 h-4" />
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
