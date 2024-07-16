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

export default class ProductItem extends React.Component {
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
    marginVertical: 5,
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
  }
});
