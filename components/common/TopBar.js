import React from 'react';
import Colors from '../../helpers/Colors';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from 'react-native';

const height = 50;

export default class TopBar extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor={Colors.tint} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}
            onPress={() => { this.props.onLeftPress(); }}>
            <Text style={styles.buttonTitle}>{this.props.leftTitle}</Text>
            <Image resizeMethod='resize' style={styles.buttonImage} source={this.props.leftImage} />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
          <TouchableOpacity style={styles.button}
            onPress={() => { this.props.onRightPress(); }}>
            <Text style={styles.buttonTitle}>{this.props.rightTitle}</Text>
            <Image resizeMethod='resize' style={styles.buttonImage} source={this.props.rightImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    flexDirection: 'row'
  },
  line: {
    height: 0.2,
    backgroundColor: Colors.lightGray
  },
  title: {
    flex: 100,
    lineHeight: height,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.tint
  },
  button: {
    width: 60,
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    width: 60,
    lineHeight: height,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    color: Colors.tint
  },
  buttonImage: {
    minWidth: 26,
    height: 26,
    position: 'absolute',
    resizeMode: 'contain',
    tintColor: Colors.tint
  }
});