import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class IntroItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode={Constants.isAndroid && Constants.screenRatio < 1.8 ? 'stretch' : 'contain'} resizeMethod='resize' style={{
          width: Constants.screenWidth,
          height: Constants.screenHeight - (Constants.isAndroid && Constants.screenRatio < 1.8 ? 20 : 0)
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
