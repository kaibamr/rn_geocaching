import React, { Component } from 'react';
import { Text, View } from 'react-native';

class NewsScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Jakies newsy.. (albo coś innego?)
				</Text>
			</View>
		);
	}
};

const styles = {
	container: {
	  marginTop: 15,
	  marginBottom: 15
	}
};

export default NewsScreen;