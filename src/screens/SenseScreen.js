import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Layout } from 'react-native-ui-kitten';
import Timer from '../components/Timer';
import SenseContext from "../context/SenseContext";
import Header from '../components/Header';

const SenseScreen = ({ headerText, navigation }) => {
    const { senses } = useContext(SenseContext);
    const [currentSenseIndex, setCurrentSenseIndex] = useState(0);
    const [currentSense, setCurrentSense] = useState(senses[currentSenseIndex]);

    nextSense = () => {
        newIndex = currentSenseIndex + 1;
        if (newIndex < senses.length) {
            setCurrentSenseIndex(newIndex);
        } else {
            finishMeditation();
        }
    }

    previousSense = () => {
        newIndex = currentSenseIndex - 1;
        setCurrentSenseIndex(newIndex);
    }

    finishMeditation = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        setCurrentSense(senses[currentSenseIndex]);
    });

    return (
        <>
            <Header actionButton='close' >
                {currentSense.name}
            </Header>

            <Layout style={styles.bodyContainer}>
                <Timer
                    nextSense={() => nextSense()}
                    previousSense={() => previousSense()}
                    showBackButton={currentSenseIndex === 0 ? false : true}
                    isLastSense={currentSenseIndex === senses.length - 1 ? true : false}
                    initialSense={currentSenseIndex === 0 ? true : false}
                />
            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        flex: 1
    },
});

export default withNavigation(SenseScreen);