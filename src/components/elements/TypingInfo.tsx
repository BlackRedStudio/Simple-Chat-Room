import { ReactNode } from "react";

type TTypingInfoProps = {
    children: ReactNode
}

function TypingInfo({children}: TTypingInfoProps) {
    return (
        <div className="rounded-xl mb-5 text-right w-1/2 border-2 p-2 ml-auto">
            {children}
        </div>
    )
}

export default TypingInfo;
