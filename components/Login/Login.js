import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import TopBar from "../common/TopBar";
import { CheckoutScreen } from '../../helpers/ScreenNames';
import ActiveButton from '../common/Button/ActiveButton';
import ActiveTextField from '../common/TextField/ActiveTextField';
import UserData from '../../helpers/UserData';
import Prompt from 'react-native-prompt-crossplatform';
import Indicator from '../common/Indicator';
import { login, forgotPassword } from '../../networking/API';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

export default class Login extends React.Component {

  onTopBarLeftPress = () => {
    this.props.navigation.goBack();
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

  onLogin = () => {
    this.setState({ refreshing: true });
    login(this.state.email.text, this.state.password.text, (data) => {
      this.setState({ refreshing: false });
      this.props.navigation.navigate(CheckoutScreen);
    }, (error) => {
      this.setState({ refreshing: false });
      Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
    });
  }

  onForgotPassword = () => {
    if (this.state.lostPassEmail) {
      this.setState({ refreshing: true, showLostPassword: false });
      forgotPassword(this.state.lostPassEmail, (data) => {
        this.setState({ refreshing: false });
        Alert.alert('THÀNH CÔNG', data.MessageSuccess);
      }, (error) => {
        this.setState({ refreshing: false });
        Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
      });
    }
  }

  onChangeLostPassEmail = (value) => {
    this.setState({ lostPassEmail: value });
  }

  constructor(props) {
    super(props);
    this.state = ({
      refreshing: false,
      email: {
        text: '',
        isValid: false
      },
      password: {
        text: '',
        isValid: false
      },
      isValidForm: false,
      showLostPassword: false,
      lostPassEmail: ''
    });
  }

  checkIsValid = () => {
    this.setState({
      isValidForm:
        this.state.email.isValid &&
        this.state.password.isValid
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TopBar
          title='ĐĂNG NHẬP'
          leftImage={require('../../assets/icon/back.png')}
          onLeftPress={this.onTopBarLeftPress}
          onRightPress={() => { }} />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Prompt isVisible={this.state.showLostPassword}
                title='LẤY LẠI MẬT KHẨU'
                inputPlaceholder='(Nhập địa chỉ email)'
                cancelButtonText='HỦY'
                submitButtonText='XONG'
                primaryColor={Colors.tint}
                onChangeText={(text) => { this.onChangeLostPassEmail(text) }}
                onCancel={() => { this.setState({ showLostPassword: false }); }}
                onSubmit={this.onForgotPassword}
                onBackButtonPress={() => { }}
              />
              <View style={{ padding: 20 }}>
                <View style={{ height: 10 }} />
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
                <TouchableOpacity onPress={() => { this.setState({ showLostPassword: true }); }}>
                  <Text style={styles.lostPassword}>Bạn quên mật khẩu?</Text>
                </TouchableOpacity>
                <View style={{ height: 30 }} />
                <ActiveButton title='ĐĂNG NHẬP'
                  disabled={!this.state.isValidForm}
                  onPress={this.onLogin} />
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
    this.onChangeEmail(UserData.email);
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
  },
  lostPassword: {
    width: Constants.screenWidth - 40,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'right',
    alignSelf: 'center',
    color: Colors.activeLabel
  }
});
