import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodoList, Logout, CreateTodo } from '../Screens';
import AppColor from '../Theme/colors';
import avatar from '../assets';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { StyleSheet, View, Image } from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let buttonColor;
          buttonColor = focused && AppColor.barSelect;
          if (route.name === 'List') {
            
          } else if (route.name === 'Logout') {
            iconName = avatar.Logout;
          }
          return (
            <View
              style={
                styles.bottomBarTabStyle
              }>
              <Image
                source={iconName}
                style={
                  focused ? styles.iconStyleActive : styles.iconStyleDeactive
                }
              />
            </View>
          );
        },
        style: styles.tabBarOptionStyle,
        labelStyle: styles.tabBarLableStyle,
        activeTintColor: AppColor.white,
        inactiveTintColor: AppColor.barSelect,
        keyboardHidesTabBar: true,
      })}>
      <Tab.Screen name="Todo List" component={TodoList} />
      <Tab.Screen name="Add New" component={CreateTodo} state={'bottom'} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
}
export { MyTabs }

const styles = StyleSheet.create({
  bottomBarTabStyle: {
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: widthPercentageToDP(1),
    height: heightPercentageToDP(5),
    justifyContent: 'center',
  },
  iconStyleDeactive: {
    height: heightPercentageToDP(3),
    width: widthPercentageToDP(5),
    resizeMode: 'contain',
  },
  iconStyleActive: {
    height: heightPercentageToDP(3),
    width: widthPercentageToDP(5),
    resizeMode: 'contain',
  },
  tabBarOptionStyle: {
    backgroundColor: AppColor.white,
    height: heightPercentageToDP('10%'),
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarLableStyle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: AppColor.gray,
    bottom: heightPercentageToDP('0.5%'),
  },
});