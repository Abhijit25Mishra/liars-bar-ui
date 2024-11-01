import { Input } from "antd";
import Typography from "antd/es/typography/Typography";
import { useState, useEffect } from "react";
import { useSocket } from "@/providers/socketContextProvider";

const StartScreen = ({ setMainState }) => {
    const [name, setName] = useState();
    const [partyCode, setPartyCode] = useState();
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('joinParty', (roomData) => {
                setMainState({ view: 'LobbyScreen', roomData:roomData });
            })

            socket.on('userListUpdate', (users) => {
                // const names = users.map(user => user.name);
                setMainState({ usersList: users });
            })

            return () => {
                socket.off('createParty'); 
            };
        }
    }, [socket]);


    const handlePartyCodeChange = (e) => {
        if (e?.target?.value?.length <= 6) {
            setPartyCode(e?.target?.value?.replace(/[^0-9]/g, ''));
        }
    };

    const handleJoinParty = () => {
        setMainState({ userName: name });
        socket.emit('changeName', { newName: name });
        socket.emit('joinParty', { roomPassword: partyCode });
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-evenly">
            <Typography className="text-gray-200 text-5xl lg:text-9xl md:text-7xl">Liar's Bar</Typography>
            <div className="flex flex-col w-3/4 items-center md:w-1/2">
                
                <Input
                    size="large"
                    variant="borderless"
                    className='px-8 py-3 m-4 w-3/4 text-center bg-white text-2xl sm:text-4xl text-black rounded-full tracking-widest'
                    placeholder="Name"    
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <Input
                    size="large"
                    variant="borderless"
                    className='px-8 py-3 m-4 w-3/4 text-center bg-white text-2xl sm:text-4xl text-black rounded-full tracking-widest'
                    placeholder="Party Code"    
                    value={partyCode} 
                    onChange={handlePartyCodeChange} 
                />

                <button
                    onClick={handleJoinParty}
                    className='px-8 py-4 m-4 w-3/4 bg-indigo-600 text-xl hover:bg-indigo-700 text-white rounded-full'
                >
                    Join Party
                </button>
            </div>
        </div>
    );
}

export default StartScreen;
