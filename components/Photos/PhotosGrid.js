import React from 'react';
import PhotoItem from './PhotoItem';
import Constants from '../../helpers/Constants';
import {
  View,
  StyleSheet
} from 'react-native';
import GridView
  from 'react-native-super-grid';
const width = parseInt(Constants.screenWidth / 3, 10) - 4;
export default class PhotosGrid extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GridView
          fixed={true}
          itemDimension={width}
          style={styles.photoGrid}
          items={this.props.data}
          spacing={3}
          removeClippedSubviews={true} 
          scrollEventThrottle={16}
          onEndReached={(item) => {console.log(JSON.stringify(item));}}
          renderItem={item => {
            return (<PhotoItem 
                      item={item} 
                      index={this.props.data.indexOf(item)} 
                      onPress={() => { this.props.onPressItem(item); }} 
                      didMountItem={this.props.didMountItem}
                    />);
          }}>
        </GridView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  photoGrid: {
    flex: 1
  }
});
