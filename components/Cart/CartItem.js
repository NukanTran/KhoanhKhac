import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

var ratioImgae = 1.0;
const width = 100;

export default class CartItem extends React.Component {
  render() {
    this.props.item.count = this.props.item.count ? this.props.item.count : 1;
    return (
      <View style={styles.container}>
        <View style={styles.shadowView}>
          <View style={styles.radiusView}>
            <View>
              <Image resizeMethod='resize' style={{ width: width, height: width / ratioImgae, backgroundColor: Colors.lightGray }}
                source={{ uri: this.props.item.isProductPicture ? this.props.item.photos[0].uri : this.props.item.product.Image }} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{this.props.item.product.Name}</Text>
                  <Text style={styles.productSize}>{this.props.item.product.TypeName}</Text>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={this.props.onDelete}>
                  <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/delete.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.toolsView}>
                  <TouchableOpacity style={styles.toolButton} onPress={this.props.onMinus} disabled={this.props.item.count < 2}>
                    <Image resizeMethod='resize' style={this.props.item.count < 2 ? styles.disabledButtonImage : styles.buttonImage} source={require('../../assets/icon/minus.png')}></Image>
                  </TouchableOpacity>
                  <Text style={styles.toolButton}>{this.props.item.count}</Text>
                  <TouchableOpacity style={styles.toolButton} onPress={this.props.onPlus} disabled={this.props.disablePlus}>
                    <Image resizeMethod='resize' style={this.props.disablePlus ? styles.disabledButtonImage : styles.buttonImage} source={require('../../assets/icon/plus.png')}></Image>
                  </TouchableOpacity>
                </View>
                <Text style={styles.productPrice}>{`${((this.props.item.product.Discount ? this.props.item.product.PriceDiscount : this.props.item.product.Price) * this.props.item.count).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    height: width,
    width: Constants.screenWidth,
    padding: 10,
    paddingTop: 0,
  },
  shadowView: {
    flex: 1,
    elevation: 1,
    borderRadius: 3,
    shadowRadius: 3,
    shadowOpacity: 0.7,
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  radiusView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    overflow: 'hidden'
  },
  toolsView: {
    marginLeft: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolButton: {
    paddingHorizontal: 5,
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.darkGray
  },
  disabledButtonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.lightGray
  },
  productName: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: '600',
    color: Colors.darkGray
  },
  productSize: {
    fontSize: 12,
    marginTop: 3,
    marginLeft: 10,
    color: Colors.lightGray
  },
  productPrice: {
    flex: 1,
    fontSize: 15,
    marginRight: 10,
    textAlign: 'right',
    alignSelf: 'center',
    color: Colors.darkGray
  }
});
