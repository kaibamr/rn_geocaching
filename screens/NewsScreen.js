import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getNews } from '../actions/news_actions';
import { Card } from 'react-native-elements';
import _ from 'lodash';

class NewsScreen extends Component {
	componentWillMount() {
		this.props.getNews();
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
		if (this.props.loading) {
			return (
				<ActivityIndicator size="large" color="#0288D1"/>
			);
		}

		return (
			<View style={styles.container}>
				{this.renderNews()}
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

function mapStateToProps({ news }) {
	return {
		loading: news.loading,
		news: news.news
	};
}

export default connect(mapStateToProps, { getNews })(NewsScreen);