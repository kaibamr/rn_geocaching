import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Slides from '../components/Slides';
import { loginUser } from '../actions/auth_actions';

const SLIDE_DATA = [
	{ text: 'Welcome in GeocachingApp!', color: '#03A9F4' },
	{ text: 'Want to explore? Just select riddle and go on!', color: '#670CE8' },
	{ text: 'Create an account and you are ready to go!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
	state = {
		email: null,
		password: null,
		loading: true
	}

	async componentWillMount() {
		//const email = await AsyncStorage.getItem('user_login');
		//const password = await AsyncStorage.getItem('user_password');
		const email = "wojtek229@o2.pl";
		const password = "wojtek229";

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
			this.props.navigation.navigate('News');
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