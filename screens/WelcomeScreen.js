import React, { Component } from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome in GeocachingApp!', color: '#03A9F4' },
	{ text: 'Want to explore? Just select riddle and go on!', color: '#670CE8' },
	{ text: 'Create an account and you are ready to go!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
	onSlidesComplete() {
		this.props.navigation.navigate('auth');
	}

	render() {
		return (
			<Slides
				data={SLIDE_DATA}
				onComplete={this.onSlidesComplete.bind(this)}
			/>
		);
	}
}

export default WelcomeScreen;