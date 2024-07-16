import { createDrawerNavigator } from 'react-navigation';
import { MainNavigatorScreen } from './helpers/ScreenNames';
import MainNavigator from './components/common/MainNavigator';
import DrawerScreen from './components/common/DrawerScreen';


const DrawerNavigator = createDrawerNavigator(
  {
    MainNavigatorScreen: {
      screen: MainNavigator
    }
  }, {
    initialRouteName: MainNavigatorScreen,
    contentComponent: DrawerScreen,
    drawerWidth: 300
  }
);

export default DrawerNavigator;
