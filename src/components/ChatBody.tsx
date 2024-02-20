'use client';

import SocketContext from '@/lib/SocketContext';
import Info from './elements/Info';
import Message from './elements/Message';
import { useContext, useEffect, useRef, useState } from 'react';
import TypingInfo from './elements/TypingInfo';
import { TMessage } from '@/lib/types';

type TChatBodyProps = {
	name: string;
};

let inactiveTimer: NodeJS.Timeout;

function ChatBody({ name }: TChatBodyProps) {
	const socket = useContext(SocketContext);
	const [messages, setMessages] = useState<TMessage[]>([]);
	const [activity, setActivity] = useState('');

	const chatBodyRef = useRef<HTMLDivElement>(null);

	const scrollBottom = () => {

		const chatBodyEl = chatBodyRef.current;

		if(chatBodyEl) {
			chatBodyEl.scrollTop = chatBodyEl.scrollHeight;
		}
	};

	useEffect(() => {
		socket.on('activity', name => {
			setActivity(name);
			clearTimeout(inactiveTimer);
			inactiveTimer = setTimeout(() => setActivity(''), 1000);
		});
		socket.on('message', msg => {
			setActivity('');
			setMessages(prev => [...prev, msg]);
		});

        return () => {
          socket.off('activity');
          socket.off('message');
        };
	}, [socket]);

	useEffect(() => {
		scrollBottom();
	}, [messages, activity]);

	return (
		<div ref={chatBodyRef} className="max-h-[500px] overflow-auto bg-white w-full p-4 rounded-md">
			<Info>Welcome to Chat App!</Info>
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
			{activity ? <TypingInfo>{activity} is typing...</TypingInfo> : null}
		</div>
	);
}

export default ChatBody;
