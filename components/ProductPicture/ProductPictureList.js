import React from 'react';
import ProductItem from './ProductPictureItem';
import {
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet
} from 'react-native';

export default class ProductPictureList extends React.Component {

  setRefreshing = (value) => {
    this.setState({ refreshing: value });
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
            contentContainerStyle={styles.productList}
            data={this.props.data}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            keyExtractor={(item) => item.ProductPictureID.toString()}
            renderItem={({ item, index }) => {
              return (<ProductItem item={item} index={index}
                onPress={() => { this.props.onPressItem(item) }} />);
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.props.onRefresh}
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
  productList: {
    paddingTop: 5,
    paddingBottom: 5
  }
});
