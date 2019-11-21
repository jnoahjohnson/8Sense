import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-ui-kitten';

const CloseButton = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Icon name="close-outline" style={{ width: 40, height: 40 }} fill={'#e5e5e5'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: 'auto'
    }
});

export default withNavigation(CloseButton);