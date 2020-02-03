import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage } from 'react-native';

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
        name: 'Let Go'
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

    const setStorage = async () => {
        try {
            await AsyncStorage.setItem('sensesItem', JSON.stringify(senses));
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }

    const getStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('sensesItem');
            return JSON.parse(value)
        } catch (error) {
            console.log(error)
        }
    }

    const mounted = useRef()

    useEffect(() => {
        if (!mounted.current) {
            const storedSensesData = getStorage()
            if (typeof storedSensesData !== 'object') {
                setSenses(storedSensesData)
            }
            mounted.current = true;
        } else {
            setStorage()
        }

    })

    return (
        <SenseContext.Provider value={{ timerState, setTimerState, senses, userTheme, setSenses }}>
            {children}
        </SenseContext.Provider >
    )
};

export default SenseContext;