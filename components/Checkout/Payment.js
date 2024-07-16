import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import ActiveButton from '../common/Button/ActiveButton';
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';

export default class Payment extends React.Component {

    render() {
        const data = [
            {
                icon: require('../../assets/icon/delivery.png'),
                text: 'Trả Tiền Khi Nhận Hàng'
            }
        ];
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flex: 1 }}>
                        <View style={{ padding: 20 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={data}
                                removeClippedSubviews={true} 
                                scrollEventThrottle={16}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.item}>
                                            <Image resizeMethod='resize' style={styles.itemIcon} source={item.icon} />
                                            <Text style={styles.itemText}>{item.text}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.bottomView}>
                            <ActiveButton
                                title='TIẾP TỤC'
                                onPress={this.props.onNext} />
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
    item: {
        padding: 20,
        borderRadius: 3,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: Colors.tint
    },
    itemIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        tintColor: Colors.white
    },
    itemText: {
        lineHeight: 40,
        fontSize: 18,
        marginLeft: 15,
        color: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
