import { useState, useRef, useId, useCallback } from 'react';
import { Upload, X, FileText, ImageIcon, AlertCircle } from 'lucide-react';
import { FieldWrapper } from './FormFields';

interface ReceiptUploadProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
}

const ALLOWED_TYPES = ['.pdf', '.jpg', '.jpeg', '.png'];
const ALLOWED_MIME = ['application/pdf', 'image/jpeg', 'image/png'];

function getFileTypeIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return FileText;
  return ImageIcon;
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ReceiptUpload({ label, value, onChange, error, required, accept, maxSize = 10 }: ReceiptUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayError = error || validationError;

  const validateFile = useCallback(
    (file: File): string | null => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeOk = ALLOWED_MIME.some((m) => file.type.startsWith(m.replace('/*', '')));
      const extOk = ALLOWED_TYPES.includes(ext);
      if (!mimeOk && !extOk) {
        return `Invalid file type. Accepted: ${ALLOWED_TYPES.join(', ')}`;
      }
      if (file.size > maxSize * 1024 * 1024) {
        return `File exceeds ${maxSize} MB limit`;
      }
      return null;
    },
    [maxSize],
  );

  const processFile = useCallback(
    (file: File) => {
      const validationErr = validateFile(file);
      if (validationErr) {
        setValidationError(validationErr);
        return;
      }
      setValidationError(null);

      setUploading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 25 + 5;
          if (next >= 100) {
            clearInterval(interval);
            setUploading(false);
            setProgress(100);

            if (file.type.startsWith('image/')) {
              const url = URL.createObjectURL(file);
              setPreviewUrl(url);
            } else {
              setPreviewUrl(null);
            }
            onChange(file);
            return 100;
          }
          return next;
        });
      }, 200);
    },
    [validateFile, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleRemove = useCallback(() => {
    onChange(null);
    setProgress(0);
    setUploading(false);
    setValidationError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onChange, previewUrl]);

  return (
    <FieldWrapper label={label} required={required} error={displayError}>
      {value ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {previewUrl && (
            <div className="relative aspect-video bg-muted/30 border-b border-border">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="w-full h-full object-contain p-4"
              />
            </div>
          )}
          {!previewUrl && value.type === 'application/pdf' && (
            <div className="flex items-center justify-center py-8 bg-muted/30 border-b border-border">
              <FileText className="w-12 h-12 text-primary/60" />
            </div>
          )}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3 min-w-0">
              {previewUrl ? (
                <ImageIcon className="w-5 h-5 text-primary shrink-0" />
              ) : (
                <FileText className="w-5 h-5 text-primary shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{value.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(value.size)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Replace file"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : uploading ? (
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uploading...</span>
            <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-200"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-border bg-card cursor-pointer hover:border-primary/50 transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, JPG, PNG up to {maxSize} MB
          </p>
          {validationError && (
            <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{validationError}</span>
            </div>
          )}
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept || ALLOWED_TYPES.join(',')}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </FieldWrapper>
  );
}
