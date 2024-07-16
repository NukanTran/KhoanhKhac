import React from 'react';
import Colors from '../../helpers/Colors';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class EditItem extends React.Component {
  render() {
    this.props.item.count = this.props.item.count ? this.props.item.count : 1;
    return (
      <View style={styles.container}>
        <View style={styles.shadowView}>
          <TouchableOpacity onPress={this.props.onCropImage}>
            <Image resizeMethod='resize' style={
              {
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
        </View>
        <View style={styles.toolsView}>
          <TouchableOpacity style={styles.toolButton} onPress={this.props.onRotateImage}>
            <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/rotate.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={this.props.onMinus} disabled={this.props.item.count < 2}>
            <Image resizeMethod='resize' style={this.props.item.count < 2 ? styles.disabledButtonImage : styles.buttonImage} source={require('../../assets/icon/minus.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.toolButton}>{this.props.item.count}</Text>
          <TouchableOpacity style={styles.toolButton} onPress={this.props.onPlus} disabled={this.props.disablePlus}>
            <Image resizeMethod='resize' style={this.props.disablePlus ? styles.disabledButtonImage : styles.buttonImage} source={require('../../assets/icon/plus.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={this.props.onCropImage}>
            <Image resizeMethod='resize' style={styles.buttonImage} source={require('../../assets/icon/crop.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
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
  disabledButtonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.lightGray
  }
});
