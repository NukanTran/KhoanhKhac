import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import ActiveButton from '../common/Button/ActiveButton';
import ActiveTextField from '../common/TextField/ActiveTextField';
import UserData from '../../helpers/UserData';
import RNPickerSelect from 'react-native-picker-select';
import { getInfo } from '../../networking/API';
import {
    View,
    Text,
    Picker,
    ScrollView,
    Alert,
    StyleSheet
} from 'react-native';

export default class Address extends React.Component {

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
                this.state.phoneNumber.isValid
                && this.state.address.isValid
        });
    }

    saveData = () => {
        UserData.fullName = this.state.fullName.text;
        UserData.email = this.state.email.text;
        UserData.phoneNumber = this.state.phoneNumber.text;
        UserData.address = this.state.address.text;
    }

    loadData = () => {
        this.props.setRefreshing(true);
        this.setState({ refreshing: true });
        getInfo((data) => {
            UserData.id = data.CustomerID ? data.CustomerID : 0;
            UserData.userName = data.UserName ? data.UserName : '';
            UserData.fullName = data.Name ? data.Name : '';
            UserData.email = data.Email ? data.Email : '';
            UserData.phoneNumber = data.Phone ? data.Phone : '';
            UserData.address = data.Address ? data.Address : '';
            this.props.setRefreshing(false);
            this.setState({ refreshing: false });
            this.onRefreshData();
            // Alert.alert('THÀNH CÔNG', JSON.stringify(data));
        }, (error) => {
            this.props.setRefreshing(false);
            this.setState({ refreshing: false });
            Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
        });
    }

    onRefreshData = () => {
        this.onChangeFullName(UserData.fullName);
        this.onChangeEmail(UserData.email);
        this.onChangePhoneNumber(UserData.phoneNumber);
        this.onChangeAddress(UserData.address);
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
            phoneNumber: {
                text: '',
                isValid: false
            },
            address: {
                text: '',
                isValid: false
            },
            isValidForm: false,
            //   district: '',
            //   items: [
            //     {
            //         label: '1',
            //         value: '1'
            //     },
            //     {
            //         label: '2',
            //         value: '2'
            //     },
            //     {
            //         label: '3',
            //         value: '3'
            //     },
            // ]
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={{ padding: 20 }}>
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
                            <ActiveTextField
                                label='Số điện thoại'
                                keyboardType='phone-pad'
                                value={this.state.phoneNumber.text}
                                onChangeText={this.onChangePhoneNumber}
                                error={!this.state.phoneNumber.isValid}
                            />
                            <ActiveTextField
                                label='Địa chỉ'
                                value={this.state.address.text}
                                onChangeText={this.onChangeAddress}
                                error={!this.state.address.isValid}
                            />
                            {/* <View style={styles.drop}>
                    <Text style={styles.dropLabel}>Tỉnh/Thành</Text>
                    <View style={styles.dropItem}>
                        <RNPickerSelect                            
                            items={this.state.items}
                            placeholder={{
                                label: 'Chọn Quận/Huyện',
                                value: null,
                            }}
                            style={{
                                inputIOS: pickerStyle.inputIOS, 
                                inputAndroid: pickerStyle.inputAndroid, 
                                placeholderColor: Colors.lightGray,
                                underline: this.state.district && this.state.district.length > 0  ? pickerStyle.underlineSucces : pickerStyle.underline
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    district: value,
                                });
                            }}
                            onUpArrow={() => { this.distrist.togglePicker(); }}
                            onDownArrow={() => { this.distrist.focus(); }}
                            value={this.state.district}
                            ref={(el) => { this.distrist = el; }}
                        />
                    </View>
                </View>
                <View style={styles.drop}>
                    <Text style={styles.dropLabel}>Quận/Huyện</Text>
                    <View style={styles.dropItem}>
                        <RNPickerSelect                            
                            items={this.state.items}
                            placeholder={{
                                label: 'Chọn Quận/Huyện',
                                value: null,
                            }}
                            style={{
                                inputIOS: pickerStyle.inputIOS, 
                                inputAndroid: pickerStyle.inputAndroid, 
                                placeholderColor: Colors.lightGray,
                                underline: this.state.district && this.state.district.length > 0  ? pickerStyle.underlineSucces : pickerStyle.underline
                            }}
                            onValueChange={(value) => {
                                this.setState({
                                    district: value,
                                });
                            }}
                            onUpArrow={() => { this.distrist.togglePicker(); }}
                            onDownArrow={() => { this.distrist.focus(); }}
                            value={this.state.district}
                            ref={(el) => { this.distrist = el; }}
                        />
                    </View>
                </View>
                <View style={styles.drop}>
                    <Text style={styles.dropLabel}>Phí giao hàng</Text>
                    <Text style={styles.deliveryFee}>10000 đ</Text>
                </View> */}
                        </View>
                        <View style={styles.bottomView}>
                            <ActiveButton
                                disabled={!this.state.isValidForm}
                                title='GIAO ĐẾN ĐỊA CHỈ NÀY'
                                onPress={() => { this.saveData(); this.props.onNext(); }} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    componentWillMount() {
        this.onRefreshData();
        if (UserData.userName != Constants.defaultAccount.userName) {
            this.loadData();
        }
    }

    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Constants.screenWidth
    },
    bottomView: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 30,
        justifyContent: 'flex-end'
    },
    drop: {
        height: 50,
        flexDirection: 'row'
    },
    dropLabel: {
        fontSize: 15,
        width: 100,
        lineHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.lightGray
    },
    dropItem: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deliveryFee: {
        flex: 1,
        fontSize: 15,
        lineHeight: 50,
        marginRight: 15,
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.activeLabel
    }
});

const pickerStyle = {
    inputIOS: {
        borderWidth: 0,
        borderRadius: 0,
        color: Colors.darkGray
    },
    inputAndroid: {
        color: Colors.darkGray
    },
    underline: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.lightGray
    },
    underlineSucces: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.tint
    }
};
