import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import {Dimensions, View} from 'react-native';
import { Button, Card, Input, Icon } from 'react-native-elements';
import { emailChanged, passwordChanged, loginUser } from '../actions/auth_actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onRegisterPress() {
		const { email, password } = this.props.auth;
		this.props.loginUser({ email, password });
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if (props.token) {
			this.props.navigation.navigate('news');
		}
	}

	renderButton() {
		if (this.props.loading) {
			return <AppLoading />
		} else {
			return (
				<Button
					iconLeft
					leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
					title='Zarejestruj'
					style={{
						backgroundColor: '#0288D1',
						borderRadius: 5
					}}
					onPress={() => this.onRegisterPress()}
				/>
			);
		}
	}

	render() {


		return (
			<View style={styles.container}>
				{this.renderView()}
				<Card title="Rejestracja">
					<View>
						<Input
							placeholder='Email'
							leftIcon={{ type: 'font-awesome', name: 'envelope' }}
							value={this.props.auth.email}
							onChangeText={this.onEmailChange.bind(this)}
						/>
						<Input
							placeholder='Hasło'
							leftIcon={{ type: 'font-awesome', name: 'unlock' }}
							value={this.props.auth.password}
							onChangeText={this.onPasswordChange.bind(this)}
						/>
					</View>
					<View style={{ marginTop: 50 }}>
						{this.renderButton()}
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

function mapStateToProps({ auth }) {
	return {
		token: auth.token,
		loading: auth.loading,
		auth
	};
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(AuthScreen);