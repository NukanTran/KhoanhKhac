import React from 'react';
import CartItem from './CartItem';
import UserData from '../../helpers/UserData';
import {
  View,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
  StyleSheet
} from 'react-native';

export default class CartList extends React.Component {

  onDelete = (index, item) => {
    Alert.alert('CẢNH BÁO',
      `Bạn muốn xóa gói ảnh này?`,
      [
        {
          text: 'XÓA', onPress: () => {
            UserData.totalPrice -= item.product.Price * item.count;
            UserData.removeCartItem(index);
            this.props.refresh()
          }
        },
        { text: 'HỦY', onPress: () => { }, style: 'cancel' }
      ],
      { cancelable: false });
  }

  onMinus = (index, item) => {
    if (item.count > 1) {
      item.count -= 1;
      UserData.totalPrice -= item.product.Price;
      this.setState({ refreshing: false });
      this.props.refresh()
    }
  }

  onPlus = (index, item) => {
    item.count += 1;
    UserData.totalPrice += item.product.Price;
    this.setState({ refreshing: false });
    this.props.refresh()
  }

  renderFooter = () => {
    return (
      <View style={{ height: 220 }}>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.itemList}
            ListFooterComponent={this.renderFooter}
            data={UserData.cartItems}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.product.ProductPictureID.toString()}
            renderItem={({ item, index }) => {
              return (
                <CartItem item={item} index={index}
                  onDelete={() => { this.onDelete(index, item) }}
                  onMinus={() => { this.onMinus(index, item) }}
                  onPlus={() => { this.onPlus(index, item) }}
                />);
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                style={{ backgroundColor: 'transparent' }}
              />
            }
          />
        </View>
      </SafeAreaView>
    );
  }

  componentWillMount() {
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemList: {
    paddingTop: 10
  }
});
