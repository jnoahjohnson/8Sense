import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-ui-kitten';

const BackButton = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Icon name="arrow-left" style={{ width: 30, height: 30, color: '#e5e5e5' }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginRight: 'auto'
    }
});

export default withNavigation(BackButton);