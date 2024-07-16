import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import { CheckoutScreen, LoginScreen, RegisterScreen } from '../../helpers/ScreenNames';
import ActiveButton from '../common/Button/ActiveButton';
import ActiveTextField from '../common/TextField/ActiveTextField';
import UserData from '../../helpers/UserData';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class Account extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
  }

  onChangeFullName = (value) => {
    const isValid = value && value.length > 0;
    this.setState({ fullName: { text: value, isValid: isValid } }, () => {
      this.checkIsValid();
    });
  }

  onChangeEmail = (value) => {
    const isValid = value && value.length > 0 && Constants.regEmail.test(value);
    this.setState({ email: { text: value, isValid: isValid } }, () => {
      this.checkIsValid();
    });
  }

  checkIsValid = () => {
    this.setState({
      isValidForm:
        this.state.fullName.isValid &&
        this.state.email.isValid
    });
  }

  onCheckout = () => {
    UserData.fullName = this.state.fullName.text;
    UserData.email = this.state.email.text;
    this.props.navigation.navigate(CheckoutScreen);
  }

  constructor(props) {
    super(props);
    this.state = ({
      fullName: {
        text: '',
        isValid: false
      },
      email: {
        text: '',
        isValid: false
      },
      isValidForm: false
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title='TÀI KHOẢN'
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={() => { }} />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.introText}>Nhập tên và email của bạn để không cần đăng ký</Text>
              <View style={styles.line} />
              <View style={{ padding: 20, backgroundColor: Colors.white }}>
                <ActiveTextField
                  label='Họ Tên người nhận'
                  value={this.state.fullName.text}
                  onChangeText={this.onChangeFullName}
                  error={!this.state.fullName.isValid}
                />
                <ActiveTextField
                  label='Địa chỉ email'
                  keyboardType='email-address'
                  value={this.state.email.text}
                  onChangeText={this.onChangeEmail}
                  error={!this.state.email.isValid}
                />
                <View style={{ height: 30 }} />
                <ActiveButton
                  disabled={!this.state.isValidForm}
                  title='MUA KHÔNG CẦN ĐĂNG KÝ'
                  onPress={this.onCheckout} />
              </View>
              <View style={styles.line} />
              <View style={styles.bottomView}>
                <View style={{ flex: 1 }} />
                <ActiveButton title='ĐĂNG NHẬP' onPress={() => { this.props.navigation.navigate(LoginScreen); }} />
                <View style={{ height: 80, flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={styles.introRegister}>Chưa có tài khoản? Vui lòng </Text>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }} onPress={() => { this.props.navigation.navigate(RegisterScreen); }}>
                    <Text style={styles.register}>đăng ký.</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.line} />
        </SafeAreaView>
      </View>
    );
  }

  componentWillMount() {
    this.onChangeFullName(UserData.fullName);
    this.onChangeEmail(UserData.email);
  }

  componentDidMount() {
    this.setState({ isValidForm: this.state.fullName.isValid && this.state.email.isValid });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  line: {
    height: 0.3,
    backgroundColor: Colors.lightGray
  },
  introText: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.darkGray
  },
  bottomView: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    width: Constants.screenWidth
  },
  introRegister: {
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.darkGray
  },
  register: {
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.activeLabel,
    textDecorationLine: 'underline'
  }
});
