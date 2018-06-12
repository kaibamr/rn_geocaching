import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { getProfile } from '../actions/profile_actions';
import { Card, Button } from 'react-native-elements';
import _ from 'lodash';

import Ionicons from 'react-native-vector-icons/Ionicons';

class ProfileScreen extends Component {
	state = {
		loading: true
    }
    
    componentWillMount() {
		this.props.getProfile();
		setTimeout(() => {
			this.setState({
				loading: this.props.loading
			});
		}, 1500);
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
				<View>
                    <View style={styles.imageWrapper}>
                        <Image source={require('../assets/profile.png')} style={{width: 125, height: 140}} />
                    </View>
                    <Text style={styles.nickname}>{this.props.profile.nickname}</Text>
                    <Text style={styles.points}>Total Points: {this.props.profile.totalPoints}</Text>
                    <Button title="Log Out" buttonStyle={{marginTop: 15}}></Button>
                </View>
			</View>
		);
	}
};

const styles = {
	container: {
	  marginTop: 15,
      marginBottom: 15,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
	},
	spinner: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
    },
    card: {
        textAlign: 'center'
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nickname: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
        marginTop: 15,
        textAlign: 'center'
    },
    points: {
        fontSize: 18,
        padding: 15,
        textAlign: 'center'
    }
};

function mapStateToProps({ profile }) {
	return {
		loading: profile.loading,
		profile: profile.profile
	};
}

export default connect(mapStateToProps, { getProfile })(ProfileScreen);