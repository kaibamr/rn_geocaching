import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class AuthScreen extends Component {
	render() {
		return (
			<View>
				<Text>
					Autoryzacja
				</Text>
				<Button
					title='Testowo póki nie ma autoryzacji'
					large
					onPress={() => this.props.navigation.navigate('news')}
				/>
			</View>
		);
	}
};

export default AuthScreen;