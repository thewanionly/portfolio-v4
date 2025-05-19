import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

interface TextAreaWithLabelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  id: string;
  rows?: number;
  hasError?: boolean;
}

export const TextAreaWithLabel = ({
  label,
  value,
  onChange,
  placeholder = '',
  id,
  rows,
  hasError,
}: TextAreaWithLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className="grid relative w-full ">
      <Label
        htmlFor={id}
        className={cn(
          'absolute left-6 text-muted-foreground transition-all pointer-events-none uppercase',
          shouldFloat ? 'text-xs -top-4' : 'text-base top-2'
        )}
      >
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={shouldFloat ? placeholder : ''}
        rows={rows}
        autoComplete="off"
        className={cn(
          'pt-4 mt-4 border-0 border-b-2 border-input rounded-none px-6 resize-none',
          'focus-visible:ring-0 focus-visible:border-primary',
          'bg-transparent',
          hasError && 'border-destructive focus-visible:border-destructive'
        )}
      />
    </div>
  );
};
