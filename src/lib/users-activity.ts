import { TUser } from "./types";

let users: TUser[] = [];

export function sendMsg(name: string, text: string) {
	return {
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

	if (users.filter(user => user.id !== id)) {
		users.push(user);
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
