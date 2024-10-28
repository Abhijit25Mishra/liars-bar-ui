import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { notification } from 'antd';

export default function Home() {
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]); // State to store multiple messages
    const [message, setMessage] = useState(''); // Input field for new messages
    const socketRef = useRef(null); // Use useRef to store socket instance

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (pauseOnHover) => () => {
      api.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        showProgress: true,
        pauseOnHover,
      });
    };
  


    useEffect(() => {
        // Create socket connection
        socketRef.current = io("localhost:3001", {
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

        socketRef.current.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]); // Append new chat messages
        });

        socketRef.current.on('errorMsg', (errorMsg) => {
            console.log(errorMsg);
            openNotification(true)();
        })

        // Cleanup on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []); // Empty dependency array ensures this effect runs once

    const handleSendMessage = () => {
        if (message.trim()) {
            socketRef.current.emit('chatMessage', { msg: message }); // Emit chat message to backend
            setMessage(''); // Clear the input field
        }
    };
    const handleNameChange = () => {
        socketRef.current.emit('changeName', { newName: name });
        setName('');
    }

    const creatingParty = () => {
        socketRef.current.emit('createParty');
    }

    const handleRoomJoin = () => {
        socketRef.current.emit('joinParty', { roomName: message });
    }

    return (
        <div className='flex flex-col h-screen'>
            {contextHolder}
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
                    className='ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl'
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
            <div className='flex items-center mt-4'>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleRoomJoin(); // Call the send message function
                            e.preventDefault(); // Prevent form submission (if it's inside a form)
                        }
                    }}
                    placeholder="Enter RoomName"
                    className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none bg-white text-black'
                />
                <button
                    onClick={handleRoomJoin}
                    className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
                >
                    Join
                </button>

            </div>

            <button
                    onClick={creatingParty}
                    className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
                >
                    Create Party
                </button>

        </div>
    );
}
