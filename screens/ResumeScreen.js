import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Constants, MapView, Location, Permissions } from 'expo';
import { setPosition } from '../actions/geo_actions';

class ResumeScreen extends Component {
	state = {
		mapRegion: {
			longitude: 18.67658,
			latitude: 50.29761,
			longitudeDelta: 0.09,
			latitudeDelta: 0.09
		},
		hasLocationPermissions: false,
		locationResult: null,
		firstRender: false
	};

	componentDidMount() {
		this._getLocationAsync();
	}

	_handleMapRegionChange = mapRegion => {
		console.log(mapRegion);
		this.setState({ mapRegion });
	};

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
			});
		} else {
			this.setState({ hasLocationPermissions: true });
		}

		Location.watchPositionAsync({ enableHighAccuracy: true, distanceInterval: 1}, (location) => {
			this.setState({ locationResult: JSON.stringify(location)});
			this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
			this.props.setPosition({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
		});
	};

	handlePositionChange() {
		this.setState({ locationResult: location });
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>
					Pan, zoom, and tap on the map!
				</Text>

				{
					this.state.locationResult === null ?
						<Text>Finding your current location...</Text> :
						this.state.hasLocationPermissions === false ?
							<Text>Location permissions are not granted.</Text> :
							this.state.mapRegion === null ?
								<Text>Map region doesn't exist.</Text> :
								<MapView
									style={{ alignSelf: 'stretch', height: 400 }}
									region={this.state.mapRegion}
									onRegionChange={this._handleMapRegionChange}
									showsMyLocationButton={true}
									showsUserLocation={true}
								/>
				}

				<Text>
					Location: {this.state.locationResult}
				</Text>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#34495e',
	},
});

function mapStateToProps({ geo }) {
	return {
		latitude: geo.latitude,
		longitude: geo.longitude
	};
}

export default connect(mapStateToProps, { setPosition })(ResumeScreen);