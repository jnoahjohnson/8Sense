import React, { useState } from 'react';

//Formated NameContext
const SenseContext = React.createContext();

const sensesData = [
    {
        name: 'Sound'
    },
    {
        name: 'Sight'
    },
    {
        name: 'Breath'
    },
    {
        name: 'Touch'
    },
    {
        name: 'Gratitude'
    },
    {
        name: 'Resonance'
    },
    {
        name: 'Ask'
    },
    {
        name: 'Atone'
    }
];

//Formated NameProvider
export const SenseProvider = ({ children }) => {
    const [timerState, setTimerState] = useState({ minutes: 2, seconds: 30 });
    const [senses, setSenses] = useState(sensesData);

    const setTimer = (minutes, seconds) => {
        setTimerState({ minutes, seconds });
    };

    return (
        <SenseContext.Provider value={{ timerState, setTimerState, senses }}>
            {children}
        </SenseContext.Provider >
    )
};

export default SenseContext;