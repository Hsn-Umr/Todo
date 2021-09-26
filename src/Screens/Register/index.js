import React from 'react';
import { View, Text, TextInput, TouchableHighlight,  ActivityIndicator, Alert } from 'react-native';
import AppColor from '../../Theme/colors';
import { styles } from './style';
import ApiSerivces from '../../ApiServices';

function Register({navigation}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
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

  //// for navigating to Login Page ///////
  const navToLogin = (msg) =>
  Alert.alert(
    "",
    `${msg}`,
    [
      { text: "OK", onPress: () => navigation.navigate('Login') }
    ]
  );
/////////

  /// OnPress Register ///
  const onRegisterPress = async () => {

    setLoading(true);
    if (email == '' && password == '' && confirmPassword == '') {
      Alert.alert('','Please enter a valid email and password');
      setLoading(false);
    } else if (email == '') {
      Alert.alert('','Please enter a valid email');
      setLoading(false);
    } else if (password == '') {
      Alert.alert('','Please enter a valid password');
      setLoading(false);
    } else if (confirmPassword == '') {
      Alert.alert('','Please enter a valid confirm password');
      setLoading(false);
    }
    else if (valid == false) {
      Alert.alert('','Please enter a valid email');
      setLoading(false);
    } else {
      ApiSerivces.userRegistration(
        email,
        password,
        confirmPassword,
        res => {
          console.log('user register response ', res);
          setLoading(false);
          if (res.isSuccess == false) {
            Alert.alert('','Please enter a valid email and password');
          } else {
            setLoading(false);
            console.log('user resgister response-success', res);
            if(res.response.success == false) {
              Alert.alert('',`${res.response.error}`);
            } else {
             navToLogin(res.response.message);
            }
          }
        },
      );
    }
  };
  ////////////

  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => validate(text)}
        onEndEditing={() => {
          {
            valid ? null : Alert.alert('','email is Not Correct');

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
      <TextInput
        style={styles.input}
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <TouchableHighlight
        mode="contained"
        style={styles.btnStyle}
        activeOpacity={0.8}
        underlayColor={AppColor.black}
        onPress={onRegisterPress}
      >
        {loading ? (
          <ActivityIndicator size="small" color={AppColor.white} />
        ) : (
          <Text style={[styles.subHeading, styles.btnText]}> Register </Text>
        )}
      </TouchableHighlight>
    </View>
  );
}
export { Register };
