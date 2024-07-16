import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import UserData from '../../helpers/UserData';
import TopBar from "../common/TopBar";
import Indicator from '../common/Indicator';
import ProductDetailBanner from './ProductDetailBanner';
import ActiveButton from '../common/Button/ActiveButton';
import { CartScreen } from '../../helpers/ScreenNames';
import { getProductDetail } from '../../networking/API';
import { Answers } from 'react-native-fabric';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class ProductDetail extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  onTopBarRightPress = () => {

  }

  loadData = (id, type) => {
    this.setState({ refreshing: true });
    getProductDetail(id, (data) => {
      data.Type = type;
      data.ProductPictureID = data.ProductID;
      const slideShows = [
        {
          ProductSlideShowID: 1,
          Name: "sample string 2",
          Image: data.Image
        }
      ];
      this.setState({ product: data, slideShows: slideShows, refreshing: false });
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });

  }

  addToCart = () => {
    UserData.addCartItem({ product: this.state.product, isProductPicture: false });
    UserData.totalPrice += this.state.product.Price;
    Answers.logAddToCart(this.state.product.Price, 'VND',
      this.state.product.Name,
      this.state.product.Type.toString(),
      this.state.product.ProductID.toString(),
      UserData.getLogAttributes());
    this.props.navigation.navigate(CartScreen);
  }

  constructor(props) {
    super(props);
    this.state = ({
      product: {},
      slideShows: [],
      refreshing: false
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={this.onTopBarRightPress} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView>
              <ProductDetailBanner data={this.state.slideShows} />
              <View style={styles.content}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {this.state.product.Name}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.productDiscount}>
                      {this.state.product.Discount ? `${this.state.product.Price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ` : ''}
                    </Text>
                    <Text style={styles.productPrice}>
                      {`${this.state.product.Discount ? this.state.product.PriceDiscount : this.state.product.Price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}
                    </Text>
                  </View>
                </View>
                {/* <Text style={styles.productSize}>
                  {this.state.product.TypeName}
                </Text> */}
                <Text style={styles.productIntro}>{this.state.product.Content}</Text>
              </View>
              <View style={{ height: 100 }} />
            </ScrollView>
            <View style={styles.buttonSelect}>
              <ActiveButton title='THÊM VÀO GIỎ HÀNG' onPress={this.addToCart} />
            </View>
          </View>
          <View style={styles.line}>
          </View>
        </SafeAreaView>
        {
          this.state.refreshing ? <Indicator /> : null
        }
      </View>
    );
  }

  componentWillMount() {
    const product = this.props.navigation.state.params;
    this.setState({ product: product });
    this.loadData(product.ProductID, product.Type);
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
  content: {
    flex: 1,
    width: Constants.screenWidth
  },
  productInfo: {
    flexDirection: 'row',
    height: 40
  },
  productName: {
    flex: 1,
    lineHeight: 50,
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.tint
  },
  productPrice: {
    lineHeight: 50,
    fontSize: 15,
    marginRight: 10,
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.darkGray
  },
  productDiscount: {
    height: 50,
    lineHeight: 50,
    fontSize: 12,
    marginRight: 10,
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: Colors.lightGray,
    textDecorationLine: 'line-through'
  },
  productIntro: {
    fontSize: 15,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.darkGray
  },
  buttonSelect: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: -100,
    width: Constants.screenWidth,
    backgroundColor: 'rgba(247, 247, 247, 0.7)'
  }
});
