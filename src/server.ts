import http from 'http';
import { Server } from 'socket.io';
import { activateUser, deactivateUser, getAllActiveChannels, getUser, getUsersInChannel, sendMsg } from './lib/users-activity';

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

	socket.emit('info', 'Welcome to Chat App!');

	socket.on('enterChannel', ({name, channel}) => {

		const prevChannel = getUser(socket.id)?.channel;

		if(prevChannel) {
			socket.leave(prevChannel);
			io.to(prevChannel).emit('info', `${name} has left the channel`);
		}

		const user = activateUser(socket.id, name, channel);

		if(prevChannel) {
			io.to(prevChannel).emit('userList', {
				users: getUsersInChannel(prevChannel)
			});
		}

		socket.join(user.channel);

		socket.emit('info', `You have joined the ${user.channel} channel`)

		socket.broadcast.to(user.channel).emit(`User ${user.name} has joined to channel`);

		io.to(user.channel).emit('userList', {
			users: getUsersInChannel(user.channel)
		})

		io.emit('channelList', {
			channel: getAllActiveChannels()
		});
	});

	socket.on('disconnect', () => {
		
		const user = getUser(socket.id);
		deactivateUser(socket.id);

		if(user) {
			io.to(user.channel).emit('info', `${user.name} has left the channel`);

			io.to(user.channel).emit('userList', {
				users: getUsersInChannel(user.channel)
			})

			io.emit('channelList', {
				channel: getAllActiveChannels()
			});
		}
	})

	socket.on('message', ({name, text}) => {
		const channel = getUser(socket.id)?.channel;

		if(channel) {
			io.to(channel).emit('message', sendMsg(name, text))
		}
	})

	socket.on('activity', ({name}) => {
		const channel = getUser(socket.id)?.channel;

		if(channel) {
			socket.broadcast.to(channel).emit('activity', name);
		}
	})

});
