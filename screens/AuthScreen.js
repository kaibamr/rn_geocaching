import React, { Component } from 'react';
import {Dimensions, View} from 'react-native';
import { Button, Card, Input, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Card title="Rejestracja">
					<View>
						<Input
							placeholder='Email'
							leftIcon={{ type: 'font-awesome', name: 'envelope' }}
						/>
						<Input
							placeholder='Hasło'
							leftIcon={{ type: 'font-awesome', name: 'unlock' }}
						/>
					</View>
					<View style={{ marginTop: 50 }}>
						<Button
							iconLeft
							leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
							title='Zarejestruj'
							style={{
								backgroundColor: '#0288D1',
								borderRadius: 5
							}}
						/>
					</View>
				</Card>
			</View>
		);
	}
};

const styles = {
	container: {
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'center',
		width: SCREEN_WIDTH
	}
};
export default AuthScreen;