import { StyleSheet } from "react-native";
import AppColor from '../../Theme/colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.white,
    },
    header: {
        backgroundColor: AppColor.white,
        fontSize: hp('4%'),
        fontWeight: '500',
        textAlign: 'center',
        paddingTop: hp(3),
        borderBottomWidth: wp(0.5),
        borderBottomColor: AppColor.gray
    },
    cardStyle: {
        flex: 1,
        paddingTop: hp(3),
        borderBottomColor: AppColor.grayDivider,
        borderBottomWidth: 0.7,
        width: wp(100),
        paddingVertical: hp(3),
        paddingHorizontal: wp(3),
        backgroundColor: AppColor.white
    },
    headingStyle: {
        fontSize: hp('4%'),
        fontWeight: 'bold',
        color: AppColor.green
    },
    titleStyle: {
        fontSize: hp('4%'),
        fontWeight: '500',
        marginLeft: wp(8)
    },
    descriptionStyle: {
        fontSize: hp('3%'),
        alignSelf: 'center',
        marginHorizontal: wp(2)
    },
    textStyle: {
        textAlign: 'center',
        marginTop: hp(15)
    },
    input: {
        marginTop: hp(3),
        borderWidth: wp(0.4),
        borderColor: AppColor.green,
        borderRadius: 15,
        paddingLeft: wp(3)
      },
});

export { styles }