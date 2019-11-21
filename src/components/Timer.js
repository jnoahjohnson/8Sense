import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SenseContext from "../context/SenseContext";
import { Icon, Text } from 'react-native-ui-kitten';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Timer = ({ nextSense, previousSense, showBackButton, isLastSense }) => {
    //Setup the State and Context
    const { timerState } = useContext(SenseContext);
    const [time, setTime] = useState(timerState);
    const [isPaused, setPauseState] = useState(false);
    //const beep = new Audio.Sound();

    //Component setup
    useEffect(() => {
        startTimer();

        return function cleanup() {
            stopTimer();
        }
    }, []);

    playSound = () => {
        console.log('BEEP!');
    }

    getTime = () => {
        minutes = time.minutes;
        seconds = time.seconds;

        //Set the new seconds
        if (seconds === 0 && minutes === 0 && !isPaused) {
            goToNextSense();
            return (timerState);
        } else if (seconds === 0 && !isPaused) {
            seconds = "60";
            if (minutes != 0) {
                minutes--;
            };
        } else if (!isPaused) {
            seconds--;
        }

        return { minutes, seconds };
    }

    stopTimer = () => {
        clearInterval(timer);
    }

    startTimer = () => {
        timer = setInterval(() => {
            setTime(getTime());
        }, 1000);
    }

    timerButton = () => {
        setPauseState(isPaused ? false : true);
    }

    previousSenseButton = () => {
        setTime(timerState);
        previousSense();
    }

    goToNextSense = () => {
        playSound();
        setTime(timerState);
        isLastSense ? stopTimer() : null;
        stopTimer();
        nextSense();
        startTimer();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.timerText} category='h1'>{time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</Text>
            <View style={styles.buttonContainer}>
                {showBackButton
                    ? <TouchableOpacity onPress={() => previousSenseButton()}>
                        <Icon name="arrow-ios-back-outline" style={styles.controlIcons} visible={showBackButton} fill={'#e5e5e5'} />
                    </TouchableOpacity>
                    : <View style={{ width: 50 }} />}

                <TouchableOpacity onPress={() => timerButton()}>
                    <Icon name={isPaused ? "play-circle-outline" : "pause-circle-outline"} style={styles.playIcon} fill={'#e5e5e5'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => goToNextSense()}>
                    <Icon name="arrow-ios-forward-outline" style={styles.controlIcons} fill={'#e5e5e5'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerText: {
        marginTop: 'auto',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 40
    },
    playIcon: {
        width: 80,
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    controlIcons: {
        width: 50,
        height: 50,
        marginTop: 20
    }
});