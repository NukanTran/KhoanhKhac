import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import CategoryList from "./CategoryList";
import Indicator from '../common/Indicator';
import { getHomeData, getStartScreen } from '../../networking/API';
import { ProductPictureScreen, ProductScreen, CartScreen } from '../../helpers/ScreenNames';
import UserData from '../../helpers/UserData';
import MenuType from '../../helpers/MenuType';
import LocalManager from '../../helpers/LocalManager';
import StorageKey from '../../helpers/StorageKey';
import IntroList from './IntroList';
import {
  View,
  SafeAreaView,
  Alert,
  StyleSheet
} from 'react-native';

export default class Home extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.openDrawer();
  }

  onTopBarRightPress = () => {
    this.props.navigation.navigate(CartScreen);
  }

  loadData = () => {
    this.setRefreshing(true);
    getHomeData((data) => {
      UserData.homeData = data;
      this.setRefreshing(false);
    }, (error) => {
      this.setRefreshing(false);
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });
  }

  loadIntro = () => {
    this.setState({ refreshing: true });
    getStartScreen((data) => {
      this.setState({ intros: data.ListAdvertisements, refreshing: false });
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });
  }

  onRefresh = () => {
    this.loadData();
  }

  onSelectedItem = (item) => {
    if (item.Type == MenuType.accessory) {
      this.props.navigation.navigate(ProductScreen, item);
    } else {
      this.props.navigation.navigate(ProductPictureScreen, item);
    }
  }

  hideIntro = async () => {
    await LocalManager.set(StorageKey.IsViewIntro, 'true');
    this.setState({ isViewIntro: true });
  }

  setRefreshing = (value) => {
    this.setState({ refreshing: value });
    if (this.list) {
      this.list.setRefreshing(false);
    }
  }

  constructor(props) {
    super(props);
    this.state = ({
      data: {},
      intros: [],
      refreshing: false,
      isViewIntro: false,
    });
  }

  renderIntro = () => {
    if (!this.state.isViewIntro) {
      return (
        <View style={{ flex: 1, position: 'absolute', backgroundColor: '#fff' }}>
          <IntroList data={this.state.intros} hideIntro={this.hideIntro} />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title="KHOẢNH KHẮC"
          leftImage={require('../../assets/icon/menu.png')}
          rightImage={require('../../assets/icon/cart.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={this.onTopBarRightPress} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <CategoryList
              ref={(ref) => { this.list = ref; }}
              data={UserData.homeData}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              onPressItem={this.onSelectedItem}
            />
          </View>
          <View style={styles.line}>
          </View>
        </SafeAreaView>
        {
          this.renderIntro()
        }
        {
          this.state.refreshing ? <Indicator /> : null
        }
      </View>
    );
  }

  async componentWillMount() {
    const isViewIntro = await LocalManager.get(StorageKey.IsViewIntro);
    if (!isViewIntro || isViewIntro != 'true') {
      this.loadIntro();
    }
    this.setState({ isViewIntro: isViewIntro && isViewIntro == 'true' });
    this.loadData();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 0.2,
    backgroundColor: Colors.lightGray
  },
});
