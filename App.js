import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AchievementsScreen from "./screens/AchievementsScreen";
import RiddlesScreen from "./screens/RiddlesScreen";
import ResumeScreen from "./screens/ResumeScreen";
import NewsScreen from "./screens/NewsScreen";
import AuthScreen from "./screens/AuthScreen";

export default class App extends React.Component {
  render() {
		const MainNavigator = createBottomTabNavigator({
			welcome: { screen: WelcomeScreen },
			auth: { screen: AuthScreen },
			main: {
				screen: createBottomTabNavigator({
					news: { screen: NewsScreen },
					riddles: { screen: RiddlesScreen },
					resume: { screen: ResumeScreen },
					achievements: { screen: AchievementsScreen }
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
