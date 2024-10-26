import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
    const [messages, setMessages] = useState([]);  // State to store multiple messages
    const [message, setMessage] = useState('');  // Input field for new messages
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(io("http://localhost:3001", {
            transports: ["websocket", "polling"],
            timeout: 5000
        }));
    }, []);


    useEffect(() => {
        console.log(socket?.connected);

        socket?.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket?.on('joined room', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);  // Append new message to the state
        });

        socket?.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);  // Append new chat messages
        });

    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('chat message', { msg: message });  // Emit chat message to backend
            setMessage('');  // Clear the input field
        }
    };

    return (
        <div className='flex flex-col h-screen'>
            <div className='text-red-900 text-3xl mb-4'>Chat Room</div>

            <div
                className='overflow-y-auto flex-1 p-4 border border-gray-300 rounded-lg'
                style={{ maxHeight: '60vh' }}  // Limit height for scrolling
            >
                {messages.map((msg, index) => (
                    <div key={index} className='text-white mb-2'>
                        {msg}
                    </div>
                ))}
            </div>

            <div className='flex items-center mt-4'>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none bg-white text-black'
                />
                <button
                    onClick={handleSendMessage}
                    className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
                >
                    Send
                </button>
            </div>
        </div>
    );
}
