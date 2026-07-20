import { useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FieldWrapper } from './FormFields';

interface PasswordStrengthInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: 'bg-muted' };
  return { score: 100, label: 'Strong', color: 'bg-green-500' };
}

export function PasswordStrengthInput({
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
}: PasswordStrengthInputProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const id = useId();
  const strength = getStrength(value);

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          className={`w-full rounded-xl border bg-card px-4 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 ${
            error ? 'border-red-500' : 'border-border'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {value && (focused || error) && (
        <div className="space-y-1 mt-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((segment) => (
              <div
                key={segment}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  strength.score >= segment * 25 ? strength.color : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Strength: <span className="font-medium">{strength.label || '—'}</span>
          </p>
        </div>
      )}
    </FieldWrapper>
  );
}
