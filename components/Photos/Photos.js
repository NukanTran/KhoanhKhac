import React from 'react';
import Colors from '../../helpers/Colors';
import TopBar from "../common/TopBar";
import Indicator from '../common/Indicator';
import PhotosGrid from './PhotosGrid';
import Permissions from 'react-native-permissions'
import MenuType from '../../helpers/MenuType';
import { EditScreen, EditFrameScreen, EditCalendarScreen } from '../../helpers/ScreenNames';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  CameraRoll
} from 'react-native';

export default class Photos extends React.Component {
  state = {
    refreshing: false,
    hasCameraPermission: null,
    allPhotos: []
  };

  selectedItems = [];
  product = {};
  hasNextPage = true;
  endCursor = null;

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  onTopBarRightPress = () => {
    if (this.selectedItems.length > 0 && this.selectedItems.length < this.productPicture.QuantityPicture) {
      if (this.productPicture.Type == MenuType.calendar) {
        Alert.alert('CẢNH BÁO', `Gói lịch này bao gồm ${this.productPicture.QuantityPicture} ảnh. Bạn phải chọn đủ số lượng ảnh.`);
      } else {
        Alert.alert('CẢNH BÁO',
          `Gói này bao gồm ${this.productPicture.QuantityPicture} ảnh. Bạn có thể ở lại đây để chọn thêm ảnh hoặc tiếp tục đặt hàng số ảnh đã chọn. Bạn có thể tăng số lượng ảnh muốn in ở màn hình kế tiếp.`,
          [
            { text: 'TIẾP TỤC', onPress: () => this.done() },
            { text: 'Ở LẠI', onPress: () => { }, style: 'cancel' }
          ],
          { cancelable: false });
      }
    } else if (this.selectedItems.length == this.productPicture.QuantityPicture) {
      this.done();
    } else {
      Alert.alert('CẢNH BÁO', `Vui lòng chọn ảnh!`);
    }
  }

  done = () => {
    const photos = JSON.parse(JSON.stringify(this.selectedItems));
    var screen = '';
    switch (this.productPicture.Type) {
      case MenuType.album:
        screen = EditScreen;
        break;
      case MenuType.frame:
        screen = EditFrameScreen;
        break;
      case MenuType.calendar:
        screen = EditCalendarScreen;
        break;
      default:
        break;
    }
    this.props.navigation.navigate(screen, { product: this.productPicture, photos: photos });
  }

  getAllPhotos = () => {
    this.setState({ refreshing: true });
    this.getPhotos([]);
  }

  getPhotos = (allPhotos, endCursor) => {
    try {
      options = {
        first: 200,
        after: endCursor,
        assetType: 'Photos'
      };
      CameraRoll.getPhotos(options).then(r => {
        allPhotos = [...allPhotos, ...r.edges.map((edge) => edge.node.image)];
        this.hasNextPage = r.page_info.has_next_page;
        this.endCursor = r.page_info.end_cursor;
        this.setState({ allPhotos: allPhotos, refreshing: false });
      }).catch((err) => {
        console.error(err);
        this.setState({ allPhotos: allPhotos, refreshing: false });
      })
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  onPressItem = (item) => {
    if (!item.isSelected && this.selectedItems.length >= this.productPicture.QuantityPicture) {
      return;
    }
    item.isSelected = !item.isSelected;
    if (item.isSelected) {
      this.selectedItems.push(item);
      item.selectedIndex = this.selectedItems.length;
    } else {
      const index = this.selectedItems.indexOf(item);
      this.selectedItems.splice(index, 1);
      for (var i = index; i < this.selectedItems.length; i++) {
        this.selectedItems[i].selectedIndex = i + 1;
      }
    }
    this.setState({ refreshing: false });
  }

  onDidMountItem = (index) => {
    if (index >= this.state.allPhotos.length - 1 && this.hasNextPage) {
      // alert(index.toString());
      this.getPhotos(this.state.allPhotos, this.endCursor);
    }
  }

  renderView = () => {
    if (this.state.hasCameraPermission === null) {
      return (<View />);
    } else if (this.state.hasCameraPermission === false) {
      return (<Text style={styles.warningText}>Không thể truy cập thư viện ảnh!</Text>);
    } else {
      return (
        <View style={{ flex: 1 }}>
          <PhotosGrid data={this.state.allPhotos} onPressItem={this.onPressItem} didMountItem={this.onDidMountItem} />
        </View>
      );
    }
  }

  componentWillMount() {
    try {
      Permissions.request('photo').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ hasCameraPermission: response === 'authorized' });
        if (this.state.hasCameraPermission && this.state.hasCameraPermission !== false) {
          this.getAllPhotos();
        }
      });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  render() {
    this.productPicture = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title={this.selectedItems.length > 0 ? `${this.selectedItems.length}/${this.productPicture.QuantityPicture}` : 'CHỌN ẢNH'}
          leftImage={require('../../assets/icon/back.png')}
          rightTitle='XONG'
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={this.onTopBarRightPress} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            {this.renderView()}
          </View>
          <View style={styles.line} />
        </SafeAreaView>
        {
          this.state.refreshing ? <Indicator /> : null
        }
      </View>
    );
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
  warningText: {
    fontSize: 18,
    color: Colors.error
  }
});
