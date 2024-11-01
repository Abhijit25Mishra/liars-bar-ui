import { Input } from "antd";
import { useState, useEffect } from "react";
import Typography from "antd/es/typography/Typography";
import { useSocket } from "@/providers/socketContextProvider";
import openNotification from "@/components/commons/notificationUtils";

const CreatePartyScreen = ({ setMainState }) => {
    const [name, setName] = useState(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('createParty', (roomData) => {
                setMainState({ view: 'LobbyScreen', roomData:roomData });
            })

            return () => {
                socket.off('createParty'); 
            };
        }
    }, [socket]);

    const handleCreateParty = () => {
        if (name && socket) {
            setMainState({ userName: name });
            socket.emit('changeName', { newName: name });
            socket.emit('createParty')
        }
        else {
            const notificationMessage = (name ? {title:"Error", description:"Socket Connection has not been established correctly"}
                : { title: "Error", description: "Name cannot be empty" });
            openNotification(true,notificationMessage)();
        }
    };


    return (
        <div className="flex flex-col w-full h-screen items-center justify-evenly">
            <Typography className="text-gray-200 text-6xl lg:text-9xl md:text-8xl">Liar's Bar</Typography>

            <div className="flex flex-col w-3/4 items-center md:w-1/2 ">

                <Input
                    size="large"
                    variant="borderless"
                    className='px-8 py-3 m-4 w-3/4 text-center bg-white text-2xl sm:text-4xl text-black rounded-full tracking-widest'
                    placeholder="Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />

                <button
                    onClick={handleCreateParty}
                    className='px-8 py-4 m-4 w-3/4 bg-indigo-600 text-xl hover:bg-indigo-700 text-white rounded-full'
                >
                    Create Party
                </button>
            </div>
        </div>
    );
}

export default CreatePartyScreen;
