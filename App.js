import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import store from './src/Redux';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Navigation from './src/Navigation';
import asyStorage from './src/LocalStorage';
import { loginSuccess } from './src/Redux/AuthReducer';
import { Splash } from './src/Screens';
import { SafeAreaView, StatusBar } from 'react-native';
import AppColor from './src/Theme/colors';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={AppColor.white} />
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigationContainer />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

function AppNavigationContainer() {
  const { dispatch } = store;
  const [loading, setLoading] = useState(true);

  const { user } = useSelector(state => state.AuthReducer);
  console.log('navigationContainer', user);
  React.useEffect(() => {
    asyStorage.getValueFromLocalStorage('USER', res => {
      setTimeout(() => {
        dispatch(loginSuccess(res));
        setLoading(false);
        console.log("run")
      }, 1000);
    });
  }, []);

  if (loading == true) {
    return <Splash />;
  } else {
    return <Navigation userState={user} />;
  }
}
