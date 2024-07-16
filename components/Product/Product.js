import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import ProductGrid from "./ProductGrid";
import Indicator from '../common/Indicator';
import { getProduct } from '../../networking/API';
import { ProductDetailScreen } from '../../helpers/ScreenNames';
import {
  View,
  SafeAreaView,
  Alert,
  StyleSheet
} from 'react-native';

export default class Product extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  loadData = () => {
    this.setState({ refreshing: true });
    getProduct((data) => {
      this.setState({ data: data, refreshing: true }, () => {
        this.setState({ refreshing: false });
      });
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });

  }

  onRefresh = () => {
    this.loadData();
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
            <ProductGrid data={this.state.data}
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              onPressItem={(item) => {
                item.Type = this.state.category.Type;
                this.props.navigation.navigate(ProductDetailScreen, item);
              }} />
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
    this.loadData();
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
