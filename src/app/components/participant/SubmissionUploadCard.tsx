import { useState, useRef, useEffect } from 'react';
import {
  FileText, Upload, CheckCircle, Loader2, AlertTriangle, X,
  Clock, XCircle, Download,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import type { SubmissionType } from '../../config/submissionConfig';
import { getConfig } from '../../config/submissionConfig';
import {
  getSubmission,
  submitSubmission,
  replaceSubmission,
  resubmitSubmission,
  getSubmissionFileUrl,
  SubmissionError,
} from '../../../services/submissionService';
import type { SubmissionRecord } from '../../../services/submissionService';

interface SubmissionUploadCardProps {
  type: SubmissionType;
}

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: 'Pending Review',
    class: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  },
  approved: {
    icon: CheckCircle,
    label: 'Approved',
    class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  },
  rejected: {
    icon: XCircle,
    label: 'Rejected',
    class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  },
} as const;

export function SubmissionUploadCard({ type }: SubmissionUploadCardProps) {
  const { user } = useAuth();
  const config = getConfig(type);
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [existingSubmission, setExistingSubmission] = useState<SubmissionRecord | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setCheckingExisting(false);
      return;
    }
    getSubmission(type, userId)
      .then((record) => {
        if (record) {
          setExistingSubmission(record);
          setSubmitted(true);
        }
      })
      .catch(() => {})
      .finally(() => setCheckingExisting(false));
  }, [type, userId]);

  useEffect(() => {
    if (existingSubmission) {
      getSubmissionFileUrl(type, existingSubmission).then(setFileUrl).catch(() => setFileUrl(null));
    }
  }, [existingSubmission, type]);

  if (!userId) return null;

  if (checkingExisting) {
    return (
      <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const ext = '.' + selected.name.split('.').pop()?.toLowerCase();
    if (!config.acceptedExtensions.includes(ext)) {
      toast.error(`Accepted formats: ${config.acceptedExtensions.join(', ')}`);
      return;
    }

    if (selected.size > config.maxFileSize * 1024 * 1024) {
      toast.error(`File size must not exceed ${config.maxFileSize} MB.`);
      return;
    }

    setFile(selected);
    setError(null);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReplaceClick = () => {
    replaceInputRef.current?.click();
  };

  const handleReplaceFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || !existingSubmission) return;

    const ext = '.' + selected.name.split('.').pop()?.toLowerCase();
    if (!config.acceptedExtensions.includes(ext)) {
      toast.error(`Accepted formats: ${config.acceptedExtensions.join(', ')}`);
      return;
    }

    if (selected.size > config.maxFileSize * 1024 * 1024) {
      toast.error(`File size must not exceed ${config.maxFileSize} MB.`);
      return;
    }

    setUploading(true);
    try {
      await resubmitSubmission(type, existingSubmission.id, userId, selected);
      const record = await getSubmission(type, userId);
      if (record) setExistingSubmission(record);
      toast.success(`${config.title} resubmitted successfully.`);
    } catch (err) {
      if (err instanceof SubmissionError) {
        toast.error(err.message);
      } else {
        toast.error('Failed to resubmit. Please try again.');
      }
    } finally {
      setUploading(false);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (config.showSummary && !summary.trim()) {
      setError('Please enter a summary.');
      return;
    }
    if (!file) {
      setError('Please upload a file.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      if (existingSubmission) {
        await replaceSubmission(type, existingSubmission.id, userId, file, config.showSummary ? summary.trim() : undefined);
        const record = await getSubmission(type, userId);
        if (record) setExistingSubmission(record);
      } else {
        await submitSubmission(type, userId, file, config.showSummary ? summary.trim() : undefined);
        const record = await getSubmission(type, userId);
        if (record) setExistingSubmission(record);
      }
      setSubmittedAt(new Date().toISOString());
      setSubmitted(true);
      toast.success(`${config.title} submitted successfully.`);
    } catch (err) {
      if (err instanceof SubmissionError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  const submission = existingSubmission;
  const displayStatus = submission?.status ?? 'pending';
  const statusInfo = STATUS_CONFIG[displayStatus];
  const StatusIcon = statusInfo.icon;
  const summaryValue = config.summaryColumn && submission ? (submission[config.summaryColumn] as string) : '';


  if (submitted && existingSubmission) {
    return (
      <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className="text-center">
          <div className={`size-16 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ${
            displayStatus === 'approved'
              ? 'bg-green-100 dark:bg-green-900/30 ring-green-100/50 dark:ring-green-900/20'
              : displayStatus === 'rejected'
              ? 'bg-red-100 dark:bg-red-900/30 ring-red-100/50 dark:ring-red-900/20'
              : 'bg-yellow-100 dark:bg-yellow-900/30 ring-yellow-100/50 dark:ring-yellow-900/20'
          }`}>
            <StatusIcon className={`w-8 h-8 ${
              displayStatus === 'approved' ? 'text-green-600 dark:text-green-400'
              : displayStatus === 'rejected' ? 'text-red-600 dark:text-red-400'
              : 'text-yellow-600 dark:text-yellow-400'
            }`} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{config.title} Submitted</h3>
          {submission.created_at && (
            <p className="mt-4 text-sm text-muted-foreground">
              Submission Date: {new Date(submission.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          )}
          {submission.updated_at && (
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date(submission.updated_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          )}
          <div className="mt-4 flex items-center justify-center gap-3">
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-card border border-border text-foreground hover:text-primary transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                View File
              </a>
            )}
            {fileUrl && (
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-card border border-border text-foreground hover:text-primary transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-muted-foreground" />
                Download
              </a>
            )}
          </div>
          <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {statusInfo.label}
          </div>
          {summaryValue && (
            <div className="mt-4 max-w-md mx-auto">
              <p className="text-xs text-muted-foreground mb-1">Summary</p>
              <p className="text-sm text-foreground leading-relaxed">{summaryValue}</p>
            </div>
          )}
          {submission.review_notes && (
            <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border max-w-md mx-auto">
              <p className="text-xs text-muted-foreground mb-1">Review Notes</p>
              <p className="text-sm text-foreground leading-relaxed">{submission.review_notes}</p>
            </div>
          )}
          {displayStatus === 'rejected' && (
            <div className="mt-6">
              <button
                onClick={handleReplaceClick}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Replacing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Replace File
                  </>
                )}
              </button>
              <input
                ref={replaceInputRef}
                type="file"
                accept={config.acceptedExtensions.join(',')}
                onChange={handleReplaceFileChange}
                className="hidden"
              />
            </div>
          )}
          {displayStatus === 'pending' && (
            <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Your {type} is pending review. You will be notified once it has been reviewed.
            </p>
          )}
          {displayStatus === 'approved' && (
            <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Your {type} has been approved. You will receive further instructions.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      <div className="flex items-start gap-4 mb-6">
        <div className="size-12 rounded-xl bg-[#1E73A8]/10 dark:bg-[#2CA6C4]/10 flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-[#1E73A8] dark:text-[#2CA6C4]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{config.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {config.description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {config.showSummary && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {config.summaryLabel}
            </label>
            <textarea
              value={summary}
              onChange={(e) => { setSummary(e.target.value); setError(null); }}
              placeholder={config.summaryPlaceholder}
              rows={5}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Upload File
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Accepted formats: {config.acceptedExtensions.join(', ')}. Maximum file size: {config.maxFileSize} MB.
          </p>

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all"
            >
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {config.acceptedExtensions.join(', ')}, up to {config.maxFileSize} MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={config.acceptedExtensions.join(',')}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted border border-border">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-[#1E73A8] dark:text-[#2CA6C4] shrink-0" />
                <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={removeFile}
                className="p-1.5 rounded-lg hover:bg-card transition-colors text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E73A8] to-[#2CA6C4] text-white font-medium hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Submit {config.title}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
