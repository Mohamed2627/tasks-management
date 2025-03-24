import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';


export type Option = {
  value: string | number;
  label: string;
};

export type TSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

const StyledSelectInput = forwardRef<HTMLSelectElement, TSelectProps>(
  ({ label, error, className, id, options, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[14px] sm:text-[14px] font-medium"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 border',
            error && 'border-error focus:border-error focus:ring-error',
            className
          )}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value} className='dark:bg-gray-700 max-w-[240px]'>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

StyledSelectInput.displayName = 'StyledSelectInput';

export { StyledSelectInput }