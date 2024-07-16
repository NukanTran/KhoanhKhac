import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import ActiveButton from '../common/Button/ActiveButton';
import UserData from '../../helpers/UserData';
import Prompt from 'react-native-prompt-crossplatform';
import { checkPromotionCode } from '../../networking/API';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class Confirm extends React.Component {


    onChangePromotionCode = (code) => {
        this.setState({ promotionCode: code });
    }

    onCheckPromotionCode = () => {
        if (this.state.promotionCode) {
            this.props.setRefreshing(true);
            this.setState({ showPromotionInput: false, refreshing: true });
            checkPromotionCode(this.state.promotionCode, (data) => {
                UserData.promotion = data;
                this.props.setRefreshing(false);
                this.setState({ refreshing: false });
            }, (error) => {
                this.props.setRefreshing(false);
                this.setState({ refreshing: false });
                Alert.alert('CẢNH BÁO', error.MessageError ? error.MessageError : error);
            });
        }
    }

    getPromotionPrice = () => {
        let value = UserData.promotion.Price ? UserData.promotion.Price : 0;
        if (UserData.promotion.IsPercent) {
            value = UserData.promotion.Percents * UserData.totalPrice / 100;
        }
        return value;
    }

    constructor(props) {
        super(props);
        this.state = ({
            refreshing: false,
            showPromotionInput: false,
            promotionCode: ''
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Prompt isVisible={this.state.showPromotionInput}
                        title='KHUYẾN MÃI'
                        inputPlaceholder='(Nhập mã khuyến mãi)'
                        cancelButtonText='HỦY'
                        submitButtonText='XONG'
                        primaryColor={Colors.tint}
                        onChangeText={(text) => { this.onChangePromotionCode(text) }}
                        onCancel={() => { this.setState({ showPromotionInput: false }); }}
                        onSubmit={this.onCheckPromotionCode}
                        onBackButtonPress={() => { }}
                    />
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={{ padding: 20 }}>
                            <View style={styles.shadowView}>
                                <View style={styles.group}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image resizeMethod='resize' style={styles.itemIcon} source={require('../../assets/icon/wallet.png')} />
                                        <Text style={styles.itemText}>Trả Tiền Khi Nhận Hàng</Text>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.props.onPayment}>
                                            <Image resizeMethod='resize' style={styles.itemIcon} source={require('../../assets/icon/edit.png')} />
                                            <Text style={styles.itemText}>Sửa</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.lightText}>Giá tiền</Text>
                                        <View style={{ flex: 1 }} />
                                        <Text style={styles.itemText}>{`${UserData.totalPrice.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}</Text>
                                    </View>
                                    {/* <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={styles.lightText}>Phí giao hàng</Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.itemText}>10.000 đ</Text>
                        </View> */}
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.lightText}>Dự kiến</Text>
                                        <View style={{ flex: 1 }} />
                                        <Text style={styles.itemText}>Giao hàng nhanh (2-3 ngày)</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.underline}>Khuyến mãi</Text>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity onPress={() => { this.setState({ showPromotionInput: true }); }}><Text style={styles.itemText}>{UserData.promotion.PromotionCodeID ? `${this.getPromotionPrice().toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ` : '(Nhập mã khuyến mãi)'}</Text></TouchableOpacity>
                                    </View>
                                    <View style={{ height: 0.5, marginTop: 10, backgroundColor: Colors.lightGray }} />
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.lightText}>TỔNG CỘNG</Text>
                                        <View style={{ flex: 1 }} />
                                        <Text style={styles.active}>{`${((UserData.totalPrice > this.getPromotionPrice()) ? (UserData.totalPrice - this.getPromotionPrice()) : 0).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString().replace('.0', '')} đ`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 20 }} />
                            <View style={styles.shadowView}>
                                <View style={styles.group}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image resizeMethod='resize' style={styles.itemIcon} source={require('../../assets/icon/address.png')} />
                                        <Text style={styles.itemText}>Địa Chỉ Giao Hàng</Text>
                                        <View style={{ flex: 1 }} />
                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.props.onAddress}>
                                            <Image resizeMethod='resize' style={styles.itemIcon} source={require('../../assets/icon/edit.png')} />
                                            <Text style={styles.itemText}>Sửa</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.itemText}>{UserData.fullName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={styles.lightText}>{UserData.address}</Text>
                                    </View>
                                    {/* <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={styles.lightText}>Quận Gò Vâp, TP.HCM</Text>
                        </View> */}
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Image resizeMethod='resize' style={styles.lightIcon} source={require('../../assets/icon/call.png')} />
                                        <Text style={styles.lightText}>{UserData.phoneNumber}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Image resizeMethod='resize' style={styles.lightIcon} source={require('../../assets/icon/email.png')} />
                                        <Text style={styles.lightText}>{UserData.email}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomView}>
                            <ActiveButton
                                title='XÁC NHẬN ĐẶT HÀNG'
                                onPress={this.props.onSubmit} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    componentWillMount() {

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
    shadowView: {
        elevation: 1,
        borderRadius: 3,
        shadowRadius: 3,
        shadowOpacity: 0.7,
        shadowColor: Colors.lightGray,
        shadowOffset: {
            width: 0,
            height: 0
        }
    },
    group: {
        padding: 10,
        borderRadius: 3,
        backgroundColor: Colors.white
    },
    itemIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        resizeMode: 'contain',
        tintColor: Colors.darkGray
    },
    itemText: {
        lineHeight: 20,
        fontSize: 15,
        color: Colors.darkGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightIcon: {
        width: 15,
        height: 20,
        marginRight: 8,
        resizeMode: 'contain',
        tintColor: Colors.lightGray
    },
    lightText: {
        lineHeight: 20,
        fontSize: 15,
        color: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    underline: {
        fontSize: 15,
        lineHeight: 20,
        color: Colors.activeLabel,
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline'
    },
    active: {
        fontSize: 15,
        lineHeight: 20,
        color: Colors.activeLabel,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
