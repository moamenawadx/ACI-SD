import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useRef, useState, useId } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function FieldWrapper({ label, required, error, children }: FieldWrapperProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextInput({ label, error, required, className = '', ...props }: TextInputProps) {
  const id = useId();
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <input
        id={id}
        className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-border'} bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function SelectInput({ label, options, placeholder, error, required, className = '', ...props }: SelectInputProps) {
  const id = useId();
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <select
        id={id}
        className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-border'} bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </FieldWrapper>
  );
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function RadioGroup({ label, name, options, value, onChange, error, required }: RadioGroupProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
              value === opt.value
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
              value === opt.value ? 'border-primary' : 'border-muted-foreground/40'
            }`}>
              {value === opt.value && <span className="w-2 h-2 rounded-full bg-primary" />}
            </span>
            {opt.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function CheckboxField({ label, checked, onChange, error }: CheckboxProps) {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <span className={`mt-0.5 size-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
          checked
            ? 'bg-primary border-primary'
            : 'border-border group-hover:border-primary/50'
        }`}>
          {checked && <Check className="w-3.5 h-3.5 text-white" />}
        </span>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span className="text-sm text-foreground leading-relaxed">{label}</span>
      </label>
      {error && <p className="text-xs text-red-500 ml-8">{error}</p>}
    </div>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextArea({ label, error, required, className = '', ...props }: TextAreaProps) {
  const id = useId();
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <textarea
        id={id}
        className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-border'} bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 min-h-[80px] resize-y ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface CountrySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const countryOptions = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 'Bulgaria', 'Canada',
  'China', 'Colombia', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark',
  'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Iraq', 'Ireland',
  'Italy', 'Japan', 'Jordan', 'Kenya', 'Kuwait', 'Lebanon',
  'Libya', 'Malaysia', 'Maldives', 'Mexico', 'Morocco', 'Netherlands',
  'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sudan',
  'Sweden', 'Switzerland', 'Syria', 'Tunisia', 'Turkey', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Yemen',
];

export function CountrySelect({ label, value, onChange, error, required }: CountrySelectProps) {
  const id = useId();
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-border'} bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20`}
      >
        <option value="">Select country</option>
        {countryOptions.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </FieldWrapper>
  );
}

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function PhoneInput({ label, value, onChange, error, required, placeholder }: PhoneInputProps) {
  const id = useId();
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className="flex">
        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-muted text-sm text-muted-foreground">
          +20
        </span>
        <input
          id={id}
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Enter phone number'}
          className={`w-full rounded-r-xl border ${error ? 'border-red-500' : 'border-border'} bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20`}
        />
      </div>
    </FieldWrapper>
  );
}

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  min?: string;
}

export function DatePicker({ label, value, onChange, error, required, min }: DatePickerProps) {
  const id = useId();
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        className={`w-full rounded-xl border ${error ? 'border-red-500' : 'border-border'} bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 [color-scheme:var(--color-scheme)]`}
      />
    </FieldWrapper>
  );
}

interface FileUploadProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
}

export function FileUpload({ label, value, onChange, error, required, accept, maxSize = 10 }: FileUploadProps) {
  const id = useId();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleFile = (file: File) => {
    const allowedTypes = accept?.split(',').map(t => t.trim()) || [];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const typeOk = allowedTypes.length === 0 || allowedTypes.some(t => file.type.startsWith(t.replace('/*', '')) || ext === t);
    const sizeOk = file.size <= maxSize * 1024 * 1024;

    if (!typeOk) {
      error = `Invalid file type. Accepted: ${accept}`;
      return;
    }
    if (!sizeOk) {
      error = `File exceeds ${maxSize} MB limit`;
      return;
    }

    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onChange(file);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    setProgress(0);
    setUploading(false);
  };

  return (
    <FieldWrapper label={label} required={required} error={error}>
      {value ? (
        <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{value.name}</p>
              <p className="text-xs text-muted-foreground">{(value.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          </div>
          <button onClick={handleRemove} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ) : uploading ? (
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uploading...</span>
            <span className="text-sm font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-border bg-card cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => document.getElementById(id)?.click()}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, JPG, PNG up to {maxSize} MB
          </p>
          <input
            id={id}
            type="file"
            accept={accept || '.pdf,.jpg,.jpeg,.png'}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </FieldWrapper>
  );
}
