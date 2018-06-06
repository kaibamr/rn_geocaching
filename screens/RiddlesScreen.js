import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class RiddlesScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Wybór zagadek
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

export default RiddlesScreen;