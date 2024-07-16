import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import Indicator from '../common/Indicator';
import { CheckoutScreen } from '../../helpers/ScreenNames';
import ActiveButton from '../common/Button/ActiveButton';
import ActiveTextField from '../common/TextField/ActiveTextField';
import UserData from '../../helpers/UserData';
import { register } from '../../networking/API';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
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

  onChangePassword = (value) => {
    const isValid = value && value.length > 0;
    this.setState({ password: { text: value, isValid: isValid } }, () => {
      this.checkIsValid();
    });
  }

  onChangeConfirmPassword = (value) => {
    const isValid = value && value.length > 0 && value == this.state.password.text;
    this.setState({ confirmPassword: { text: value, isValid: isValid } }, () => {
      this.checkIsValid();
    });
  }

  onChangePhoneNumber = (value) => {
    const isValid = value && value.length > 0;
    this.setState({ phoneNumber: { text: value, isValid: isValid } }, () => {
      this.checkIsValid();
    });
  }

  onChangeAddress = (value) => {
    const isValid = value && value.length > 0;
    this.setState({ address: { text: value, isValid: isValid } }, () => {
      this.checkIsValid();
    });
  }

  checkIsValid = () => {
    this.setState({
      isValidForm:
        this.state.fullName.isValid &&
        this.state.email.isValid &&
        this.state.password.isValid &&
        this.state.confirmPassword.isValid &&
        this.state.phoneNumber.isValid
      // && this.state.address.isValid
    });
  }

  onRegister = () => {
    const user = {
      Name: this.state.fullName.text,
      UserName: this.state.email.text,
      Password: this.state.password.text,
      Email: this.state.email.text,
      Phone: this.state.phoneNumber.text,
      // Address: this.state.address.text,
      LoginType: "login"
    }
    this.setState({ refreshing: true });
    register(user, (data) => {
      this.setState({ refreshing: false });
      Alert.alert('THÀNH CÔNG', data.MessageSuccess,
        [
          { text: 'OK', onPress: () => { this.props.navigation.navigate(CheckoutScreen); }, style: 'cancel' }
        ],
        { cancelable: false });
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });

  }

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      fullName: {
        text: '',
        isValid: false
      },
      email: {
        text: '',
        isValid: false
      },
      password: {
        text: '',
        isValid: false
      },
      confirmPassword: {
        text: '',
        isValid: false
      },
      phoneNumber: {
        text: '',
        isValid: false
      },
      address: {
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
          title='ĐĂNG KÝ'
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={() => { }} />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={{ padding: 20 }}>
                <View style={{ height: 10 }} />
                <ActiveTextField
                  label='Họ Tên'
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
                <ActiveTextField
                  label='Mật khẩu'
                  value={this.state.password.text}
                  onChangeText={this.onChangePassword}
                  error={!this.state.password.isValid}
                  secureTextEntry={true}
                />
                <ActiveTextField
                  label='Lặp lại mật khẩu'
                  value={this.state.confirmPassword.text}
                  onChangeText={this.onChangeConfirmPassword}
                  error={!this.state.confirmPassword.isValid}
                  secureTextEntry={true}
                />
                <ActiveTextField
                  label='Số điện thoại'
                  keyboardType='phone-pad'
                  value={this.state.phoneNumber.text}
                  onChangeText={this.onChangePhoneNumber}
                  error={!this.state.phoneNumber.isValid}
                />
                {/* <ActiveTextField
                    label='Địa chỉ'
                    value={this.state.address.text}
                    onChangeText={this.onChangeAddress}
                    error={!this.state.address.isValid}
                /> */}
                <View style={{ height: 30 }} />
                <ActiveButton title='ĐĂNG KÝ'
                  disabled={!this.state.isValidForm}
                  onPress={this.onRegister} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.line} />
        </SafeAreaView>
        {
          this.state.refreshing ? <Indicator /> : null
        }
      </View>
    );
  }

  componentWillMount() {
    this.onChangeFullName(UserData.fullName);
    this.onChangeEmail(UserData.email);
    this.onChangePhoneNumber(UserData.phoneNumber);
    // this.onChangeAddress(UserData.address);
  }

  componentDidMount() {

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
  }
});
