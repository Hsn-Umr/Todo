import * as React from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import asyStorage from '../../LocalStorage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/AuthReducer';
import { useSelector } from 'react-redux';
import AppColor from '../../Theme/colors';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ApiSerivces from '../../ApiServices';


function Logout({ navigation }) {
  const { AuthReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      asyStorage.getValueFromLocalStorage('Token', res => {
        console.log(res);
        let token = res;
        ApiSerivces.userLogout(
          token,
          res => {
            console.log('user register response ', res);
            if (res.isSuccess == false) {
              Alert.alert('', 'Please check your internet connection');
              navigation.navigate('MyTabs');
            } else {
              console.log('user resgister response-success', res);
              if (res.response.success == false) {
                Alert.alert('', `${res.response.message}`);
              } else {
                asyStorage.setValueFromLocalStorage('USER', false);
                dispatch(loginSuccess(!AuthReducer.user));

              }
            }
          },
        );
      })

    });

    return unsubscribe;
  }, []);




  return <View style={{ backgroundColor: AppColor.white, flex: 1 }}>
    <ActivityIndicator style={{ marginTop: heightPercentageToDP('40%') }} size="large" color={AppColor.green} />
  </View>
}

export { Logout };
