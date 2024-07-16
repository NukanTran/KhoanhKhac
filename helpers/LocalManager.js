import { AsyncStorage } from "react-native"

export default class LocalManager {

    static get = async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static set = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}