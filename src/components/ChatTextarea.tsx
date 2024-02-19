import Button from "./elements/Button";
import Textarea from "./elements/Textarea";

function ChatTextarea() {
    return (
        <div className="flex items-end w-full">
            <Textarea name="msg" id="msg" placeholder="Write a message..." className="flex-2" />
            <Button className="ml-2 w-36">Send</Button>
        </div>
    )
}

export default ChatTextarea;
