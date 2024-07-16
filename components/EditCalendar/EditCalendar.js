import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import { CartScreen } from '../../helpers/ScreenNames';
import EditCalendarList from './EditCalendarList';
import UserData from '../../helpers/UserData';
import Indicator from '../common/Indicator';
import { uploadPicture } from '../../networking/API';
import { Answers } from 'react-native-fabric';
import { mapTemplate, cropImage, rotateImage, iosMapUri } from '../../helpers/CommonHelpers';
import {
  View,
  SafeAreaView,
  Alert,
  StyleSheet,
  ImageStore
} from 'react-native';

const width = Constants.screenWidth - 60;

export default class EditCalendar extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  onTopBarRightPress = () => {
    if (this.state.count < this.state.productPicture.QuantityPicture) {
      Alert.alert('CẢNH BÁO',
        `Gói này bao gồm ${this.state.productPicture.QuantityPicture} ảnh. Bạn có thể tăng số lượng mỗi ảnh cho đủ số lượng ảnh muốn in.`,
        [
          { text: 'TĂNG ẢNH', onPress: () => { }, style: 'cancel' }
        ],
        { cancelable: false });
    } else {
      this.upload();
    }
  }

  upload = () => {
    this.setState({ refreshing: true });
    this.getImageData(0, [], (body) => {
      // console.error(JSON.stringify(body));
      uploadPicture(body, (data) => {
        this.setState({ refreshing: false });
        // Alert.alert('THÀNH CÔNG', JSON.stringify(data));
        UserData.addCartItem({ product: this.state.productPicture, photos: this.state.photos, token: data.Token, isProductPicture: true });
        UserData.totalPrice += this.state.productPicture.Price;
        Answers.logAddToCart(this.state.productPicture.Price, 'VND',
          this.state.productPicture.Name,
          this.state.productPicture.Type.toString(),
          this.state.productPicture.ProductPictureID.toString(),
          UserData.getLogAttributes());
        this.props.navigation.navigate(CartScreen);
      }, (error) => {
        // console.error(JSON.stringify(body));
        this.setState({ refreshing: false });
        Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
      });
    });
  }

  getImageData = (index, body, success: (data) => void) => {
    if (index < this.state.photos.length) {
      const imageURL = this.state.photos[index].uri;
      ImageStore.getBase64ForTag(imageURL, (base64Data) => {
        body.push({
          ImageUpload: base64Data,
          Extension: 'jpg',
          ProductPictureID: this.state.productPicture.ProductPictureID,
          TemplateID: this.state.templates[index].info.TemplateID,
          Quantity: this.state.photos[index].count,
          IsDrop: this.state.photos[index].isCrop
        });
        this.getImageData(index + 1, body, (result) => {
          success(result);
        });
      },
        (failure) => {
          Alert.alert(failure);
          success(body)
        });
    } else {
      success(body);
    }
  }

  onCropImage = (item, template) => {
    cropImage(item.uri, template.info.SpaceWidth * 1000, template.info.SpaceHeight * 1000, (image) => {
      item.uri = image.path;
      item.extension = image.mime;
      item.isCrop = true;
      if (Constants.isIOS) {
        this.setState({ refreshing: true });
        iosMapUri(image.path, (uri) => {
          item.uri = uri;
          this.setState({ refreshing: false, refreshList: false });
        }, (error) => {
          Alert.alert(error);
          this.setState({ refreshing: false, refreshList: false });
        });
      } else {
        this.setState({ refreshing: false, refreshList: false });
      }
    });
  }

  onRotateImage = (item) => {
    rotateImage(item.uri, (newUri) => {
      item.uri = newUri;
      // if (Constants.isIOS) {
      //   this.setState({ refreshing: true });
      //   iosMapUri(newUri, (uri) => {
      //     item.uri = uri;
      //     this.setState({ refreshing: false, refreshList: false });
      //   }, (error) => {
      //     Alert.alert(error);
      //     this.setState({ refreshing: false, refreshList: false });
      //   });
      // } else {
        this.setState({ refreshing: false, refreshList: false });
      // }
    });
  }

  onResizeImage(index, body, success: (data) => void) {
    if (index < body.length) {
      iosMapUri(body[index].uri, (uri) => {
        body[index].uri = uri;
        this.onResizeImage(index + 1, body, (result) => {
          success(result);
        });
      }, (error) => {
        Alert.alert(error);
        success(body);
      });
    } else {
      success(body);
    }
  }

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      refreshList: false,
      count: 0,
      productPicture: {},
      photos: [],
      templates: []
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title={this.state.productPicture.Name.toUpperCase()}
          leftImage={require('../../assets/icon/back.png')}
          rightTitle='XONG'
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={this.onTopBarRightPress} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <EditCalendarList
              data={this.state.photos}
              product={this.state.productPicture}
              templates={this.state.templates}
              refreshing={this.state.refreshList}
              onRefresh={this.onRefresh}
              onCropImage={this.onCropImage}
              onRotateImage={this.onRotateImage}
              disablePlus={this.state.count >= this.state.productPicture.QuantityPicture}
            />
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
    const data = this.props.navigation.state.params;
    let templates = [];
    data.product.ListTemplates.forEach(t => {
      let template = mapTemplate(t, width);
      templates.push(template);
    });
    this.setState({ productPicture: data.product, photos: data.photos, templates: templates, count: data.photos.length, refreshing: false }, () => {
      if (Constants.isIOS) {
        this.setState({ refreshing: true });
        this.onResizeImage(0, this.state.photos, (body) => {
          this.setState({ photos: body, refreshing: false });
        });
      }
    });
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
  }
});
