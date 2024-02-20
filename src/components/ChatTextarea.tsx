'use client';

import { ChangeEvent, useContext, useState } from 'react';
import Button from './elements/Button';
import Textarea from './elements/Textarea';
import SocketContext from '@/lib/SocketContext';

type TChatTextareaProps = {
    channel: string,
    name: string,
}

function ChatTextarea({name}: TChatTextareaProps) {
	const socket = useContext(SocketContext);

	const [message, setMessage] = useState('');

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        socket.emit('activity', name);
    }

    const sendMsg = () => {
        if(message.length > 0) {
            socket.emit('message', message);
        } else {
            alert('Can\'t send a blank message.');
        }
    }

	return (
		<div className="flex items-end w-full">
			<Textarea
				name="msg"
				id="msg"
				onChange={handleTextarea}
				placeholder="Write a message..."
                value={message}
				className="flex-2"
			/>
			<Button className="ml-2 w-36" onClick={sendMsg}>Send</Button>
		</div>
	);
}

export default ChatTextarea;
