import Button from "./elements/Button";
import Input from "./elements/Input";

function ChatHeader() {
	return (
		<div className="flex mb-5">
			<Input type="text" placeholder="Nick" />
			<Input className="mx-2" type="text" placeholder="Channel" />
			<Button>Join</Button>
		</div>
	);
}

export default ChatHeader;
