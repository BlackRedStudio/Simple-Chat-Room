import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...props }: TButtonProps) {
	return (
		<button
			{...props}
			className={cn('bg-blue-400 text-white px-5 py-2 inline-block rounded-lg', className)}
		>
			{children}
		</button>
	);
}

export default Button;
