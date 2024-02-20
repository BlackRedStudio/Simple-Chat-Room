'use client';

import ChatBody from '@/components/ChatBody';
import ChatHeader from '@/components/ChatHeader';
import ChatInfo from '@/components/ChatInfo';
import ChatTextarea from '@/components/ChatTextarea';
import SocketContext, { socket } from '@/lib/SocketContext';
import { useState } from 'react';

export default function Home() {
	const [channel, setChannel] = useState('');
	const [name, setName] = useState('');

	return (
		<main className="min-h-screen p-5 max-w-[700px] mx-auto">
			<SocketContext.Provider value={socket}>
				<h1 className="uppercase text-2xl mb-7 text-center">Chat room</h1>
				<ChatHeader setChannel={setChannel} setName={setName} />
				<ChatBody name={name} />
				<ChatInfo />
				<ChatTextarea channel={channel} name={name} />
			</SocketContext.Provider>
		</main>
	);
}
