import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export default class Indicator extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.indicator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Constants.screenWidth,
    height: Constants.screenHeight,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.indicatorBackground
  }
});
