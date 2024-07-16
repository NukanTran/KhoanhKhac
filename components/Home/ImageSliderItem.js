import React from 'react';
import Colors from '../../helpers/Colors';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class ImageSliderItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image resizeMethod='resize' style={{
          width: this.props.width,
          height: this.props.width / this.props.ratioImgae,
          backgroundColor: Colors.lightGray
        }}
          source={{ uri: this.props.item, cache: 'force-cache' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
