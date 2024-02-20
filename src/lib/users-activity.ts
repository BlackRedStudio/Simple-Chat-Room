import { TMessage, TUser } from './types';

let users: TUser[] = [];

export function sendMsg(name: string, text: string): TMessage {
	return {
		id: crypto.randomUUID(),
		name,
		text,
		time: new Intl.DateTimeFormat('default', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		}).format(new Date()),
	};
}

export function activateUser(id: string, name: string, channel: string) {
	const user = { id, name, channel };

	if (!users.find(user => user.id === id || user.name === name)) {
		users.push(user);
	} else {
		return null;
	}

	return user;
}

export function deactivateUser(id: string) {
	users = users.filter(user => user.id !== id);
}

export function getUser(id: string) {
	return users.find(user => user.id === id);
}

export function getUsersInChannel(channel: string) {
	return users.filter(user => user.channel === channel);
}

export function getAllActiveChannels() {
	return Array.from(new Set(users.map(user => user.channel)));
}
