import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Slides from '../components/Slides';
import { loginUser } from '../actions/auth_actions';

const SLIDE_DATA = [
	{ text: 'Witaj w  GeocachingApp!', color: '#03A9F4' },
	{ text: 'Chcesz przeżyć przygodę?', color: '#670CE8' },
	{ text: 'Stwórz konto i startuj!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
	state = {
		email: null,
		password: null,
		loading: true
	}

	async componentWillMount() {
		const email = await AsyncStorage.getItem('user_login');
		const password = await AsyncStorage.getItem('user_password');
		// in case of logout
		// const email = undefined;
		// const password = undefined;
		if (email && password) {
			this.props.loginUser(email, password);
			if(this.props.autoLoginFail) {
				this.props.navigation.navigate('auth');
			}
			this.setState({
				email,
				password,
				loading: this.props.loading
			});
			this.props.navigation.navigate('Newsy');
		} else {
			this.setState({
				email: null,
				password: null,
				loading: false
			});
		}
	}

	onSlidesComplete() {
		this.props.navigation.navigate('auth');
	}

	render() {
		if (this.state.loading) {
			return (
				<ActivityIndicator size="large" color="#0288D1" style={styles.spinner}/>
			);
		}

		return (
			<Slides
				data={SLIDE_DATA}
				onComplete={this.onSlidesComplete.bind(this)}
			/>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		autoLoginFail: auth.autoLoginFail,
		loading: auth.loading
	};
}

const styles = {
	spinner: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
	}
};


export default connect(mapStateToProps, { loginUser })(WelcomeScreen);