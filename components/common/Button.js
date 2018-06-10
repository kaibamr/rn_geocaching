import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={onPress}
        >
            <Text style={styles.textStyle}>
              {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#39aee5',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#39aee5',
        marginLeft: 5,
        marginRight: 5
    }
}

export { Button };