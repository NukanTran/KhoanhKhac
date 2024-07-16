import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import ProductList from "./ProductPictureList";
import Indicator from '../common/Indicator';
import { getProductPicture } from '../../networking/API';
import { DetailScreen } from '../../helpers/ScreenNames';
import {
  View,
  SafeAreaView,
  Alert,
  StyleSheet
} from 'react-native';

export default class ProductPicture extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  loadData = (type) => {
    this.setRefreshing(true);
    getProductPicture(type, (data) => {
      this.setState({ data: data }, () => {
        this.setRefreshing(false);
      });
    }, (error) => {
      this.setRefreshing(false);
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });

  }

  setRefreshing = (value) => {
    this.setState({ refreshing: value });
    if (this.list) {
      this.list.setRefreshing(false);
    }
  }

  onRefresh = () => {
    this.loadData(this.state.category.Type);
  }

  constructor(props) {
    super(props);
    this.state = ({
      data: [],
      category: {},
      refreshing: false
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title={this.state.category.Name.toUpperCase()}
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={() => { }} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ProductList
              ref={(ref) => { this.list = ref; }}
              data={this.state.data}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              onPressItem={(item) => {
                item.Type = this.state.category.Type;
                this.props.navigation.navigate(DetailScreen, item);
              }}
            />
          </View>
          <View style={styles.line}>
          </View>
        </SafeAreaView>
        {
          this.state.refreshing ? <Indicator /> : null
        }
      </View>
    );
  }

  componentWillMount() {
    const category = this.props.navigation.state.params;
    this.setState({ category: category });
    this.loadData(category.Type);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 0.2,
    backgroundColor: Colors.lightGray
  },
});
