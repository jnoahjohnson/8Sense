import React, { useContext, useState } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { Layout, Text, Button } from 'react-native-ui-kitten';
import Header from '../components/Header';
import SenseContext from '../context/SenseContext';

export default SettingsScreen = () => {
    const { timerState, setTimerState } = useContext(SenseContext);
    const [timerSetting, setTimerSetting] = useState(timerState);

    return (
        <>
            <Header actionButton='close'>
                Settings
            </Header>

            <Layout style={styles.container}>


                <Text style={styles.settingHeader} category='h2'>Time per Sense</Text>
                <Layout style={styles.pickerContainer}>
                    <Layout style={styles.picker}>
                        <Picker
                            selectedValue={timerSetting.minutes}
                            style={styles.pickerStyle}
                            onValueChange={(minutes) => {
                                setTimerSetting({ minutes, seconds: timerSetting.seconds })
                            }
                            }
                        >
                            <Picker.Item label="0" value={0} />
                            <Picker.Item label="1" value={1} />
                            <Picker.Item label="2" value={2} />
                            <Picker.Item label="3" value={3} />
                            <Picker.Item label="4" value={4} />
                            <Picker.Item label="5" value={5} />
                        </Picker>
                        <Text style={styles.pickerLabel} category='h3'>Minutes</Text>
                    </Layout>

                    <Layout style={styles.picker}>
                        <Picker
                            selectedValue={timerSetting.seconds}
                            style={styles.pickerStyle}
                            onValueChange={(seconds) => {
                                setTimerSetting({ minutes: timerSetting.minutes, seconds })
                            }
                            }
                        >
                            <Picker.Item label="0" value={0} />
                            <Picker.Item label="5" value={5} />
                            <Picker.Item label="10" value={10} />
                            <Picker.Item label="15" value={15} />
                            <Picker.Item label="20" value={20} />
                            <Picker.Item label="25" value={25} />
                            <Picker.Item label="30" value={30} />
                            <Picker.Item label="35" value={35} />
                            <Picker.Item label="40" value={40} />
                            <Picker.Item label="45" value={45} />
                            <Picker.Item label="50" value={50} />
                            <Picker.Item label="55" value={55} />
                        </Picker>
                        <Text style={styles.pickerLabel} category='h3'>Seconds</Text>
                    </Layout>

                </Layout>

                <Layout style={styles.saveButtonContainer}>
                    <Button
                        onPress={() => setTimerState({ minutes: timerSetting.minutes, seconds: timerSetting.seconds })}
                        status='basic'
                        style={styles.saveButton}>
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
        alignItems: 'center'
    },
    picker: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    pickerLabel: {
        alignSelf: 'center'
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