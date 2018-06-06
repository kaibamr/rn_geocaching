import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class AchievementsScreen extends Component {
	render() {
		return (
			<View  style={styles.container}>
				<Text>
					Osiągnięcia....
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

export default AchievementsScreen;