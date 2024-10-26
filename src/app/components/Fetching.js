import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]); // State to store multiple messages
    const [message, setMessage] = useState(''); // Input field for new messages
    const socketRef = useRef(null); // Use useRef to store socket instance

    useEffect(() => {
        // Create socket connection
        socketRef.current = io("http://192.168.0.105:3001", {
            transports: ["websocket", "polling"],
            timeout: 5000,
        });

        // Listen for events
        socketRef.current.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socketRef.current.on('joined room', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]); // Append new message to the state
        });

        socketRef.current.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]); // Append new chat messages
        });

        // Cleanup on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []); // Empty dependency array ensures this effect runs once

    const handleSendMessage = () => {
        if (message.trim()) {
            socketRef.current.emit('chat message', { msg: message }); // Emit chat message to backend
            setMessage(''); // Clear the input field
        }
    };
    const handleNameChange = () => {
        socketRef.current.emit('change name', { newName: name });
        setName('');
    }


    return (
        <div className='flex flex-col h-screen'>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleNameChange(); // Call the send message function
                            e.preventDefault(); // Prevent form submission (if it's inside a form)
                        }
                    }}
                    placeholder="Your Name"
                    className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none bg-white text-black'
                />
                <button
                    onClick={handleNameChange}
                    className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
                >
                    Change Name
                </button>
            </div>

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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage(); // Call the send message function
                            e.preventDefault(); // Prevent form submission (if it's inside a form)
                        }
                    }}
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
