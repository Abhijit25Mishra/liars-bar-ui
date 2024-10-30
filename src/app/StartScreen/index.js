import Typography from "antd/es/typography/Typography";

const StartScreen = ({ setMainState }) => {
    const handleCreateParty = () => {
        setMainState({ view: 'CreatePartyScreen' });
    };

    const handleJoinParty = () => {
        setMainState({ view: 'CreatePartyScreen' });
    };

    return (
        <div className="flex flex-col w-full h-screen items-center justify-evenly">
            <Typography className="text-gray-200 text-5xl lg:text-9xl md:text-7xl">Liar's Bar</Typography>
            <div className="flex flex-col w-3/4 items-center md:w-1/2">
                <button
                    onClick={handleCreateParty}
                    className='px-8 py-4 m-4 w-3/4 bg-indigo-600 text-xl hover:bg-indigo-700 text-white rounded-full'
                >
                    Create Party
                </button>
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
