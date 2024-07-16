import { createStackNavigator } from 'react-navigation';
import Home from '../Home/Home';
import ProductPicture from '../ProductPicture/ProductPicture';
import Product from '../Product/Product';
import Detail from '../Detail/Detail';
import ProductDetail from '../ProductDetail/ProductDetail';
import Photos from '../Photos/Photos';
import Edit from '../Edit/Edit';
import EditFrame from '../EditFrame/EditFrame';
import EditCalendar from '../EditCalendar/EditCalendar';
import Cart from '../Cart/Cart';
import Account from '../Account/Account';
import Checkout from '../Checkout/Checkout';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {
  HomeScreen,
  ProductPictureScreen,
  ProductScreen,
  DetailScreen,
  ProductDetailScreen,
  PhotosScreen,
  EditScreen,
  EditFrameScreen,
  EditCalendarScreen,
  CartScreen,
  AccountScreen,
  CheckoutScreen,
  LoginScreen,
  RegisterScreen
} from '../../helpers/ScreenNames';

const navigationOptions = {
  header: null,
  gesturesEnabled: false
}

const MainNavigator = createStackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: navigationOptions
  },
  ProductPictureScreen: {
    screen: ProductPicture,
    navigationOptions: navigationOptions
  },
  ProductScreen: {
    screen: Product,
    navigationOptions: navigationOptions
  },
  DetailScreen: {
    screen: Detail,
    navigationOptions: navigationOptions
  },
  ProductDetailScreen: {
    screen: ProductDetail,
    navigationOptions: navigationOptions
  },
  PhotosScreen: {
    screen: Photos,
    navigationOptions: navigationOptions
  },
  EditScreen: {
    screen: Edit,
    navigationOptions: navigationOptions
  },
  EditFrameScreen: {
    screen: EditFrame,
    navigationOptions: navigationOptions
  },
  EditCalendarScreen: {
    screen: EditCalendar,
    navigationOptions: navigationOptions
  },
  CartScreen: {
    screen: Cart,
    navigationOptions: navigationOptions
  },
  AccountScreen: {
    screen: Account,
    navigationOptions: navigationOptions
  },
  CheckoutScreen: {
    screen: Checkout,
    navigationOptions: navigationOptions
  },
  LoginScreen: {
    screen: Login,
    navigationOptions: navigationOptions
  },
  RegisterScreen: {
    screen: Register,
    navigationOptions: navigationOptions
  }
});

export default MainNavigator;