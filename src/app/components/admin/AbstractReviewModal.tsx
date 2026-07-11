import { useState } from 'react';
import { X, FileText, ExternalLink, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { AbstractWithParticipant } from '../../../services/adminService';

interface AbstractReviewModalProps {
  abstract: AbstractWithParticipant;
  onClose: () => void;
  onStatusChange: (id: string, status: 'approved' | 'rejected') => Promise<void>;
}

const STATUS_BADGE = {
  pending: { label: 'Pending', class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  approved: { label: 'Approved', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
  rejected: { label: 'Rejected', class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
} as const;

export function AbstractReviewModal({
  abstract,
  onClose,
  onStatusChange,
}: AbstractReviewModalProps) {
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const badge = STATUS_BADGE[abstract.status];

  const handleAction = async (status: 'approved' | 'rejected') => {
    setProcessing(true);
    setActionError(null);
    try {
      await onStatusChange(abstract.id, status);
      onClose();
    } catch {
      setActionError('Failed to update status. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-border bg-card">
          <h3 className="text-lg font-bold text-foreground">Abstract Review</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Participant</span>
              <p className="font-medium text-foreground">{abstract.registrations.full_name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Registration #</span>
              <p className="font-medium text-foreground font-mono">
                {abstract.registrations.registration_number}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Email</span>
              <p className="font-medium text-foreground">{abstract.registrations.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Affiliation</span>
              <p className="font-medium text-foreground">
                {abstract.registrations.university_organization}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Submitted</span>
              <p className="font-medium text-foreground">
                {new Date(abstract.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Status</span>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.class}`}>
                {badge.label}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Abstract Summary</h4>
            <div className="rounded-xl border border-border bg-muted/30 p-4 max-h-48 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {abstract.abstract_summary}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Uploaded PDF</h4>
            <a
              href={abstract.abstract_file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted transition-colors text-sm font-medium text-foreground"
            >
              <FileText className="w-4 h-4 text-[#1E73A8] dark:text-[#2CA6C4]" />
              Open PDF Abstract
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>

          {abstract.status === 'pending' && (
            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-foreground">Review Decision</p>
              {actionError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                  {actionError}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction('approved')}
                  disabled={processing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Approve
                </button>
                <button
                  onClick={() => handleAction('rejected')}
                  disabled={processing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  Reject
                </button>
              </div>
            </div>
          )}

          {abstract.status !== 'pending' && abstract.reviewed_by && (
            <div className="p-3 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground">
              Reviewed by <span className="font-medium text-foreground">{abstract.reviewed_by}</span>
              {abstract.reviewed_at && (
                <> on {new Date(abstract.reviewed_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
                })}</>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
