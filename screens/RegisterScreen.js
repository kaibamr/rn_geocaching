import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Dimensions, View, Text} from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { emailChanged, passwordChanged, registerUser } from '../actions/auth_actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegisterScreen extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onRegisterPress() {
		const { email, password } = this.props;
		this.props.registerUser({ email, password });
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if (props.email && props.password && props.loggedIn) {
			this.props.navigation.navigate('News');
		}
	}

	renderButton() {
		if	(this.props.loading) {
			return (
				<Button
					loading
					loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
					style={{
						backgroundColor: '#0288D1',
						borderRadius: 5
					}}
				/>
			);
		} else {
			return (
				<Button
					iconLeft
					leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
					title='Start new adventure!'
					style={{
						backgroundColor: '#0288D1',
						borderRadius: 5
					}}
					onPress={() => this.onRegisterPress()}
				/>
			);
		}
	}

	renderError() {
		if(this.props.error) {
			return (
				<Text>{this.props.error}</Text>
			);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Card title="Create an account">
					<View>
						<Input
							placeholder='Email'
							leftIcon={{ type: 'font-awesome', name: 'envelope' }}
							value={this.props.email}
							onChangeText={this.onEmailChange.bind(this)}
						/>
						<Input
							placeholder='Password'
							leftIcon={{ type: 'font-awesome', name: 'unlock' }}
							value={this.props.password}
							onChangeText={this.onPasswordChange.bind(this)}
						/>
					</View>
					<View style={{ marginTop: 10}}>
						{this.renderError()}
					</View>
					<View style={{ marginTop: 10 }}>
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
		email: auth.email,
		password: auth.password,
		loading: auth.loading,
		error: auth.error,
		loggedIn: auth.loggedIn
	};
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, registerUser })(RegisterScreen);