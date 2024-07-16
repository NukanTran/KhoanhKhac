import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import Indicator from '../common/Indicator';
import DetailBanner from './DetailBanner';
import ActiveButton from '../common/Button/ActiveButton';
import { PhotosScreen } from '../../helpers/ScreenNames';
import { getProductPictureDetail } from '../../networking/API';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';

export default class Detail extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  onTopBarRightPress = () => {

  }

  loadData = (id, type) => {
    this.setState({ refreshing: true });
    getProductPictureDetail(id, (data) => {
      data.Type = type;
      this.setState({ productPicture: data, slideShows: data.ListProductPictureSlideShows, using: data.Using, imageUsing: data.ImageUsing, refreshing: false });
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });

  }

  constructor(props) {
    super(props);
    this.state = ({
      productPicture: {},
      slideShows: [],
      using: [],
      imageUsing: [],
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
              <DetailBanner data={this.state.slideShows} />
              <View style={styles.content}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {this.state.productPicture.Name}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.productDiscount}>
                      {this.state.productPicture.Discount ? `${this.state.productPicture.Price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ` : ''}
                    </Text>
                    <Text style={styles.productPrice}>
                      {`${this.state.productPicture.Discount ? this.state.productPicture.PriceDiscount : this.state.productPicture.Price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}
                    </Text>
                  </View>
                </View>
                <Text style={styles.productSize}>
                  {this.state.productPicture.TypeName}
                </Text>
                <Text style={styles.productIntro}>{this.state.productPicture.Summary}</Text>
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.productSize}>Muôn kiểu sử dụng</Text>
                </View>
                <View style={{ marginLeft: 15 }}>
                  {this.state.using.map(i => <Text key={i} style={styles.productIntro}>✦ {i}</Text>)}
                </View>
                <View style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.productUsingTitle}>Kích thước</Text>
                    <Text style={styles.productUsing}>{this.state.productPicture.SizeUsing}</Text>
                    <Image resizeMethod='resize' style={{ width: 80, height: 80, marginVertical: 5 }} source={{ uri: this.state.imageUsing.length > 0 ? this.state.imageUsing[0] : 'https://', cache: 'force-cache' }} />
                  </View>
                  <View style={{ width: 10 }} />
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.productUsingTitle}>Kiểu</Text>
                    <Text style={styles.productUsing}>{this.state.productPicture.TypeUsing}</Text>
                    <Image resizeMethod='resize' style={{ width: 80, height: 80, marginVertical: 5 }} source={{ uri: this.state.imageUsing.length > 1 ? this.state.imageUsing[1] : 'https://', cache: 'force-cache' }} />
                  </View>
                  <View style={{ width: 10 }} />
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.productUsingTitle}>Thích hợp</Text>
                    <Text style={styles.productUsing}>{this.state.productPicture.RelevantUsing}</Text>
                    <Image resizeMethod='resize' style={{ width: 80, height: 80, marginVertical: 5 }} source={{ uri: this.state.imageUsing.length > 2 ? this.state.imageUsing[2] : 'https://', cache: 'force-cache' }} />
                  </View>
                </View>
              </View>
              <View style={{ height: 100 }} />
            </ScrollView>
            <View style={styles.buttonSelect}>
              <ActiveButton title='CHỌN' onPress={() => { this.props.navigation.navigate(PhotosScreen, this.state.productPicture); }} />
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
    const productPicture = this.props.navigation.state.params;
    this.setState({ productPicture: productPicture });
    this.loadData(productPicture.ProductPictureID, productPicture.Type);
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
  productSize: {
    fontSize: 14,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.lightGray
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
  productUsing: {
    fontSize: 15,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.activeLabel
  },
  productUsingTitle: {
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.lightGray
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
