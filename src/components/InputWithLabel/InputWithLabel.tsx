import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  id: string;
  hasError?: boolean;
}

export const InputWithLabel = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  id,
  hasError,
}: InputWithLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className="relative w-full">
      <Label
        htmlFor={id}
        className={cn(
          'absolute left-6 text-muted-foreground transition-all pointer-events-none uppercase',
          'ml-[2px]',
          shouldFloat ? 'text-xs -top-4' : 'text-base top-2'
        )}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={shouldFloat ? placeholder : ''}
        autoComplete="off"
        className={cn(
          'border-0 border-b-2 border-input rounded-none p-6 bg-transparent',
          'focus-visible:ring-0 focus-visible:border-primary',
          hasError && 'border-destructive focus-visible:border-destructive'
        )}
      />
    </div>
  );
};
