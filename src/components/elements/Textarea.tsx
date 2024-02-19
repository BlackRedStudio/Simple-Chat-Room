import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function Textarea({className, ...props}: TTextareaProps) {
    return (
        <textarea
            {...props}
            className={cn(
                'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
        ></textarea>
    )
}

export default Textarea;
