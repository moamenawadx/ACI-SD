import { useState, useEffect, useCallback } from 'react';
import {
  FileText, ExternalLink, Loader2, AlertTriangle,
  CheckCircle, XCircle, Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { getAdminInfo } from '../../services/adminService';
import { listSubmissions, updateSubmissionStatus, getSubmissionFileUrl } from '../../services/submissionService';
import type { SubmissionWithParticipant } from '../../services/submissionService';
import type { SubmissionType } from '../config/submissionConfig';
import { SUBMISSION_CONFIGS } from '../config/submissionConfig';
import { SubmissionReviewModal } from '../components/admin/SubmissionReviewModal';

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

const SUBMISSION_TYPES: SubmissionType[] = ['abstract', 'poster', 'oral'];

export function AdminSubmissionPage() {
  const [activeType, setActiveType] = useState<SubmissionType>('abstract');
  const [submissions, setSubmissions] = useState<SubmissionWithParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionWithParticipant | null>(null);
  const [reviewerName, setReviewerName] = useState('Admin');
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});

  const config = SUBMISSION_CONFIGS[activeType];

  useEffect(() => {
    getAdminInfo().then((info) => {
      if (info?.fullName) setReviewerName(info.fullName);
    });
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listSubmissions(activeType, statusFilter);
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  }, [activeType, statusFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  useEffect(() => {
    const generateUrls = async () => {
      const urls: Record<string, string> = {};
      for (const s of submissions) {
        const url = await getSubmissionFileUrl(activeType, s);
        if (url) urls[s.id] = url;
      }
      setFileUrls(urls);
    };
    if (submissions.length > 0) generateUrls();
  }, [submissions, activeType]);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected', reviewNotes?: string) => {
    const reviewer = reviewerName;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status, reviewed_by: reviewer, reviewed_at: new Date().toISOString(), review_notes: reviewNotes ?? null }
          : s,
      ),
    );
    setSelectedSubmission(null);
    try {
      await updateSubmissionStatus(activeType, id, status, reviewer, reviewNotes);
      toast.success(`${config.title} ${status === 'approved' ? 'approved' : 'rejected'} successfully.`);
    } catch {
      toast.error('Failed to update status. Please try again.');
      fetchSubmissions();
    }
  };

  const summaryColumn = config.summaryColumn;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Submission Management</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Review and manage participant submissions.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-muted border border-border w-fit">
        {SUBMISSION_TYPES.map((st) => (
          <button
            key={st}
            onClick={() => { setActiveType(st); setStatusFilter('pending'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeType === st
                ? 'bg-card text-foreground shadow-sm border border-border'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {st === 'abstract' ? 'Abstracts' : st === 'poster' ? 'Posters' : 'Oral Presentations'}
          </button>
        ))}
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
      ) : submissions.length === 0 ? (
        <div className="text-center py-24">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium text-foreground">No submissions found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {statusFilter === 'pending'
              ? `No pending ${activeType} submissions to review.`
              : `No ${statusFilter} ${activeType} submissions.`}
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
                  {summaryColumn && <th className="text-left px-4 py-3 font-medium text-muted-foreground">Summary</th>}
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">File</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {submissions.map((s, idx) => {
                  const statusIcon = STATUS_CONFIG[s.status];
                  const Icon = statusIcon.icon;
                  return (
                    <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">
                        {s.registrations.registration_number}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                        {s.registrations.full_name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {s.registrations.email}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">
                        {s.registrations.university_organization}
                      </td>
                      {summaryColumn && (
                        <td className="px-4 py-3 max-w-[200px]">
                          <p className="text-muted-foreground truncate">
                            {(s[summaryColumn] as string) || ''}
                          </p>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <a
                          href={fileUrls[s.id] || '#'}
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
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(s.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedSubmission(s)}
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

      {selectedSubmission && (
        <SubmissionReviewModal
          submission={selectedSubmission}
          config={config}
          onClose={() => setSelectedSubmission(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
