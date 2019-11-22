import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { Layout, Text, Button, Select } from 'react-native-ui-kitten';
import Header from '../components/Header';
import SenseContext from '../context/SenseContext';

export default SettingsScreen = () => {
    const { timerState, setTimerState } = useContext(SenseContext);
    const [minutes, setMinutes] = useState({ text: timerState.minutes.toString() });
    const [seconds, setSeconds] = useState({ text: timerState.seconds.toString() });

    const [settingStatus, setSettingStatus] = useState(true);

    const timerLengthMinutes = [
        { text: '0' },
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
    ]

    const timerLengthSeconds = [
        { text: '0' },
        { text: '5' },
        { text: '10' },
        { text: '15' },
        { text: '20' },
        { text: '25' },
        { text: '30' },
        { text: '35' },
        { text: '40' },
        { text: '45' },
        { text: '50' },
        { text: '55' },
    ]

    useEffect(() => {
        if (minutes.text === timerState.minutes.toString() && seconds.text === timerState.seconds.toString()) {
            setSettingStatus(true);
        } else {
            setSettingStatus(false);
        }
    });

    return (
        <>
            <Header actionButton='close'>
                Settings
            </Header>

            <Layout style={styles.container}>


                <Text style={styles.settingHeader} category='h2'>Time per Sense</Text>
                <Layout style={styles.pickerContainer}>
                    <Layout style={styles.picker}>
                        <Select
                            data={timerLengthMinutes}
                            placeholder={minutes}
                            selectedOption={minutes}
                            onSelect={selectedOption => {
                                setMinutes(selectedOption)
                            }}
                        />
                        <Text style={styles.pickerLabel} category='h3'>Minutes</Text>
                    </Layout>

                    <Layout style={styles.picker}>
                        <Select
                            data={timerLengthSeconds}
                            placeholder={seconds}
                            selectedOption={seconds}
                            onSelect={selectedOption => {
                                setSeconds(selectedOption)
                            }}
                        />
                        <Text style={styles.pickerLabel} category='h3'>Seconds</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.saveButtonContainer}>
                    <Button
                        onPress={() => setTimerState({ minutes: minutes.text, seconds: seconds.text })}
                        status='basic'
                        style={styles.saveButton}
                        disabled={settingStatus}
                    >
                        Save
                    </Button>
                </Layout>

            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30
    },
    picker: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    pickerLabel: {
        alignSelf: 'center',
        marginTop: 10
    },
    settingHeader: {
        marginTop: 40
    },
    saveButtonContainer: {
        flex: 1,
        marginBottom: 30,
        justifyContent: 'flex-end'
    },
    saveButton: {

    }
});