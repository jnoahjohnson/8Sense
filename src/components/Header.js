import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';
import CloseButton from './CloseButton';
import SettingsButton from './SettingsButton';


export default Header = ({ actionButton, children }) => {

    return (
        <Layout style={styles.headerContainer}>
            <Text category='h1'>{children}</Text>
            {actionButton === 'close' ? <CloseButton /> : <SettingsButton />}
        </Layout>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#346666',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: .25,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 1,
    }
})