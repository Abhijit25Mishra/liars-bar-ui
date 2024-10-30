import dynamic from 'next/dynamic';
import {  useReducer } from 'react';
import Counter from '@/components/Counter';

const StartScreen = dynamic(() => import('./StartScreen'), { ssr: false });
const CreatePartyScreen = dynamic(() => import('./CreatePartyScreen'), { ssr: false });
const JoinPartyScreen = dynamic(() => import('./JoinPartyScreen'), { ssr: false });

export default function Navigator() {
    const initialState = {
        view: 'StartScreen'
    };
    
    const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), { ...initialState });
    debugger;
    return (
        <>
            {state.view == 'StartScreen' && (   
                <StartScreen
                    setMainState={setState}
                />
            )}
            {state?.view == 'CreatePartyScreen' && (
                <>
                    {/* <Counter/>   */}
                    <CreatePartyScreen/>
                </>
            )}
            {state?.view == 'JoinPartyScreen' && (
                <JoinPartyScreen/>
            )}
        </>
    )
}
