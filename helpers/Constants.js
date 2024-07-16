import { Dimensions, Platform } from 'react-native'

export default {
    defaultAccount: {
        userName: 'admin',
        password: '@@123'
    },
    apiUrl: 'http://api.khoanhkhac.vn/api/',
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    screenRatio: Dimensions.get('window').height/Dimensions.get('window').width,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    regEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};