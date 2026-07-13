import { useState, useCallback, useId } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../ui/command';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { cn } from '../ui/utils';
import { countries, type Country } from '../../data/countries';
import { FieldWrapper } from './FormFields';

interface CountrySelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function CountrySelectField({ label, value, onChange, error, required }: CountrySelectFieldProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const selected = countries.find((c) => c.name === value);

  const handleSelect = useCallback(
    (countryName: string) => {
      onChange(countryName);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            aria-label={label}
            className={cn(
              'w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-left outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 flex items-center justify-between gap-2',
              error ? 'border-red-500' : 'border-border',
              !selected && 'text-muted-foreground/60',
            )}
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{selected.flag}</span>
                <span className="text-foreground">{selected.name}</span>
              </span>
            ) : (
              <span>Select {label.toLowerCase()}</span>
            )}
            <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={handleSelect}
                  >
                    <span className="flex items-center gap-2 flex-1">
                      <span className="text-base leading-none">{country.flag}</span>
                      <span>{country.name}</span>
                    </span>
                    <Check
                      className={cn(
                        'ml-auto w-4 h-4',
                        value === country.name ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldWrapper>
  );
}

export { countries };
export type { Country };
