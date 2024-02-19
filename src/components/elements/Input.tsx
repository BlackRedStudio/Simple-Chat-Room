import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

type TInputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({className, ...props}: TInputProps) {
	return (
		<input
			{...props}
            className={
                cn(
                    'h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )
            }
		/>
	);
}

export default Input;
