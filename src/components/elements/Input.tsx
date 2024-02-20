import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

type TInputProps = InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, TInputProps>(
    function Input({className, ...props}, ref) {
        return (
            <input
                {...props}
                ref={ref}
                className={
                    cn(
                        'h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )
                }
            />
        );
    }
)
