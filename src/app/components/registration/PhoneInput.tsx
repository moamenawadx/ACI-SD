import { useCallback } from 'react';
import ReactPhoneInput from 'react-phone-number-input';
import type { Value } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FieldWrapper } from './FormFields';

interface PhoneInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function PhoneInput({ label, value, onChange, error, required, placeholder }: PhoneInputProps) {
  const handleChange = useCallback(
    (newValue: Value | undefined) => {
      onChange(newValue || '');
    },
    [onChange],
  );

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div
        data-error={error ? 'true' : undefined}
        className="phone-input-wrapper [&_.PhoneInput]:!flex [&_.PhoneInput]:!w-full [&_.PhoneInput]:!rounded-xl [&_.PhoneInput]:!border [&_.PhoneInput]:data-[error=true]:!border-red-500 [&_.PhoneInput]:!border-border [&_.PhoneInput]:!bg-card [&_.PhoneInput]:!transition-all [&_.PhoneInput]:!outline-none [&_.PhoneInput:focus-within]:!border-primary/50 [&_.PhoneInput:focus-within]:!ring-2 [&_.PhoneInput:focus-within]:!ring-primary/20 [&_.PhoneInputInput]:!border-none [&_.PhoneInputInput]:!bg-transparent [&_.PhoneInputInput]:!px-4 [&_.PhoneInputInput]:!py-2.5 [&_.PhoneInputInput]:!text-sm [&_.PhoneInputInput]:!text-foreground [&_.PhoneInputInput]:!outline-none [&_.PhoneInputCountry]:!border-r [&_.PhoneInputCountry]:!border-border [&_.PhoneInputCountry]:!px-3 [&_.PhoneInputCountry]:!py-2.5 [&_.PhoneInputCountry]:!bg-muted [&_.PhoneInputCountry]:!rounded-l-xl [&_.PhoneInputGlobe]:!hidden"
      >
        <ReactPhoneInput
          international
          defaultCountry="EG"
          value={value || undefined}
          onChange={handleChange}
          placeholder={placeholder || 'Enter phone number'}
          smartCaret
        />
      </div>
    </FieldWrapper>
  );
}

export { isValidPhoneNumber };
