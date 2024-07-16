import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import { AccountScreen, CheckoutScreen } from '../../helpers/ScreenNames';
import CartList from './CartList';
import ActiveButton from '../common/Button/ActiveButton';
import WhiteButton from '../common/Button/WhiteButton';
import UserData from '../../helpers/UserData';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

export default class Cart extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.popToTop();
  }

  refresh = () => {
    this.setState({ totalPrice: UserData.totalPrice });
  }

  onCheckout = () => {
    let screen = AccountScreen;
    if(UserData.userName != Constants.defaultAccount.userName) {
      screen = CheckoutScreen;
    }
    this.props.navigation.navigate(screen);
  }


  constructor(props) {
    super(props);
    this.state = ({
      totalPrice: UserData.totalPrice
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title='GIỎ HÀNG'
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={() => { }} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <CartList refresh={this.refresh} />
            <View style={styles.bottomView}>
              <View style={{ height: 50, flexDirection: 'row' }}>
                <Text style={styles.productTotal}>Tổng tiền: </Text>
                <Text style={styles.productPrice}>{`${UserData.totalPrice.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}</Text>
              </View>
              <WhiteButton title='MUA THÊM' onPress={() => { this.props.navigation.popToTop(); }} />
              <View style={{ height: 20 }} />
              <ActiveButton title='ĐẶT HÀNG'
                onPress={this.onCheckout}
                disabled={UserData.cartItems.length === 0}
              />
            </View>
          </View>
          <View style={styles.line}>
          </View>
        </SafeAreaView>
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
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 0.2,
    backgroundColor: Colors.lightGray
  },
  bottomView: {
    padding: 20,
    paddingBottom: 30,
    marginTop: -220,
    width: Constants.screenWidth,
    backgroundColor: 'rgba(247, 247, 247, 0.7)'
  },
  productPrice: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    alignSelf: 'center',
    color: Colors.activeLabel
  },
  productTotal: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'left',
    color: Colors.darkGray
  }
});
