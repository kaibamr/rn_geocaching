import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome in GeocachingApp!', color: '#03A9F4' },
	{ text: 'Want to explore? Just select riddle and go on!', color: '#670CE8' },
	{ text: 'Create an account and you are ready to go!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
	state = {
		token: null
	}

	async componentWillMount() {
		const token = await AsyncStorage.getItem('firebase_token');

		if (token) {
			this.props.navigation.navigate('news');
			this.setState({ token });
		} else {
			this.setState({ token: false });
			console.log('brak tokenu');
		}
	}

	onSlidesComplete() {
		this.props.navigation.navigate('auth');
	}

	render() {
		if (_.isNull(this.state.token)) {
			return <AppLoading />
		}

		return (
			<Slides
				data={SLIDE_DATA}
				onComplete={this.onSlidesComplete.bind(this)}
			/>
		);
	}
}

export default WelcomeScreen;