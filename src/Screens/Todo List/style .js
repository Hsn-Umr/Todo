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
    cardStyle: {
        flex: 1,
        borderBottomColor: AppColor.grayDivider,
        borderBottomWidth: 0.7,
        width: wp(100),
        paddingVertical: hp(3),
        paddingHorizontal: wp(3)
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
});

export { styles }