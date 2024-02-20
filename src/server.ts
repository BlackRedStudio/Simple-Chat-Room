import http from 'http';
import { Server } from 'socket.io';
import { TUser } from './lib/types';

const server = http.createServer();

server.listen(3002, 'localhost', () => {
	console.log('listening on port 3002');
});

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

const users: TUser[] = [];

io.on('connection', socket => {

	console.log(`User ${socket.id} connected!`);

	socket.on('message', data => {
		io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
	});

});

function sendMsg(name: string, text: string) {
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

function activateUser(id: string, name: string, channel: string) {
	const user = { id, name, channel };

	if (users.filter(user => user.id !== id)) {
		users.push(user);
	}
}
