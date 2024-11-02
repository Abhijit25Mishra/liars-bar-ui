import dynamic from 'next/dynamic';
import { useEffect, useReducer } from 'react';
import { useSocket } from '@/providers/socketContextProvider';


const StartScreen = dynamic(() => import('../components/liarsBar/StartScreen'), { ssr: false });
const CreatePartyScreen = dynamic(() => import('../components/liarsBar/CreatePartyScreen'), { ssr: false });
const JoinPartyScreen = dynamic(() => import('../components/liarsBar/JoinPartyScreen'), { ssr: false });
const LobbyScreen = dynamic(() => import('../components/liarsBar/LobbyScreen'), { ssr: false });
const GameRoomScreen= dynamic(() => import('../components/liarsBar/GameRoomScreen'), { ssr: false });

export default function Navigator() {
    const initialState = {
        view: 'StartScreen'
    };
    
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), { ...initialState });
    
    console.log(state, 'state');

    return (
        <>
            {state.view == 'StartScreen' && (   
                <StartScreen
                    setMainState={setState}
                />
            )}
            {state?.view == 'CreatePartyScreen' && (
                <CreatePartyScreen
                    setMainState={setState}
                />
            )}
            {state?.view == 'JoinPartyScreen' && (
                <JoinPartyScreen
                    setMainState={setState}
                />
            )}
            {state?.view == 'LobbyScreen' && (
                
                <LobbyScreen
                    setMainState={setState}
                    roomData={state?.roomData}
                    userName={state?.userName}
                    usersList={state?.usersList}
                />
            )}
            {state?.view == 'GameRoomScreen' && (
                <GameRoomScreen
                    setMainState={setState}
                    roomData={state?.roomData}
                    userName={state?.userName}
                    usersList={state?.usersList}
                />
            )}
        </>
    )
}
