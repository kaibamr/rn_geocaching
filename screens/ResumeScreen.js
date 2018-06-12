import React, { Component } from 'react';
import { Text, View, StyleSheet, CardSection } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Constants, MapView, Location, Permissions } from 'expo';
import { setPosition } from '../actions/geo_actions';
import { riddlesFetch,  setCurrentStep, setCompleted } from '../actions/riddles_actions';
import riddles from "../reducers/riddles_reducer";

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
		this.props.riddlesFetch();
	}


	_handleMapRegionChange = mapRegion => {
		this.setState({mapRegion});
	};

	_getLocationAsync = async () => {
		let {status} = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				locationResult: 'Permission to access location was denied',
			});
		} else {
			this.setState({hasLocationPermissions: true});
		}

		Location.watchPositionAsync({enableHighAccuracy: true, distanceInterval: 1}, (location) => {
			this.setState({locationResult: JSON.stringify(location)});
			this.setState({
				mapRegion: {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}
			});
			this.props.setPosition({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			});
			// console.log('latitude ', this.props.latitude);
			// console.log('longitude ', this.props.longitude);
			// console.log('Dystans: ', (this.distance(this.props.latitude, this.props.longitude, 50.289557, 18.680221) * 1000));
			this.isInRadius();
		});
		// console.log(this.props.riddlesMapped);
	};

	isInRadius() {
		if (this.props.riddlesMapped && this.props.riddlesMapped.length > 0 && this.props.currentStep != null && this.props.latitude != 0 && this.props.longitude != 0) {
			_.map(this.props.riddlesMapped,(riddle) => {
				if (riddle.id == this.props.currentRiddle) {
					_.map(riddle, (part) => {
						if (part.id == this.props.currentStep) {
							if (this.distance(this.props.latitude, this.props.longitude, part.latitude, part.longitude) < 300) {
								console.log('jesteś kurwa na miejscu');
								if ((parseInt(this.props.currentStep) + 1) <= riddle.parts) {
									this.props.setCurrentStep((parseInt(this.props.currentStep) + 1));
								} else {
									console.log("Zagadka skonczona!");
									this.props.setCompleted(riddle.id);
									this.props.setCurrentStep((parseInt(this.props.currentStep) + 1));
								}
							} else {
								console.log('nie ma cie kurwa na miejscu');
							}
						}
					});
				}
			});
		}
	}

	distance(lat1, lon1, lat2, lon2) {
		const p = 0.017453292519943295;    // Math.PI / 180
		const c = Math.cos;
		const a = 0.5 - c((lat2 - lat1) * p) / 2 +
			c(lat1 * p) * c(lat2 * p) *
			(1 - c((lon2 - lon1) * p)) / 2;
		console.log('odleglosc ',  12742 * Math.asin(Math.sqrt(a)) * 1000);
		return (12742 * Math.asin(Math.sqrt(a))) * 1000; // 2 * R; R = 6371 km
	}

	renderRiddleInfo() {
		return this.props.riddlesMapped.length !== 0 ? this.props.riddlesMapped.map((riddle) => {
			if (this.props.currentRiddle == riddle.id) {
				return (
					<Text>
						Current Riddle: {riddle.description}
					</Text>
				);
			}
		}) : null;
	}

	render() {
		return (
			<View style={styles.container}>
				{
					this.state.locationResult === null ?
						<Text>Finding your current location...</Text> :
						this.state.hasLocationPermissions === false ?
							<Text>Location permissions are not granted.</Text> :
							this.state.mapRegion === null ?
								<Text>Map region doesn't exist.</Text> :
								<MapView
									style={{alignSelf: 'stretch', height: 400}}
									region={this.state.mapRegion}
									onRegionChange={this._handleMapRegionChange}
									showsMyLocationButton={true}
									showsUserLocation={true}
								/>
				}
				<View>
					{this.props.riddlesMapped && this.props.riddlesMapped.length !== 0 ? this.props.riddlesMapped.map((riddle) => {
						if (this.props.currentRiddle == riddle.id) {
							return (
								<View key={riddle.id}>
									<View>
										<Text>
											Current Riddle: { riddle.description }
										</Text>
										<View>
											{_.map(riddle,(part) => {
												if (part.description && part.id < this.props.currentStep) {
													return (
														<Text key={part.id}>
															- { part.description } (completed)
														</Text>
													);
												}
											})}
											<Text>Actual step: </Text>
											{_.map(riddle,(part) => {
												if (part.description && part.info && part.id == this.props.currentStep) {
													return (
														<View key={part.id}>
															<Text>
																Tip: { part.info }
															</Text>
														</View>
													);
												}
											})}
										</View>
									</View>
								</View>
							);
						}
					}) : null // spinner
					}
				</View>
			</View>
		);
	}
}


const styles = {
	map: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
	},
	riddleInfo: {
	}
};

function mapStateToProps({ geo,  riddles}) {
	const riddlesMapped = _.map(riddles.riddles, (val) => {
		return { ...val };
	});

	return {
		latitude: geo.latitude,
		longitude: geo.longitude,
		currentRiddle: riddles.currentRiddle,
		currentStep: riddles.currentStep,
		riddlesMapped
	};
}

export default connect(mapStateToProps, { setPosition, riddlesFetch,  setCurrentStep, setCompleted })(ResumeScreen);