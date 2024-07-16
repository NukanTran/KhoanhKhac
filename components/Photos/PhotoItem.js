import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';


const width = parseInt(Constants.screenWidth / 3, 10) - 4;

export default class PhotoItem extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <Image resizeMethod='resize' style={styles.photo}
            resizeMethod='resize'
            source={{ uri: this.props.item.uri}} />
          {
            this.props.item.isSelected ? (
              <View style={styles.viewSelected}>
                <Text style={styles.selectedIndex}>{this.props.item.selectedIndex}</Text>
              </View>)
              : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentDidMount() {
    this.props.didMountItem(this.props.index.toString());
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    overflow: 'hidden'
  },
  photo: {
    width: width,
    height: width,
    overflow: 'hidden',
    backgroundColor: Colors.lightGray
  },
  viewSelected: {
    width: width,
    height: width,
    borderRadius: 3,
    borderWidth: 3,
    position: 'absolute',
    justifyContent: 'flex-end',
    borderColor: Colors.tint
  },
  selectedIndex: {
    width: 30,
    height: 30,
    lineHeight: 30,
    marginBottom: -3,
    marginRight: -3,
    borderRadius: 3,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    overflow: 'hidden',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: Colors.tint
  }
});
