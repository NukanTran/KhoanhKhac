import React from 'react';
import Colors from '../../../helpers/Colors';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class ActiveButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled}>
        <View style={this.props.disabled ? styles.containerDisabled : styles.container}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tint
  },
  containerDisabled: {
    height: 50,
    borderRadius: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray
  },
  title: {
    lineHeight: 50,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
  }
});
