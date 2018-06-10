import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import firebase from 'firebase';
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import RiddlesScreen from './screens/RiddlesScreen';
import ResumeScreen from './screens/ResumeScreen';
import NewsScreen from './screens/NewsScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
	constructor() {
		super();

		// NOTE: due to FIREBASE LOGIN
		console.ignoredYellowBox = [
			'Setting a timer'
		];
	}
	componentWillMount() {
		const config = {
			apiKey: "AIzaSyA141XWwqK4dgqhMcOaM_QX71wcwZVlKMs",
			authDomain: "geocachingnfc.firebaseapp.com",
			databaseURL: "https://geocachingnfc.firebaseio.com",
			projectId: "geocachingnfc",
			storageBucket: "geocachingnfc.appspot.com",
			messagingSenderId: "105311065421"
		};

		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		}
	}

  render() {
		const MainNavigator = createBottomTabNavigator({
			welcome: { screen: WelcomeScreen },
			auth: createBottomTabNavigator({
				Register: { screen: RegisterScreen },
				Login: { screen: LoginScreen }
			}, {
				navigationOptions: ({navigation}) => ({
					tabBarIcon: ({ focused, tintColor }) => {
						const { routeName } = navigation.state;
						let iconName;

						if (routeName === "Register") {
							iconName = `ios-person-add${focused ? '' : '-outline'}`;
						} else if (routeName === "Login") {
							iconName = `ios-person${focused ? '' : '-outline'}`;
						}
						return <Ionicons name={iconName} size={25} color={tintColor} />;
					}
				})
			}),
			main: {
				screen: createBottomTabNavigator({
					Resume: { screen: ResumeScreen },					
					Riddles: { screen: RiddlesScreen },
					Achievements: { screen: AchievementsScreen },
					News: { screen: NewsScreen },
				}, {
					navigationOptions: ({navigation}) => ({
						tabBarIcon: ({ focused, tintColor }) => {
							const { routeName } = navigation.state;
							let iconName;
							if (routeName === 'News') {
								iconName = `ios-paper${focused ? '' : '-outline'}`;
							} else if (routeName === 'Resume') {
								iconName = `ios-compass${focused ? '' : '-outline'}`;
							} else if (routeName === 'Achievements') {
								iconName = `ios-trophy${focused ? '' : '-outline'}`;
							} else if (routeName === 'Riddles') {
								iconName = `ios-bookmarks${focused ? '' : '-outline'}`;
							}
			
							// You can return any component that you like here! We usually use an
							// icon component from react-native-vector-icons
							return <Ionicons name={iconName} size={25} color={tintColor} />;
						},
					})
				})
			}
		}, {
			navigationOptions: {
				tabBarVisible: false
			},
			animationsAreEnabled: false
		});

    return (
        <Provider store={store}>
            <MainNavigator style={styles.container} />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
