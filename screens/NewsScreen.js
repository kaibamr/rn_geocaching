import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
class NewsScreen extends Component {
	render() {
		return (
			<View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1}}>
				<Button title='Wyczyść storage' onPress={()=> { AsyncStorage.setItem('firebase_token', null); }}/>
			</View>
		);
	}
};

export default NewsScreen;