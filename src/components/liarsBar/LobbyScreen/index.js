import { Input } from "antd";
import { useState, useEffect } from "react";
import Typography from "antd/es/typography/Typography";
import { CopyOutlined } from "@ant-design/icons";
import { useSocket } from "@/providers/socketContextProvider";


const LobbyScreen = ({ setMainState, roomData, userName, usersList }) => {
    
    console.log("inlobby roomData",roomData);
    console.log("name",userName);
    const roomPassword = roomData.roomPassword; 
    const { socket } = useSocket();
    const [usersInRoom, SetUsersInRoom] = useState(usersList ? usersList:[userName]);
    const [readyUsers, setReadyUsers] = useState([]);


    console.log(usersInRoom);


    useEffect(() => {
        if (socket) {
            socket.on('userListUpdate', (users) => {
                setMainState({ usersList: users });
                SetUsersInRoom(users);
            })

            socket.on('ready', (readyList) => {
                console.log(readyList);
                setReadyUsers(readyList);
            })

            socket.on('startGame', () => {
                console.log('going to start game');
                handleStartGame();                
            })

            return () => {
                socket.off('userListUpdate'); 
                socket.off('ready');
                socket.off('startGame');
            };
        }
    }, [socket]);


    const handleReadyButton = () => {
        socket.emit('ready', {roomData: roomData, userName:userName});
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(roomPassword)
            .then(() => {
                console.log("Value copied to clipboard:", roomPassword);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    const handleStartGame = () => {
        setMainState({ view: "GameRoomScreen" });
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-evenly">
            <Typography className="text-gray-200 text-6xl lg:text-9xl md:text-8xl">Liar's Bar</Typography>
            
            <div className="flex flex-col w-full items-center justify-evenly">
                <Typography className="text-gray-200 text-4xl lg:text-7xl md:text-6xl"> Party Code </Typography>

                    <div
                        onClick={handleCopyToClipboard}
                        className='w-1/2 flex  items-center justify-evenly  bg-black text-4xl  rounded-full cursor-pointer px-4 py-4 md:py-6 m-4 '
                        >
                        {roomPassword.split("").map((char, index) => (
                            <div
                            key={index}
                            className="text-4xl font-normal md:font-medium md:text-5xl lg:font-semibold lg:text-6xl  text-white text-center" >
                                {char}
                            </div>
                        ))}
                        <CopyOutlined className="ml-2" /> 
                    </div>

            
            </div>

            <div className="flex flex-col md:flex-row gap-4 ">
                {usersInRoom.map((user, index) => (
                    <div
                        key={index}
                        // className="bg-white w-60 text-black text-4xl py-2 text-center"
                        className={`bg-white w-60 text-black text-4xl py-2 text-center ${readyUsers.includes(user) ? 'text-green-500' : ''}`}
                    >        
                        {`${user} ${user === userName ? '(You)' : ''}`}
                    </div>
                ))}
            </div>

            <div className="flex flex-col w-3/4 items-center md:w-1/2 text-black">
                <button
                    onClick={handleReadyButton}
                    className='px-8 py-4 m-4 w-3/4 bg-indigo-600 text-xl hover:bg-indigo-700 text-white rounded-full'
                >
                    Ready
                </button>
                {/* <button
                    onClick={handleStartGame}
                    className='px-8 py-4 m-4 w-3/4 bg-indigo-600 text-xl hover:bg-indigo-700 text-white rounded-full'
                >
                    Start Game
                </button> */}
            </div>
        </div>
    );
}

export default LobbyScreen;
