'use client'

import SocketContext from "@/lib/SocketContext";
import { TUser } from "@/lib/types";
import { useContext, useEffect, useState } from "react";

function ChatInfo() {

	const socket = useContext(SocketContext);

    const [userList, setUserList] = useState<TUser[]>([]);
    const [channelList, setChannelList] = useState<string[]>([]);

    useEffect(() => {
        socket.on('error', error => {
            console.log(error);
            alert(error);
        });
        socket.on('userList', ({users}) => {
            setUserList(users);
        });
        socket.on('channelList', ({channels}) => {
            setChannelList(channels);
        });

        return () => {
          socket.off('error');
          socket.off('activity');
          socket.off('message');
        };
    }, [socket]);

    return (
        <div className="space-y-2 my-4">
            <div>Users on channel: {userList.map(user => user.name).join(', ')}</div>
            <div>Active channel: {channelList.join(', ')}</div>
        </div>
    )
}

export default ChatInfo;
