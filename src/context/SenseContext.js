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
  const [senses, setSensesState] = useState([]);
  const [userTheme, setUserTheme] = useState('dark');

  const setTimer = (minutes, seconds) => {
    setTimerState({minutes, seconds});
  };

  const toggleUserTheme = () => {
    const nextTheme = userTheme === 'dark' ? 'light' : 'dark';
    setUserTheme(nextTheme);
  };

  const resetSenses = () => {
    setSenses(sensesData);
  };

  const setSenses = async data => {
    setSensesState(data);

    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
      console.log('set Data');
      initializeSenses();
    } catch (e) {
      console.log('Error while saving: ', e);
    }
  };

  const saveData = async () => {
    console.log('Empty function, saveData');
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
    console.log('Initial Senses: ', senses);
    if (senses.length === 0) {
      console.log('senses are empty');
      setSensesState(sensesData);
      console.log('Senses', senses);
    }

    try {
      console.log('initial data : ', senses);
      const data = await AsyncStorage.getItem('@storage_Key');
      console.log('Data', data);
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
        resetSenses,
      }}>
      {children}
    </SenseContext.Provider>
  );
};

export default SenseContext;
