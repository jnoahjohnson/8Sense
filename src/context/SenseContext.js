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
    const [userTheme, setUserTheme] = useState('dark');

    const setTimer = (minutes, seconds) => {
        setTimerState({ minutes, seconds });
    };

    const toggleUserTheme = () => {
        const nextTheme = userTheme === 'dark' ? 'light' : 'dark';
        setUserTheme(nextTheme);
    }

    return (
        <SenseContext.Provider value={{ timerState, setTimerState, senses, userTheme, setSenses }}>
            {children}
        </SenseContext.Provider >
    )
};

export default SenseContext;