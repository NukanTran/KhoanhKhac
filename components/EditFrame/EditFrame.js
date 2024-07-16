import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import { CartScreen } from '../../helpers/ScreenNames';
import EditFrameList from './EditFrameList';
import UserData from '../../helpers/UserData';
import Indicator from '../common/Indicator';
import { uploadPicture } from '../../networking/API';
import { Answers } from 'react-native-fabric';
import { mapTemplate, cropImage, rotateImage, iosMapUri } from '../../helpers/CommonHelpers';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  ImageStore
} from 'react-native';

const width = Constants.screenWidth - 60;

export default class EditFrame extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }
  onTopBarRightPress = () => {
    this.upload();
  }

  onCropImage = (item) => {
    cropImage(item.uri, this.state.template.info.SpaceWidth * 1000, this.state.template.info.SpaceHeight * 1000, (image) => {
      item.uri = image.path;
      item.extension = image.mime;
      item.isCrop = true;
      this.setState({ refreshing: false });
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

  onSelectedTemplate = (index) => {
    if (this.state.product.ListTemplates.length > index) {
      let template = mapTemplate(this.state.product.ListTemplates[index], width);
      this.setState({ template: template, refreshing: false, refreshList: false });
    }
  }

  upload = () => {
    this.setState({ refreshing: true });
    this.getImageData(0, [], (body) => {
      // console.error(JSON.stringify(body));
      uploadPicture(body, (data) => {
        this.setState({ refreshing: false });
        // Alert.alert('THÀNH CÔNG', JSON.stringify(data));
        UserData.addCartItem({ product: this.state.product, photos: this.state.photos, token: data.Token, isProductPicture: true });
        UserData.totalPrice += this.state.product.Price;
        Answers.logAddToCart(this.state.product.Price, 'VND',
          this.state.product.Name,
          this.state.product.Type.toString(),
          this.state.product.ProductPictureID.toString(),
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
      if (Constants.isIOS) {
        iosMapUri(imageURL, (uri) => {
          ImageStore.getBase64ForTag(uri, (base64Data) => {
            body.push({
              ImageUpload: base64Data,
              Extension: 'jpg',
              ProductPictureID: this.state.product.ProductPictureID,
              TemplateID: this.state.template.info.TemplateID,
              Quantity: 1,
              IsDrop: this.state.photos[index].isCrop
            });
            this.getImageData(index + 1, body, (result) => {
              success(result);
            });
          },
            (error) => {
              Alert.alert(error);
              success(body)
            });
        }, (error) => {
          Alert.alert(error);
          success(body);
        });
      } else {
        ImageStore.getBase64ForTag(imageURL, (base64Data) => {
          body.push({
            ImageUpload: base64Data,
            Extension: 'jpg',
            ProductPictureID: this.state.product.ProductPictureID,
            TemplateID: this.state.template.info.TemplateID,
            Quantity: 1
          });
          this.getImageData(index + 1, body, (result) => {
            success(result);
          });
        },
          (failure) => {
            Alert.alert(failure);
            success(body)
          });
      }
    } else {
      success(body);
    }
  }

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      refreshList: false,
      product: {},
      photos: [],
      template: {
        info: {}
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title={this.state.product.Name.toUpperCase()}
          leftImage={require('../../assets/icon/back.png')}
          rightTitle='XONG'
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={this.onTopBarRightPress} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.headerView}>
                <Text style={styles.headerTitle}>XEM LẠI VÀ CHỈNH SỬA</Text>
                <Text style={styles.headerInfo}>{'Hãy lựa chọn khung ảnh yêu thích. Chạm vào ảnh để chỉnh sửa. Dưới đây là hình ảnh minh hoạ thực tế.'}</Text>
              </View>
              <View style={styles.shadowView}>
                <Image resizeMethod='resize' style={{ zIndex: 2, width: width, height: this.state.template.height + this.state.template.top + this.state.template.bottom }}
                  resizeMode='stretch'
                  source={{ uri: this.state.template.info.Image, cache: 'force-cache' }} />
                <Image resizeMethod='resize' style={{
                  zIndex: 1, position: 'absolute',
                  backgroundColor: Colors.lightGray,
                  width: this.state.template.width,
                  height: this.state.template.height,
                  marginTop: this.state.template.top,
                  marginLeft: this.state.template.left,
                  marginRight: this.state.template.right,
                  marginBottom: this.state.template.bottom
                }}
                  source={{ uri: this.state.photos.length > 0 ? this.state.photos[0].uri : 'https://' }} />
                <TouchableOpacity onPress={() => { this.onCropImage(this.state.photos[0]); }}
                  style={{
                    position: 'absolute', zIndex: 3,
                    width: this.state.template.width,
                    height: this.state.template.height,
                    marginTop: this.state.template.top,
                    marginLeft: this.state.template.left,
                    marginRight: this.state.template.right,
                    marginBottom: this.state.template.bottom
                  }} />
              </View>

              <View style={styles.toolsView}>
                <TouchableOpacity style={styles.toolButton} onPress={() => { this.onRotateImage(this.state.photos[0]) }}>
                  <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/rotate.png')}></Image>
                </TouchableOpacity>
                <View style={{ width: 16 }} />
                <TouchableOpacity style={styles.toolButton} onPress={() => { this.onCropImage(this.state.photos[0]) }}>
                  <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/crop.png')}></Image>
                </TouchableOpacity>
              </View>

              <View style={{ width: Constants.screenWidth, alignItems: 'center', justifyContent: 'center' }}>
                <EditFrameList data={this.state.product.ListTemplates} onSelectedTemplate={this.onSelectedTemplate} refreshing={this.state.refreshList} />
                <View style={{ height: 30 }} />
              </View>
            </ScrollView>
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
    this.setState({ product: data.product, photos: data.photos, count: data.photos.length, refreshing: false, refreshList: false }, () => {
      this.onSelectedTemplate(0);
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
    justifyContent: 'center'
  },
  line: {
    height: 0.2,
    backgroundColor: Colors.lightGray
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    padding: 20,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.tint
  },
  headerInfo: {
    paddingHorizontal: 20,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.darkGray
  },
  shadowView: {
    margin: 30,
    marginBottom: 10,
    elevation: 1,
    shadowRadius: 3,
    shadowOpacity: 0.7,
    backgroundColor: '#ffffff',
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 0
    }
  },
  toolsView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolButton: {
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.darkGray
  },
});
