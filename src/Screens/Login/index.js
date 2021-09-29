import React from 'react';
import { View, Text, TextInput, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import AppColor from '../../Theme/colors';
import { styles } from './style';
import ApiSerivces from '../../ApiServices';
import asyStorage from '../../LocalStorage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/AuthReducer';
import { useSelector } from 'react-redux';

function Login() {
  const { AuthReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState();
  const [loading, setLoading] = React.useState(false);

  /// To Validate Email Format ///
  const validate = text => {
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      setValid(false);
    } else {
      setEmail(text);
      setValid(true);
      console.log('email is Correct');
    }
  };
  ////////

  /// OnPress Register ///
  const onLoginPress = async () => {

    setLoading(true);
    if (email == '' && password == '') {
      Alert.alert('', 'Please enter a valid email and password');
      setLoading(false);
    } else if (email == '') {
      Alert.alert('', 'Please enter a valid email');
      setLoading(false);
    } else if (password == '') {
      Alert.alert('', 'Please enter a valid password');
      setLoading(false);
    } else if (valid == false) {
      Alert.alert('', 'Please enter a valid email');
      setLoading(false);
    } else {
      ApiSerivces.userLogin(
        email,
        password,
        res => {
          console.log('user register response ', res);
          setLoading(false);
          if (res.isSuccess == false) {
            Alert.alert('', 'Please enter a valid email and password');
          } else {
            setLoading(false);
            console.log('user resgister response-success', res);
            if (res.response.success == false) {
              Alert.alert('', `${res.response.error}`);
            } else {
              asyStorage.setValueFromLocalStorage('UserId', res.response.user.id);
              asyStorage.setValueFromLocalStorage('Token', res.response.user.token);
              asyStorage.setValueFromLocalStorage('USER', true);
              dispatch(loginSuccess(!AuthReducer.user));
            }
          }
        },
      );
    }
  };
  ////////////

  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => validate(text)}
        onEndEditing={() => {
          {
            valid ? null : Alert.alert('', 'email is Not Correct');

          }
        }}
        value={email}
        placeholder="Email Address"
        keyboardType={'email-address'}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableHighlight
        mode="contained"
        style={styles.btnStyle}
        activeOpacity={0.8}
        underlayColor={AppColor.black}
        onPress={onLoginPress}
      >
        {loading ? (
          <ActivityIndicator size="small" color={AppColor.white} />
        ) : (
          <Text style={[styles.subHeading, styles.btnText]}> Login </Text>
        )}
      </TouchableHighlight>
    </View>
  );
}
export { Login };
