import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { styles } from './style';
import Avatar from '../../assets';
import AppColor from '../../Theme/colors';


function Welcome({navigation}) {
  return (
    <View style={styles.body}>
      <Image source={Avatar.welcomeImg}
        style={styles.imgStyle}
      />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>Manage your tasks</Text>
        <Text style={styles.subHeading}>seamlessly & intuitively</Text>

      </View>
      <View style={styles.btnContainer}>
            <TouchableHighlight
              mode="contained"
              style={styles.btnStyle}
              activeOpacity={0.8}
              underlayColor={AppColor.black}
              onPress={ () => navigation.navigate('Login') }
              >
                <Text style={[styles.subHeading, styles.btnText]}> Sign in </Text>
            </TouchableHighlight>
            <TouchableHighlight
              mode="contained"
              style={styles.btnOutlineStyle}
              activeOpacity={0.8}
              underlayColor={AppColor.green}
              onPress={ () => navigation.navigate('Register') }
              >
                <Text style={[styles.subHeading, styles.btnText, {color: AppColor.black}]}> Create an account </Text>
            </TouchableHighlight>
          </View>

    </View>
  );
}
export { Welcome };
