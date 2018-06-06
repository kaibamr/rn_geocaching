import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
	renderLastSlide(index) {
		if (index === this.props.data.length - 1) {
			return (
				<Button
					title="Gotów!"
					onPress={this.props.onComplete}
					buttonStyle={styles.buttonStyle}
					iconLeft
					icon={
						<Icon
							name='location-on'
							size={15}
							color='white'
						/>
					}
				/>
			);
		}
	}

	renderView() {
		return this.props.data.map((slide, index) => (
			<View
				key={slide.text}
				style={[styles.slide, { backgroundColor: slide.color }]}
			>
				<Text style={styles.slideText}>{slide.text}</Text>
				{this.renderLastSlide(index)}
			</View>
		));
	}

	render() {
		return (
			<ScrollView
				horizontal
				pagingEnabled
				style={{ flex: 1 }}
			>
				{this.renderView()}
			</ScrollView>
		);
	}
}

const styles = {
	container: {
		flex: 1
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH
	},
	slideText: {
		fontSize: 30,
		color: '#FFFF',
		textAlign: 'center',
	},
	buttonStyle: {
		backgroundColor: '#0288D1',
		marginTop: 50,
		borderRadius: 5,
		width: 150
	}
};

export default Slides;
