import React from 'react';
import HomeItem from './HomeItem';
import HomeBanner from './HomeBanner';
import {
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet
} from 'react-native';

export default class ProductList extends React.Component {
  renderHeader = () => {
    return (<HomeBanner data={this.props.data.ListAdvertisements} />);
  };

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
            data={this.props.data.ListMainMenus}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={(item) => item.MenuID.toString()}
            renderItem={({ item, index }) => {
              return (<HomeItem item={item} index={index}
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
