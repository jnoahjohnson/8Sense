import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

//Formated NameContext
const SenseContext = React.createContext();

const sensesData = [
  {
    name: 'Sound',
  },
  {
    name: 'Sight',
  },
  {
    name: 'Breath',
  },
  {
    name: 'Touch',
  },
  {
    name: 'Gratitude',
  },
  {
    name: 'Resonance',
  },
  {
    name: 'Ask',
  },
  {
    name: 'Let Go',
  },
];

//Formated NameProvider
export const SenseProvider = ({children}) => {
  const [timerState, setTimerState] = useState({minutes: 2, seconds: 30});
  const [senses, setSensesState] = useState(sensesData);
  const [userTheme, setUserTheme] = useState('dark');

  const setTimer = (minutes, seconds) => {
    setTimerState({minutes, seconds});
  };

  const toggleUserTheme = () => {
    const nextTheme = userTheme === 'dark' ? 'light' : 'dark';
    setUserTheme(nextTheme);
  };

  const setSenses = data => {
    setSensesState(data);
    saveData();
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(sensesData));
      console.log('set Data');
    } catch (e) {
      console.log('Error while saving: ', e);
    }
  };

  const dataIsDifferent = data => {
    if (senses.length !== data.length) {
      return true;
    }

    for (let i = 0; i < senses.length; i++) {
      if (senses[i].name !== data[i].name) {
        return true;
      }
    }

    return false;
  };

  const initializeSenses = async () => {
    try {
      console.log('initial data : ', senses);
      const data = await AsyncStorage.getItem('@storage_Key');
      if (data !== null) {
        if (dataIsDifferent(data)) {
          setSensesState(JSON.parse(data));
          console.log('Data was different', senses);
        }
        console.log('Data was not different ', senses);
      } else {
        console.log('No data found');
      }
    } catch (e) {
      console.log('Error: 1', e);
    }
  };

  useEffect(() => {
    initializeSenses();
  }, []);

  //   const setStorage = async () => {
  //     try {
  //       await AsyncStorage.setItem('key', JSON.stringify(senses));
  //     } catch (error) {
  //       // Error saving data
  //       console.log(error);
  //     }

  //     await AsyncStorage.getItem('key', (err, item) => {
  //       console.log(item, 'test');
  //     });
  //   };

  //   const setSensesState = async () => {
  //     let value = null;
  //     try {
  //       await AsyncStorage.getItem('key', (err, item) => {
  //         value = item;
  //         console.log(item, 'item');
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     if (typeof value === 'string' && value !== '[]') {
  //       setSenses(JSON.parse(value));
  //     } else {
  //       setSenses(sensesData);
  //     }
  //   };

  //   const mounted = useRef();

  //   useEffect(() => {
  //     if (!mounted.current) {
  //       setSensesState();
  //       mounted.current = true;
  //     } else {
  //     }

  //     return () => {
  //       setStorage();
  //       console.log('setting storage');
  //     };
  //   });

  return (
    <SenseContext.Provider
      value={{
        timerState,
        setTimerState,
        senses,
        userTheme,
        setSenses,
      }}>
      {children}
    </SenseContext.Provider>
  );
};

export default SenseContext;
