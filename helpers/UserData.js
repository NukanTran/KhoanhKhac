import { Platform } from 'react-native';

export default class UserData {
    static id = 0;
    static userName = '';
    static fullName = '';
    static email = '';
    static phoneNumber = '';
    static address = '';
    static province = '';
    static district = '';
    static password = '';
    static cartItems = [];
    static totalPrice = 0.0;
    static promotion = {};

    static addCartItem = (item) => {
        if (UserData.cartItems == null) {
            UserData.cartItems = [item];
        } else {
            UserData.cartItems.push(item);
        }
    }

    static removeCartItem = (index) => {
        if (index < UserData.cartItems.length) {
            UserData.cartItems.splice(index, 1);
        }
    }

    static homeData = {
        ListMenus: [],
        ListAdvertisements: [],
        ListMainMenus: [],
        Contact: {}
    }

    static getLogAttributes = () => {
        return { 
            'UserName': UserData.userName,
            'OS': Platform.OS
        };
    }
};