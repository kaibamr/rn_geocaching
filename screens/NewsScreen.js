import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getNews } from '../actions/news_actions';
import { Card } from 'react-native-elements';
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
		setTimeout(() => {
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
		}, 300);
	}

	render() {
		if (this.loading) {
			return (
				<ActivityIndicator size="large" color="#0288D1" style={styles.spinner}/>
			);
		} else {
			return (
				<View style={styles.container}>
					{this.renderNews()}
				</View>
			);
		}

		return (
			<ActivityIndicator size="large" color="#0288D1" style={styles.spinner}/>
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