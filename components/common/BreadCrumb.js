import React from 'react';
import Colors from '../../helpers/Colors';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class BreadCrumb extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled}>
        <View style={{ flexDirection: 'row' }}>
          <View style={this.props.disabled ? styles.containerDisabled : styles.container}>
            <Image resizeMethod='resize' style={styles.leftArrow} source={this.props.hideLeft ? {} : require('../../assets/icon/arrow.png')} />
            {/* <View style={{ justifyContent: 'center' }}>
              <Text style={this.props.disabled ? styles.indexDisabled : styles.index}>{this.props.index}</Text>
            </View> */}
            <Text style={this.props.disabled ? styles.titleDisabled : styles.title}>
              {this.props.title}
            </Text>
          </View>
          <Image resizeMethod='resize' style={this.props.disabled ? styles.rightArrowDisabled : styles.rightArrow} source={require('../../assets/icon/arrow.png')} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: Colors.tint
  },
  containerDisabled: {
    zIndex: 2,
    flex: 1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: Colors.white
  },
  title: {
    zIndex: 2,
    lineHeight: 60,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white
  },
  titleDisabled: {
    zIndex: 2,
    marginLeft: 5,
    lineHeight: 60,
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.lightGray
  },
  index: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 3,
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    color: Colors.tint,
    backgroundColor: Colors.white
  },
  indexDisabled: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 3,
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    color: Colors.white,
    backgroundColor: Colors.lightGray
  },
  rightArrow: {
    zIndex: 1,
    width: 20,
    height: 60,
    overflow: 'hidden',
    tintColor: Colors.tint,
    resizeMode: 'stretch'
  },
  rightArrowDisabled: {
    zIndex: 1,
    width: 20,
    height: 60,
    overflow: 'hidden',
    tintColor: Colors.white,
    resizeMode: 'stretch'
  },
  leftArrow: {
    width: 20,
    height: 60,
    overflow: 'hidden',
    tintColor: Colors.background,
    resizeMode: 'stretch'
  }
});
