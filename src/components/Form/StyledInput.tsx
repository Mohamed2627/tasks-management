import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const StyledInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full px-4 py-2 rounded-md transition-colors focus:outline-none ring-2 border-color',
            error && 'border-error focus:border-error ring-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

StyledInput.displayName = 'StyledInput';

export { StyledInput };