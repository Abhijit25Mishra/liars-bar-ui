"use client"
import React, { useState } from 'react';

function Counter() {
    const [state, setState] = useState(0);

    const incrementButtonClick = () => {
        setState(state + 1);
    }

    const decrementButtonClick = () => {
        setState(state - 1);
    }

    return (
        <div>
            <div className='text-3xl'>counter = {state}</div>
            <div className='flex space-x-4 justify-center align-middle'>
                <button onClick={incrementButtonClick}>Increment</button>
                <button onClick={decrementButtonClick}>Decrement</button>
            </div>
        </div>
    );
}

export default Counter;
