import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import SenseContext from '../context/SenseContext';
import {Icon, Text} from 'react-native-ui-kitten';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default Timer = ({
  nextSense,
  previousSense,
  showBackButton,
  isLastSense,
  initialSense,
}) => {
  //Setup the State and Context
  const {timerState} = useContext(SenseContext);
  const [time, setTime] = useState(timerState);
  const [isPaused, setPauseState] = useState(false);
  //const beep = new Audio.Sound();

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  //Component setup
  useEffect(() => {
    startTimer();

    if (initialSense) {
      setPauseState(true);
    }

    var Sound = require('react-native-sound');
    Sound.setCategory('Playback');

    sound = new Sound('chime.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          sound.getDuration() +
          'number of channels: ' +
          sound.getNumberOfChannels(),
      );
    });

    return function cleanup() {
      stopTimer();
    };
  }, []);

  playSound = () => {
    console.log('BEEP!');
    // Play the sound with an onEnd callback
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  getTime = () => {
    minutes = time.minutes;
    seconds = time.seconds;

    //Set the new seconds
    if (seconds === 0 && minutes === 0 && !isPaused) {
      goToNextSense();
      return timerState;
    } else if (seconds === 0 && !isPaused) {
      seconds = '59';
      if (minutes != 0) {
        minutes--;
      }
    } else if (!isPaused) {
      seconds--;
    }

    return {minutes, seconds};
  };

  stopTimer = () => {
    clearInterval(timer);
  };

  startTimer = () => {
    timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
  };

  timerButton = () => {
    setPauseState(isPaused ? false : true);
  };

  previousSenseButton = () => {
    setTime(timerState);
    previousSense();
  };

  goToNextSense = () => {
    playSound();
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
    setTime(timerState);
    isLastSense ? stopTimer() : null;
    stopTimer();
    nextSense();
    startTimer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText} category="h1">
        {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </Text>
      <View style={styles.buttonContainer}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => previousSenseButton()}>
            <Icon
              name="arrow-left"
              style={styles.controlIcons}
              visible={showBackButton}
              fill={'#e5e5e5'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactHeavy', options);
              setTime(timerState);
            }}>
            <Icon
              name="reload"
              style={{
                ...styles.controlIcons,
                marginRight: 10,
              }}
              fill={'#e5e5e5'}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            timerButton();
            console.log('pressed Play/Pause');
          }}>
          <Icon
            strokeWidth=".1"
            name={isPaused ? 'control-play' : 'control-pause'}
            style={styles.playIcon}
            fill={'#e5e5e5'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goToNextSense()}>
          <Icon
            name="arrow-right"
            style={styles.controlIcons}
            fill={'#e5e5e5'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    marginTop: 'auto',
    paddingTop: 150,
    fontSize: 100,
    ...Platform.select({
      ios: {
        fontWeight: '200',
      },
      android: {
        fontFamily: 'sans-serif-light',
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 70,
  },
  playIcon: {
    width: 60,
    height: 60,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    color: '#e5e5e5',
  },
  controlIcons: {
    width: 60,
    height: 60,
    marginTop: 20,
    color: '#e5e5e5',
  },
});
