import React from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import BackButton from '../components/BackButton';


const HomeScreen = ({ navigation }) => {
    return (
        <>
            <Layout style={styles.headerContainer}>
                <BackButton />
            </Layout>

            <Layout style={styles.bodyContainer}>
                <Text category='h1'>Are You Ready?</Text>
                <Button
                    onPress={() => navigation.navigate('Sense')}
                    style={styles.button}
                    status='basic'
                    size='giant'
                    textStyle={styles.buttonText}>
                    Start Now
                </Button>
            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 75
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80
    },
    mainImage: {
        height: 90,
        width: 300,
        marginBottom: 25
    },
    button: {
        marginTop: 20,
        width: 175
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '400'
    }
});

export default withNavigation(HomeScreen);