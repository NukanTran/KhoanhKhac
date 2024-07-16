import React from 'react';
import Colors from '../../helpers/Colors';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Constants from '../../helpers/Constants';

export default class EditCalendar extends React.Component {
  render() {
    this.props.item.count = this.props.item.count ? this.props.item.count : 1;
    return (
      <View style={styles.container}>
        <View style={styles.shadowView}>
          <Image resizeMethod='resize'
            style={{
              zIndex: 2,
              width: this.props.template.width + this.props.template.left + this.props.template.right,
              height: this.props.template.height + this.props.template.top + this.props.template.bottom
            }}
            pointerEvents='none'
            resizeMode='stretch'
            source={{ uri: this.props.template.info.Image, cache: 'force-cache' }} />

          <TouchableOpacity onPress={this.props.onCropImage}
            style={{ position: 'absolute', zIndex: 1 }} >
            <Image resizeMethod='resize' style={{
              position: 'absolute', zIndex: 1,
              backgroundColor: Colors.lightGray,
              width: this.props.template.width,
              height: this.props.template.height,
              marginTop: this.props.template.top,
              marginLeft: this.props.template.left,
              marginRight: this.props.template.right,
              marginBottom: this.props.template.bottom
            }}
              source={{ uri: this.props.item.uri }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onCropImage}
            style={{
              position: 'absolute', zIndex: 3,
              width: this.props.template.width,
              height: this.props.template.height,
              marginTop: this.props.template.top,
              marginLeft: this.props.template.left,
              marginRight: this.props.template.right,
              marginBottom: this.props.template.bottom
            }} />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    width: Constants.screenWidth,
    padding: 30,
    paddingTop: 0,
    paddingBottom: 10
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
