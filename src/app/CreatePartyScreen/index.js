import { Input } from "antd";
import Typography from "antd/es/typography/Typography";
import { CopyOutlined, CopyFilled } from "@ant-design/icons";

const StartScreen = ({ setMainState }) => {
    const valueToCopy = "123456"; // The value you want to copy

    const handleCreateParty = () => {
        setMainState({ view: 'LobbyScreen' });
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(valueToCopy)
            .then(() => {
                console.log("Value copied to clipboard:", valueToCopy);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <div className="flex flex-col w-full h-screen items-center justify-evenly">
            <Typography className="text-gray-200 text-6xl lg:text-9xl md:text-8xl">Liar's Bar</Typography>
            <div className="flex flex-col w-3/4 items-center md:w-1/2 text-black">
                <div
                    onClick={handleCopyToClipboard}
                    className='flex items-center justify-between bg-white text-4xl rounded-full cursor-pointer px-4 py-4 md:py-6 m-4 w-3/4' // Match button size
                >
                    {valueToCopy.split("").map((char, index) => (
                        <Typography
                            key={index}
                            className="flex-1 text-2xl md:text-3xl lg:text-4xl  text-center" // Flex-grow to distribute space evenly
                        >
                            {char}
                        </Typography>
                    ))}
                    <CopyFilled className="ml-2" /> {/* Add margin to the icon for spacing */}
                </div>

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

export default StartScreen;
