import React, {  useContext, useEffect, useMemo, useRef } from 'react';
import { io } from 'socket.io-client';
import SocketContext from "../contexts/socketContext"

export const SocketContextProvider = ({ children }) => {
    const socketRef = useRef(null); 

    useEffect(() => {
        socketRef.current = io("localhost:3001", {
            transports: ["websocket", "polling"],
            timeout: 5000,
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const value = useMemo(() => ({ socket: socketRef.current }), [socketRef.current]);

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
