import React from 'react';
import ProductItem from './ProductItem';
import Constants from '../../helpers/Constants';
import {
  View,
  RefreshControl,
  StyleSheet
} from 'react-native';
import GridView
  from 'react-native-super-grid';
const width = parseInt(Constants.screenWidth / 3, 10) - 11;
export default class ProductGrid extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GridView
          fixed={true}
          itemDimension={width}
          style={styles.photoGrid}
          items={this.props.data}
          spacing={8}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          onEndReached={(item) => { console.log(JSON.stringify(item)); }}
          renderItem={item => {
            return (<ProductItem
              item={item}
              index={this.props.data.indexOf(item)}
              onPress={() => { this.props.onPressItem(item); }}
            />);
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.props.onRefresh}
              style={{ backgroundColor: 'transparent' }}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Constants.isIOS ? 0 : 8,
    overflow: 'hidden',
  },
  photoGrid: {
    flex: 1
  }
});
