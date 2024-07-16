import Constants from "../helpers/Constants";
import UserData from "../helpers/UserData";
import LocalManager from "../helpers/LocalManager";
import StorageKey from "../helpers/StorageKey";
import { Answers, Crashlytics } from 'react-native-fabric';

const Url = {
    homeData: 'HomeScreen',
    startScreen: 'StartScreen',
    register: 'customer/register',
    login: 'customer/login',
    getInfo: 'customer/GetInfo',
    forgotPassword: 'customer/ForgotPassword',
    productPicture: 'ProductPicture/{type}',
    productDetail: 'product/{id}/detail',
    product: 'product',
    productPictureDetail: 'ProductPicture/{id}/detail',
    uploadPicture: 'order/uploadpicture',
    checkPromotionCode: 'order/checkpromotioncode/{code}',
    order: 'order'
};

var token = '';
function getHeader() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'KhoanhKhacToken': token
    };
}

async function getToken() {
    if (!UserData.userName || !UserData.password) {
        UserData.userName = await LocalManager.get(StorageKey.UserName);
        UserData.password = await LocalManager.get(StorageKey.Password);
        if (!UserData.userName || !UserData.password) {
            UserData.userName = Constants.defaultAccount.userName;
            UserData.password = Constants.defaultAccount.password;
        }
    }

    Crashlytics.setUserName(UserData.userName);
    Crashlytics.setUserEmail(UserData.userName);
    Crashlytics.setUserIdentifier(UserData.userName);

    Answers.logCustom('UserStart', UserData.getLogAttributes());

    try {
        let response = await fetch(Constants.apiUrl + Url.login, {
            method: 'POST',
            headers: getHeader(),
            body: JSON.stringify({
                UserName: UserData.userName,
                Password: UserData.password
            })
        });
        let json = await response.json();
        console.log(JSON.stringify(json));
        if (json.Success) {
            token = json.Data.Token;
        } else {
            console.error(JSON.stringify(json.ErrorInfo));
        }
    } catch (error) {
        console.error(error);
    }
}

async function get(apiUrl, success: (data) => void, failure: (error) => void) {
    try {
        if (!token) {
            await getToken();
        }
        let response = await fetch(Constants.apiUrl + apiUrl, {
            method: 'GET',
            headers: getHeader(),
        });
        let json = await response.json();
        console.log(JSON.stringify(json));
        if (json.Success) {
            success(json.Data);
        } else {
            if (json.ErrorInfo.Code == '401') {
                await getToken();
                get(apiUrl, (d) => {
                    success(d);
                }, (e) => {
                    failure(e);
                })
            } else {
                console.error(JSON.stringify(json.ErrorInfo));
                failure(json.ErrorInfo);
            }
        }
    } catch (error) {
        console.error(error);
        failure({
            Code: '-1',
            MessageError: 'Không thể kết nối đến server!'
        });
    }
}

async function post(apiUrl, body, success: (data) => void, failure: (error) => void) {
    try {
        if (!token) {
            await getToken();
        }
        let response = await fetch(Constants.apiUrl + apiUrl, {
            method: 'POST',
            headers: getHeader(),
            body: JSON.stringify(body)
        });
        let json = await response.json();
        console.log(JSON.stringify(json));
        if (json.Success) {
            success(json.Data);
        } else {
            if (json.ErrorInfo.Code == '401') {
                await getToken();
                post(apiUrl, body, (d) => {
                    success(d);
                }, (e) => {
                    failure(e);
                })
            } else {
                console.error(JSON.stringify(json.ErrorInfo));
                failure(json.ErrorInfo);
            }
        }
    } catch (error) {
        console.error(error);
        failure({
            Code: '-1',
            MessageError: 'Không thể kết nối đến server!'
        });
    }
}

async function getHomeData(success: (data) => void, failure: (error) => void) {
    await get(Url.homeData, (data) => {
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function getStartScreen(success: (data) => void, failure: (error) => void) {
    await get(Url.startScreen, (data) => {
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function getProductPicture(type, success: (data) => void, failure: (error) => void) {
    await get(Url.productPicture.replace('{type}', type.toString()), (data) => {
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function getProductPictureDetail(id, success: (data) => void, failure: (error) => void) {
    await get(Url.productPictureDetail.replace('{id}', id.toString()), (data) => {
        Answers.logContentView(data.Name, 'ProductPictureDetail', data.ProductPictureID.toString(), UserData.getLogAttributes());
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function getProduct(success: (data) => void, failure: (error) => void) {
    await get(Url.product, (data) => {
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function getProductDetail(id, success: (data) => void, failure: (error) => void) {
    await get(Url.productDetail.replace('{id}', id.toString()), (data) => {
        Answers.logContentView(data.Name, 'ProductDetail', data.ProductID.toString(), UserData.getLogAttributes());
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function uploadPicture(body, success: (data) => void, failure: (error) => void) {
    await post(Url.uploadPicture, body, (data) => {
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function register(user, success: (data) => void, failure: (error) => void) {
    await post(Url.register, user, (data) => {
        LocalManager.set(StorageKey.UserName, user.UserName);
        LocalManager.set(StorageKey.Password, user.Password);
        UserData.userName = user.UserName;
        UserData.password = user.Password;
        token = '';
        Answers.logSignUp('AccountLogin', true, UserData.getLogAttributes());
        success(data);
    }, (error) => {
        Answers.logSignUp('AccountLogin', false, UserData.getLogAttributes());
        failure(error);
    });
}

async function login(userName, password, success: (data) => void, failure: (error) => void) {
    await post(Url.login, { UserName: userName, Password: password }, (data) => {
        LocalManager.set(StorageKey.UserName, userName);
        LocalManager.set(StorageKey.Password, password);
        UserData.userName = userName;
        UserData.password = password;
        token = '';
        Answers.logLogin('AccountLogin', true, UserData.getLogAttributes());
        success(data);
    }, (error) => {
        Answers.logLogin('AccountLogin', false, UserData.getLogAttributes());
        failure(error);
    });
}

async function getInfo(success: (data) => void, failure: (error) => void) {
    await post(Url.getInfo, {}, (data) => {
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function forgotPassword(email, success: (data) => void, failure: (error) => void) {
    await post(Url.forgotPassword, { Email: email }, (data) => {
        Answers.logCustom('ForgotPassword', UserData.getLogAttributes());
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function checkPromotionCode(code, success: (data) => void, failure: (error) => void) {
    await get(Url.checkPromotionCode.replace('{code}', code), (data) => {
        Answers.logCustom('CheckPromotionCode', { 'UserName': UserData.userName, 'Code': code });
        success(data);
    }, (error) => {
        failure(error);
    });
}

async function order(body, success: (data) => void, failure: (error) => void) {
    await post(Url.order, body, (data) => {
        body.ListOrderDetail.forEach((item) => {
            Answers.logPurchase(
                item.Price, 'VND', true,
                item.Name, item.Type.toString(),
                (item.IsProductPicture ? item.ProductPictureID : item.ProductID).toString(),
                UserData.getLogAttributes());
        });
        success(data);
    }, (error) => {
        Answers.logPurchase(
            item.Price, 'VND', false,
            item.Name, item.Type.toString(),
            (item.IsProductPicture ? item.ProductPictureID : item.ProductID).toString(),
            UserData.getLogAttributes());
        failure(error);
    });
}

export {
    getHomeData,
    getStartScreen,
    getProductPicture,
    getProductPictureDetail,
    getProduct,
    getProductDetail,
    uploadPicture,
    checkPromotionCode,
    forgotPassword,
    register,
    login,
    getInfo,
    order
};