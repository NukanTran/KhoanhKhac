import React from 'react';
import EditItem from './EditItem';
import Colors from '../../helpers/Colors';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet
} from 'react-native';

export default class EditList extends React.Component {
  renderHeader = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>XEM LẠI VÀ CHỈNH SỬA</Text>
        <Text style={styles.headerInfo}>{'Chạm vào ảnh để chỉnh sửa. Dưới đây là hình ảnh minh hoạ thực tế gồm cả khoảng trắng và đường viền.'}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={(item) => item.uri}
            renderItem={({ item, index }) => {
              return (
                <EditItem item={item} index={index}
                  product={this.props.product}
                  template={this.props.template}
                  disablePlus={this.props.disablePlus}
                  onCropImage={() => { this.props.onCropImage(item) }}
                  onRotateImage={() => { this.props.onRotateImage(item) }}
                  onMinus={() => { this.props.onMinus(item) }}
                  onPlus={() => { this.props.onPlus(item) }}
                />);
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                style={{ backgroundColor: 'transparent' }}
              />
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.darkGray
  }
});
