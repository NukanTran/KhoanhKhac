import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const width = Constants.screenWidth / 7;

export default class EditFrameItem extends React.Component {
  render() {
    var ratioImgae = (this.props.item.SpaceHeight + this.props.item.PaddingTop + this.props.item.PaddingBottom) / (this.props.item.SpaceWidth + this.props.item.PaddingLeft + this.props.item.PaddingRight);
    return (
      <View style={styles.container}>
        <View style={styles.shadowView}>
          <TouchableOpacity onPress={this.props.onSelected}>
            <Image resizeMethod='resize' style={{ width: width, height: width * ratioImgae, resizeMode: 'stretch' }}
              source={{ uri: this.props.item.Image, cache: 'force-cache' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20,
  },
  shadowView: {
    elevation: 1,
    shadowRadius: 3,
    shadowOpacity: 0.7,
    backgroundColor: '#ffffff',
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 0
    }
  }
});
