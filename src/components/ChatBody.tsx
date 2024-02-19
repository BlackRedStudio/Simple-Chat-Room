import Info from "./elements/Info";
import Message from "./elements/Message";

function ChatBody() {
    return (
        <div className="max-h-[500px] overflow-auto bg-white w-full p-4 rounded-md">
            <Info>Dave has joined the room!</Info>
            <Message type="outgoing" />
            <Message type="incoming" />
            <Message type="incoming" />
            <Message type="incoming" />
            <Message type="outgoing" />
            <Message type="outgoing" />
            <Message type="incoming" />
        </div>
    )
}

export default ChatBody;
