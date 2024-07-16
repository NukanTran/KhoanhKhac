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

const ratioImgae = 2.0;
const width = Constants.screenWidth - 20;

export default class ProductPictureItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.shadowView}>
          <View style={styles.container}>
            <Image resizeMethod='resize' style={styles.productImage}
              source={{ uri: this.props.item.Image, cache: 'force-cache' }} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {this.props.item.Name}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.productSize}>
                  {this.props.item.TypeName}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={styles.productDiscount}>
                    {this.props.item.Discount ? `${this.props.item.Price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ` : ''}
                  </Text>
                  <Text style={styles.productPrice}>
                    {`${this.props.item.Discount ? this.props.item.PriceDiscount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '') : this.props.item.Price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shadowView: {
    marginHorizontal: 10,
    marginVertical: 8,
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
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    overflow: 'hidden'
  },
  productImage: {
    width: width,
    height: width / ratioImgae,
    backgroundColor: Colors.lightGray
  },
  productInfo: {
    flexDirection: 'row',
    height: 40
  },
  productName: {
    lineHeight: 40,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.tint
  },
  productSize: {
    lineHeight: 12,
    fontSize: 12,
    marginTop: 5,
    marginRight: 10,
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.lightGray
  },
  productDiscount: {
    height: 25,
    lineHeight: 25,
    fontSize: 12,
    marginRight: 10,
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: Colors.lightGray,
    textDecorationLine: 'line-through'
  },
  productPrice: {
    height: 25,
    lineHeight: 25,
    fontSize: 15,
    marginRight: 10,
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.darkGray
  }
});
