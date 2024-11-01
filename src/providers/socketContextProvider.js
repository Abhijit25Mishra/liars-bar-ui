import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SocketContext from "../contexts/socketContext";

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3001", {
            transports: ["websocket", "polling"],
            timeout: 5000,
        });

        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
