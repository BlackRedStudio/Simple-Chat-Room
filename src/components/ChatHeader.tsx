import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import Button from './elements/Button';
import Input from './elements/Input';
import SocketContext from '@/lib/SocketContext';

type TChatHeaderProps = {
	setChannel: Dispatch<SetStateAction<string>>;
	setName: Dispatch<SetStateAction<string>>;
};

function ChatHeader({ setChannel, setName }: TChatHeaderProps) {

	const socket = useContext(SocketContext);

	const inputNickRef = useRef<HTMLInputElement>(null);
	const inputChannelRef = useRef<HTMLInputElement>(null);

	const joinChannel = () => {
		if (
			inputChannelRef.current &&
			inputNickRef.current &&
			inputChannelRef.current.value.length > 3 &&
			inputNickRef.current.value.length > 3
		) {
			const name = inputNickRef.current.value;
			const channel = inputChannelRef.current.value;
			
			setChannel(channel);
			setName(name);

			socket.emit('enterRoom', {
				name,
				channel
			});
		} else {
			alert('The name of channel or/and nickname should contains at least 3 letters.');
		}
	};

	return (
		<div className="flex mb-5">
			<Input ref={inputNickRef} type="text" placeholder="Nick" />
			<Input ref={inputChannelRef} className="mx-2" type="text" placeholder="Channel" />
			<Button onClick={joinChannel}>Join</Button>
		</div>
	);
}

export default ChatHeader;
