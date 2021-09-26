import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import AppColor from '../../Theme/colors';

function Splash() {
  return (
    <View style={{ backgroundColor: AppColor.white, flex: 1 }}>
    <ActivityIndicator style={{ marginTop: heightPercentageToDP('40%') }} size="large" color={AppColor.green} />
  </View>
  );
}
export {Splash};
