import { StyleSheet } from 'react-native';
import AppColor from "../../Theme/colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({

    body: {

        backgroundColor: AppColor.white,
        flex: 1,
    },
    imgStyle: {
        alignSelf: 'center',
        top: hp(10),
        height: hp(30),
        width: wp(50),
    },
    textContainer: {
        paddingHorizontal: wp(5),
        paddingVertical: hp(10)
    },
    heading: {
        fontSize: wp(8),
        fontWeight: 'bold',
    },
    subHeading: {
        fontSize: wp(5),
        fontWeight: '700',
        top: hp(5)
    },
    btnContainer: {
        paddingVertical: hp(5),
    },
    btnStyle: {
        width: wp(70),
        height: hp(7.5),
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: AppColor.green,
      },
      btnOutlineStyle: {
        width: wp(70),
        height: hp(7.5),
        top: hp(3),
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: AppColor.green,
        borderWidth: wp(0.7),
      },
      btnText: {
        top: 0,
        textAlign: 'center',
        color: 'white'
      }

});

export {styles}