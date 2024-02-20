import http from 'http';
import { Server } from 'socket.io';
import {
	activateUser,
	deactivateUser,
	getAllActiveChannels,
	getUser,
	getUsersInChannel,
	sendMsg,
} from './lib/users-activity';

const server = http.createServer();

server.listen(3002, 'localhost', () => {
	console.log('listening on port 3002');
});

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', socket => {
	console.log(`User ${socket.id} connected!`);

	socket.on('enterChannel', ({ name, channel }) => {
		const prevChannel = getUser(socket.id)?.channel;

		deactivateUser(socket.id);

		if (prevChannel) {
			socket.leave(prevChannel);

			io.to(prevChannel).emit('userList', {
				users: getUsersInChannel(prevChannel),
			});

			io.to(prevChannel).emit('message', sendMsg('ADMIN', `${name} has left the channel`));
		}

		const user = activateUser(socket.id, name, channel);
		if(!user) {
			socket.emit('error', 'Duplicated user name');
			return false;
		}

		socket.join(user.channel);

		socket.emit('message', sendMsg('ADMIN', `You have joined the ${user.channel} channel`));

		socket.broadcast.to(user.channel).emit('message', sendMsg('ADMIN', `User ${user.name} has joined to channel`));

		io.to(user.channel).emit('userList', {
			users: getUsersInChannel(user.channel),
		});

		io.emit('channelList', {
			channels: getAllActiveChannels(),
		});
	});

	socket.on('disconnect', () => {
		const user = getUser(socket.id);
		deactivateUser(socket.id);

		if (user) {
			io.to(user.channel).emit(
				'message',
				sendMsg('ADMIN', `${user.name} has left the channel`)
			);

			io.to(user.channel).emit('userList', {
				users: getUsersInChannel(user.channel),
			});

			io.emit('channelList', {
				channels: getAllActiveChannels(),
			});
		}
	});

	socket.on('message', msg => {
		const user = getUser(socket.id);

		if (user?.channel) {
			io.to(user.channel).emit('message', sendMsg(user.name, msg));
		}
	});

	socket.on('activity', name => {
		const user = getUser(socket.id);

		if (user?.channel) {
			socket.broadcast.to(user.channel).emit('activity', user.name);
		}
	});
});
