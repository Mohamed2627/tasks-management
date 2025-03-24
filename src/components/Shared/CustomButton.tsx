import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'outline';
type ButtonType = 'button' | 'submit';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  type?: ButtonType;
  children: ReactNode;
}

const CustomButton = ({
  variant = 'primary',
  children,
  className,
  type = 'button',
  ...props
}: IButtonProps) => {

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  };

  return (
    <button
      type={type}
      className={cn('px-2 sm:px-4 py-2 rounded-md cursor-pointer font-medium transition-colors duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;