import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Layout } from 'react-native-ui-kitten';

const SettingsButton = ({ navigation }) => {
    return (
        <Layout style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
            >
                <Icon name="settings-2-outline" style={{ width: 40, height: 40, }} fill={'#e5e5e5'} />
            </TouchableOpacity>
        </Layout>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: 'auto'
    }
});

export default withNavigation(SettingsButton);