import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
  render() {
		const MainNavigator = createBottomTabNavigator({
			welcomeScreen: { screen: WelcomeScreen }
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
