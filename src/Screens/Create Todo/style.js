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
        paddingTop: hp(5),
        paddingHorizontal: wp(5)
    },

    heading: {
        fontSize: wp(8),
        fontWeight: 'bold',
    },
    input: {
        marginTop: hp(3),
        borderWidth: wp(0.4),
        borderColor: AppColor.green,
        borderRadius: 15,
        paddingLeft: wp(3)
      },
      subHeading: {
        fontSize: wp(5),
        fontWeight: '700',
        top: hp(5)
    },
    btnStyle: {
        width: wp(70),
        height: hp(7.5),
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        top: hp(5),
        backgroundColor: AppColor.green,
      },
      btnText: {
        top: 0,
        textAlign: 'center',
        color: 'white'
      }


});

export {styles}