import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
	container: {
	  marginTop: 15,
	  marginBottom: 15
	}
});

export default NewsScreen;