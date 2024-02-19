import { cn } from "@/lib/utils";

type TMessageProps = {
    type: 'incoming' | 'outgoing'
}

function Message({type}: TMessageProps) {
    return (
        <div className={
            cn(
                'text-white p-2 rounded-xl w-[75%] mb-5',
                type === 'outgoing' ? 'bg-blue-700' : 'bg-purple-500 ml-auto',
            )
        }>
            <div className="flex justify-between">
                <div className="text-bold">Dave</div>
                <div className="time">14:30:36</div>
            </div>
            <div className="bg-white text-black p-2 mt-2 rounded-md">Hello everyone!</div>
        </div>
    )
}

export default Message;
