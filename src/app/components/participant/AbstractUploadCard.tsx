import { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, Loader2, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';
import { sessionService } from '../../../services/sessionService';
import { uploadAbstractPdf, submitAbstract, UploadError } from '../../../services/uploadService';

interface AbstractSubmissionData {
  submittedAt: string;
  fileName: string;
}

export function AbstractUploadCard() {
  const session = sessionService.getSession();
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<AbstractSubmissionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!session) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf') {
      toast.error('Only PDF files are accepted.');
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      toast.error('File size must not exceed 10 MB.');
      return;
    }

    setFile(selected);
    setError(null);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!summary.trim()) {
      setError('Please enter an abstract summary.');
      return;
    }
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const fileUrl = await uploadAbstractPdf(session.id, file);
      await submitAbstract(session.id, summary.trim(), fileUrl);
      setSubmitted(true);
      setSubmissionData({
        submittedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        fileName: file.name,
      });
      toast.success('Abstract submitted successfully.');
    } catch (err) {
      if (err instanceof UploadError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  if (submitted && submissionData) {
    return (
      <div className="rounded-2xl bg-card border border-border shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className="text-center">
          <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4 ring-8 ring-green-100/50 dark:ring-green-900/20">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Abstract Submitted Successfully</h3>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Submission Date: {submissionData.submittedAt}
            </p>
            <p className="text-sm text-muted-foreground">
              Uploaded File: {submissionData.fileName}
            </p>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            Final Submission
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            This is your final submission. You cannot upload another abstract.
          </p>
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
          <h3 className="text-lg font-bold text-foreground">Abstract Submission</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Submit your abstract for the conference.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Abstract Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => { setSummary(e.target.value); setError(null); }}
            placeholder="Enter your abstract summary..."
            rows={5}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Upload PDF
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Accepted format: PDF only. Maximum file size: 10 MB.
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
              <p className="text-xs text-muted-foreground mt-1">PDF only, up to 10 MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
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
              Submit Abstract
            </>
          )}
        </button>
      </div>
    </div>
  );
}
