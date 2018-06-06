import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ResumeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Mapa + Opis zagadki w której jest użytkownik
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

export default ResumeScreen;