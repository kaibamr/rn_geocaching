import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class NewsScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
					<Text>Newsy</Text>
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

export default connect()(NewsScreen);