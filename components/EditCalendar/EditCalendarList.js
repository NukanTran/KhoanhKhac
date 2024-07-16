import React from 'react';
import EditCalendarItem from './EditCalendarItem';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  StyleSheet
} from 'react-native';
import PageControl
  from 'react-native-page-control';

export default class EditCalendarList extends React.Component {

  onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ currentPage: pageNum });
  }

  onSelectedIndex = (index) => {
    this.slider && this.slider.scrollToIndex({ animated: true, index: index });
    this.setState({ currentPage: index });
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.headerView}>
              <Text style={styles.headerTitle}>XEM LẠI VÀ CHỈNH SỬA</Text>
              <Text style={styles.headerInfo}>{'Chạm vào ảnh để chỉnh sửa, vuốt ngang để chuyển đổi giữa các tờ lịch. Dưới đây là hình ảnh minh hoạ thực tế.'}</Text>
            </View>
            <FlatList
              ref={(ref) => { this.slider = ref; }}
              contentContainerStyle={styles.photoList}
              data={this.props.data}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={true}
              scrollEventThrottle={16}
              keyExtractor={(item) => item.uri}
              onMomentumScrollEnd={this.onScrollEnd}
              renderItem={({ item, index }) => {
                return (
                  <EditCalendarItem item={item} index={index}
                    product={this.props.product}
                    template={this.props.templates[index]}
                    disablePlus={this.props.disablePlus}
                    onCropImage={() => { this.props.onCropImage(item, this.props.templates[index]) }}
                  />);
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.refreshing}
                  style={{ backgroundColor: 'transparent' }}
                />
              }
            />

            <View style={styles.toolsView}>
              <TouchableOpacity style={styles.toolButton} onPress={() => { this.props.onRotateImage(this.props.data[this.state.currentPage]) }}>
                <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/rotate.png')}></Image>
              </TouchableOpacity>
              <View style={{width: 16}}/>
              <TouchableOpacity style={styles.toolButton} onPress={() => { this.props.onCropImage(this.props.data[this.state.currentPage], this.props.templates[this.state.currentPage]) }}>
                <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/crop.png')}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.pageInfo}>
              <PageControl style={styles.page}
                numberOfPages={this.props.data.length}
                currentPage={this.state.currentPage}
                hidesForSinglePage
                pageIndicatorTintColor={Colors.darkGray}
                currentPageIndicatorTintColor={Colors.tint}
                indicatorStyle={{ borderRadius: 3 }}
                currentIndicatorStyle={{ borderRadius: 3 }}
                indicatorSize={{ width: 6, height: 6 }}
                onPageIndicatorPress={this.onSelectedIndex}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photoList: {
    paddingTop: 20
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    width: Constants.screenWidth,
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
  pageInfo: {
    height: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  page: {
    height: 20
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
