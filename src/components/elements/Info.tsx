import { ReactNode } from "react";

type TInfoProps = {
    children: ReactNode
}

function Info({children}: TInfoProps) {
    return (
        <div className="rounded-xl mb-5 border-2 p-2 bg-gray-100">
            {children}
        </div>
    )
}

export default Info;
