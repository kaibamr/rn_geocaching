import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import RiddlesScreen from './screens/RiddlesScreen';
import ResumeScreen from './screens/ResumeScreen';
import NewsScreen from './screens/NewsScreen';
import AuthScreen from './screens/AuthScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
  render() {
		const MainNavigator = createBottomTabNavigator({
			welcome: { screen: WelcomeScreen },
			auth: { screen: AuthScreen },
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
