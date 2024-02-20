'use client';

import SocketContext from '@/lib/SocketContext';
import Info from './elements/Info';
import Message from './elements/Message';
import { useContext, useEffect, useState } from 'react';
import TypingInfo from './elements/TypingInfo';
import { TMessage } from '@/lib/types';

type TChatBodyProps = {
	name: string;
};

function ChatBody({ name }: TChatBodyProps) {
	const socket = useContext(SocketContext);
	const [messages, setMessages] = useState<TMessage[]>([]);

	useEffect(() => {
		socket.on('message', msg => {
			setMessages(prev => [...prev, msg]);
		});

        return () => {
          socket.off('message');
        };
	}, [socket]);

	return (
		<div className="max-h-[500px] overflow-auto bg-white w-full p-4 rounded-md">
			{/* <Info>Dave has joined the room!</Info>
            <Message type="outgoing" />
            <Message type="incoming" />
            <Message type="incoming" />
            <Message type="incoming" />
            <Message type="outgoing" />
            <Message type="outgoing" />
            <Message type="incoming" />
            <TypingInfo>Dave is typing...</TypingInfo> */}
			{messages.reverse().map(message =>
				message.name === 'ADMIN' ? (
					<Info key={message.id}>{message.text}</Info>
				) : (
					<Message
						key={message.id}
						type={name === message.name ? 'outgoing' : 'incoming'}
						name={message.name}
						time={message.time}
					>{message.text}</Message>
				)
			)}
		</div>
	);
}

export default ChatBody;
