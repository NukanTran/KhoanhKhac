import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Colors from '../../helpers/Colors';
import UserData from '../../helpers/UserData';
import MenuType from '../../helpers/MenuType';
import { HomeScreen, ProductPictureScreen, ProductScreen } from '../../helpers/ScreenNames';
import Communications from 'react-native-communications';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

const topBarHeight = 50;

class TopBar extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.topBarContainer}>
            <Image resizeMethod='resize' style={styles.topBarIcon} source={require('../../assets/icon/logoApp.png')} />
            <Text style={styles.title}>KHOẢNH KHẮC</Text>
          </View>
          <TouchableOpacity onPress={this.props.closeDrawer}>
            <Image resizeMethod='resize' style={styles.closeIcon} source={require('../../assets/icon/close.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </SafeAreaView>
    );
  }
}

export default class DrawerScreen extends Component {
  navigateToScreen = (item) => () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate(HomeScreen);
    if (item.Type != MenuType.home) {
      if (item.Type == MenuType.accessory) {
        this.props.navigation.navigate(ProductScreen, item);
      } else {
        this.props.navigation.navigate(ProductPictureScreen, item);
      }
    }
  }

  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopBar closeDrawer={this.closeDrawer} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <FlatList style={{ flex: 1 }}
            data={UserData.homeData.ListMenus}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            contentContainerStyle={{ marginVertical: 10 }}
            keyExtractor={(item) => item.MenuID.toString()}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.container}>
                  <TouchableOpacity onPress={this.navigateToScreen(item)}>
                    <View style={styles.menuItem}>
                      <Image resizeMethod='resize' style={styles.itemIcon} source={{ uri: item.Icon }} />
                      <Text style={styles.itemTitle}>{item.Name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <View>
            <View style={styles.line} />
            <Text style={styles.contactTitle}>Liên hệ: </Text>
            {
              !UserData.homeData.Contact.Phone ? null :
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Communications.phonecall(UserData.homeData.Contact.Phone, true)}>
                  <Image resizeMethod='resize' style={styles.contactIcon} source={require('../../assets/icon/call.png')} />
                  <Text style={styles.contactInfo}>{UserData.homeData.Contact.Phone}</Text>
                </TouchableOpacity>
            }
            {
              !UserData.homeData.Contact.Email ? null :
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Communications.email([UserData.homeData.Contact.Email], null, null, 'Customer-Khoanh-Khac', '')}>
                  <Image resizeMethod='resize' style={styles.contactIcon} source={require('../../assets/icon/email.png')} />
                  <Text style={styles.contactInfo}>{UserData.homeData.Contact.Email}</Text>
                </TouchableOpacity>
            }
            {
              !UserData.homeData.Contact.Address ? null :
                <View style={{ flexDirection: 'row' }}>
                  <Image resizeMethod='resize' style={styles.contactIcon} source={require('../../assets/icon/address.png')} />
                  <Text style={styles.contactInfo}>{UserData.homeData.Contact.Address}</Text>
                </View>
            }
            <View style={{ height: 30 }} />
          </View>
          <View style={styles.line} />
        </SafeAreaView>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBarContainer: {
    flex: 1,
    height: topBarHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 0.2,
    backgroundColor: Colors.lightGray
  },
  title: {
    lineHeight: topBarHeight,
    fontSize: 18,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.tint
  },
  topBarIcon: {
    marginTop: 13,
    marginRight: 15,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: Colors.tint
  },
  closeIcon: {
    marginRight: 10,
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: Colors.darkGray
  },
  menuItem: {
    height: 60,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 100,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.darkGray,
  },
  itemIcon: {
    marginRight: 30,
    minWidth: 26,
    height: 26,
    resizeMode: 'contain',
    tintColor: Colors.darkGray
  },
  contactTitle: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 20,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.tint,
  },
  contactInfo: {
    fontSize: 15,
    marginTop: 5,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.darkGray,
  },
  contactIcon: {
    width: 16,
    height: 30,
    marginLeft: 25,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: Colors.darkGray
  }

});