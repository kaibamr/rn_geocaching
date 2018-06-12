import React, { Component } from 'react';
import { Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { getNews } from '../actions/news_actions';
import { Card, Button } from 'react-native-elements';
import _ from 'lodash';

class NewsScreen extends Component {
	state = {
		loading: true
	}

	componentWillMount() {
		this.props.getNews();
		setTimeout(() => {
			this.setState({
				loading: this.props.loading
			});
		}, 2500);
	}

	renderNews() {
		const news = _.values(this.props.news);
		return news.map((item) => {
			return (
				<Card title={item.title} key={item.id}>
					<Text>
						{item.description}
					</Text>
				</Card>
			);
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles.spinner}>
					<ActivityIndicator size="large" color="#0288D1"/>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				{this.renderNews()}
				<Button title='elo' onPress={ async() => {
					await AsyncStorage.setItem('user_login', undefined);
					await AsyncStorage.setItem('user_password', undefined);
					console.log('weszlo');
				}} />
			</View>
		);
	}
};

const styles = {
	container: {
	  marginTop: 15,
	  marginBottom: 15
	},
	spinner: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
	}
};

function mapStateToProps({ news }) {
	return {
		loading: news.loading,
		news: news.news
	};
}

export default connect(mapStateToProps, { getNews })(NewsScreen);