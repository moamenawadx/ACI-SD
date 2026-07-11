import { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  ExternalLink,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { listAbstracts, updateAbstractStatus } from '../../services/adminService';
import { adminSessionService } from '../../services/adminSessionService';
import { AbstractReviewModal } from '../components/admin/AbstractReviewModal';
import type { AbstractWithParticipant } from '../../services/adminService';

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

const FILTER_TABS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

const STATUS_CONFIG = {
  pending: { icon: Clock, class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  approved: { icon: CheckCircle, class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
  rejected: { icon: XCircle, class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
} as const;

export function AdminAbstractsPage() {
  const [abstracts, setAbstracts] = useState<AbstractWithParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [selectedAbstract, setSelectedAbstract] = useState<AbstractWithParticipant | null>(null);
  const session = adminSessionService.getSession();

  const fetchAbstracts = useCallback(async () => {
    console.log('[AdminAbstractsPage] fetchAbstracts called, filter:', statusFilter);
    setLoading(true);
    setError(null);
    try {
      const data = await listAbstracts(statusFilter);
      console.log('[AdminAbstractsPage] listAbstracts returned:', data);
      console.log('[AdminAbstractsPage] data length:', data?.length);
      setAbstracts(data);
    } catch (err) {
      console.error('[AdminAbstractsPage] listAbstracts threw:', err);
      setError(err instanceof Error ? err.message : 'Failed to load abstracts.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchAbstracts();
  }, [fetchAbstracts]);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    const reviewer = session?.fullName ?? 'Admin';
    setAbstracts((prev) =>
      prev.map((ab) =>
        ab.id === id
          ? { ...ab, status, reviewed_by: reviewer, reviewed_at: new Date().toISOString() }
          : ab
      )
    );
    setSelectedAbstract(null);
    try {
      await updateAbstractStatus(id, status, reviewer);
      toast.success(`Abstract ${status === 'approved' ? 'approved' : 'rejected'} successfully.`);
    } catch {
      toast.error('Failed to update status. Please try again.');
      fetchAbstracts();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Abstract Submissions</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review and manage participant abstract submissions.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted border border-border w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === tab.key
                ? 'bg-card text-foreground shadow-sm border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {tab.key === 'pending' && abstracts.length > 0 && statusFilter === 'pending' && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs">
                {abstracts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : abstracts.length === 0 ? (
        <div className="text-center py-24">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium text-foreground">No abstracts found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {statusFilter === 'pending'
              ? 'No pending abstracts to review.'
              : `No ${statusFilter} abstracts.`}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">#</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Reg. #</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Participant</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Affiliation</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Abstract</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">PDF</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {abstracts.map((ab, idx) => {
                  const statusIcon = STATUS_CONFIG[ab.status];
                  const Icon = statusIcon.icon;
                  return (
                    <tr key={ab.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">
                        {ab.registrations.registration_number}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        {ab.registrations.full_name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {ab.registrations.email}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">
                        {ab.registrations.university_organization}
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="text-muted-foreground truncate">
                          {ab.abstract_summary}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={ab.abstract_file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-xs font-medium text-foreground"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusIcon.class}`}>
                          <Icon className="w-3 h-3" />
                          {ab.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(ab.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedAbstract(ab)}
                          className="px-3 py-1.5 rounded-lg bg-[#1E73A8]/10 dark:bg-[#2CA6C4]/10 text-[#1E73A8] dark:text-[#2CA6C4] text-xs font-medium hover:bg-[#1E73A8]/20 dark:hover:bg-[#2CA6C4]/20 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedAbstract && (
        <AbstractReviewModal
          abstract={selectedAbstract}
          onClose={() => setSelectedAbstract(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
