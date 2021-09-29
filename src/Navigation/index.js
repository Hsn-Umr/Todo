import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {
  Welcome,
  Register,
  Login, 
  ViewUpdateTodo
} from '../Screens';
import {useSelector} from 'react-redux';
import { MyTabs } from './BottomTab'

export default function Navigation({userState}) {
   const {user} = useSelector(state => state.AuthReducer);
  const Stack = createStackNavigator();
  console.log("nav " + user)
  const authScreens = {
    Welcome: Welcome,
    Register: Register,
    Login: Login,
  };

  const userScreens = {
    MyTabs: MyTabs,
  };
  const commonScreens = {
    ViewUpdateTodo:   ViewUpdateTodo,
  };
  

  return (
    <Stack.Navigator screenOptions={{ animationEnabled: true, headerShown: false }}>
      {Object.entries({
        ...(user ? userScreens : authScreens),
        ...commonScreens,
      }).map(([name, component]) => {
        console.log('name', name);
        return (
          <Stack.Screen 
          options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} 
          key={component} name={name} component={component} />
        );
      })}
    </Stack.Navigator>
  );
}
