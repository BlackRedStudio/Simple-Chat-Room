import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TMessageProps = {
    type: 'incoming' | 'outgoing',
    children: ReactNode,
    name: string,
    time: string,
}

function Message({type, children, name, time}: TMessageProps) {
    return (
        <div className={
            cn(
                'text-white p-2 rounded-xl w-[75%] mb-5',
                type === 'outgoing' ? 'bg-blue-700' : 'bg-purple-500 ml-auto',
            )
        }>
            <div className="flex justify-between">
                <div className="font-bold">{name}</div>
                <div className="time">{time}</div>
            </div>
            <div className="bg-white text-black p-2 mt-2 rounded-md">{children}</div>
        </div>
    )
}

export default Message;
