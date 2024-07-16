import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import { HomeScreen, DetailScreen, CartScreen } from '../../helpers/ScreenNames';
import BreadCrumb from '../common/BreadCrumb';
import UserData from '../../helpers/UserData';
import { order } from '../../networking/API';
import Indicator from '../common/Indicator';
import Address from './Address';
import Payment from './Payment';
import Confirm from './Confirm';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  StyleSheet
} from 'react-native';

export default class Checkout extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.navigate(CartScreen);
  }

  onAddress = () => {
    this.slider && this.slider.scrollToIndex({ animated: true, index: 0 });
    this.setState({ tabs: [true, false, false] });
  }

  onPayment = () => {
    this.slider && this.slider.scrollToIndex({ animated: true, index: 1 });
    this.setState({ tabs: [true, true, false] });
  }

  onConfirm = () => {
    this.slider && this.slider.scrollToIndex({ animated: true, index: 2 });
    this.setState({ tabs: [true, true, true] });
  }

  onSubmit = () => {
    this.setState({ refreshing: true });
    var body = {
      CustomerID: UserData.id,
      NameBuy: UserData.fullName,
      EmailBuy: UserData.email,
      PhoneBuy: UserData.phoneNumber,
      AddressBuy: UserData.address,
      Note: '',
      NameRe: UserData.fullName,
      EmailRe: UserData.email,
      PhoneRe: UserData.phoneNumber,
      AddressRe: UserData.address,
      Total: UserData.totalPrice,
      PromotionCodeID: UserData.promotion.PromotionCodeID,
      ListOrderDetail: []
    };
    UserData.cartItems.forEach((item) => {
      body.ListOrderDetail.push({
        Token: item.token,
        IsProductPicture: item.isProductPicture,
        ProductPictureID: item.isProductPicture ? item.product.ProductPictureID : null,
        ProductID: !item.isProductPicture ? item.product.ProductID : null,
        Price: item.product.Price,
        Quantity: item.count,
        Name: item.product.Name,
        Type: item.product.Type
      });
    });
    // console.error(body);
    order(body, (data) => {
      UserData.cartItems = [];
      UserData.totalPrice = 0.0;
      this.setState({ refreshing: false });
      Alert.alert('THÀNH CÔNG', data.MessageSuccess,
        [
          { text: 'OK', onPress: () => { this.props.navigation.popToTop(); }, style: 'cancel' }
        ],
        { cancelable: false });
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });
  }

  setRefreshing = (value) => {
    this.setState({ refreshing: value });
  }

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      tabs: [
        true,
        false,
        false
      ]
    });
  }

  renderView = (index) => {
    switch (index) {
      case 0:
        return (<Address onNext={this.onPayment} setRefreshing={this.setRefreshing} />);
      case 1:
        return (<Payment onNext={this.onConfirm} />);
      case 2:
        return (<Confirm onAddress={this.onAddress} onPayment={this.onPayment} onSubmit={this.onSubmit} setRefreshing={this.setRefreshing} />)
      default:
        return (<View />);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title='ĐẶT HÀNG'
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={() => { }} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: Constants.screenWidth / 3 + 30 / 3, zIndex: 3 }}>
                <BreadCrumb index='1' title='Địa chỉ' onPress={this.onAddress} disabled={!this.state.tabs[0]} hideLeft={true} />
              </View>
              <View style={{ width: Constants.screenWidth / 3 + 30 / 3, zIndex: 2, marginLeft: -15 }}>
                <BreadCrumb index='2' title='Thanh toán' onPress={this.onPayment} disabled={!this.state.tabs[1]} />
              </View>
              <View style={{ flex: 1, zIndex: 1, marginLeft: -15 }}>
                <BreadCrumb index='3' title='Xác nhận' onPress={this.onConfirm} disabled={!this.state.tabs[2]} />
              </View>
            </View>
            <FlatList
              ref={(ref) => { this.slider = ref; }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              scrollEnabled={false}
              pagingEnabled={true}
              data={this.state.tabs}
              removeClippedSubviews={true}
              scrollEventThrottle={16}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return this.renderView(index);
              }}
            />
          </View>
          <View style={styles.line} />
        </SafeAreaView>
        {
          this.state.refreshing ? <Indicator /> : null
        }
      </View>
    );
  }

  componentWillMount() {

  }

  componentDidMount() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  line: {
    height: 0.3,
    backgroundColor: Colors.lightGray
  }
});
