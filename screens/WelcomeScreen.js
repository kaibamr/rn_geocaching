import React, { Component } from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Jakiś opis apki v1', color: '#03A9F4' },
	{ text: 'Jakiś opis apki v2', color: '#009688' },
	{ text: 'Jakiś opis apki v3 + logowanie', color: '#03A9F4' },
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