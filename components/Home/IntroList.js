import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import IntroItem from './IntroItem';
import {
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import PageControl
    from 'react-native-page-control';

export default class IntroList extends React.Component {

    onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        this.setState({ currentPage: pageNum });
    }

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref={(ref) => { this.slider = ref; }}
                    selected={this.state.currentPage}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={this.onScrollEnd}
                    style={styles.productSlider}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    data={this.props.data}
                    keyExtractor={(item) => item.AdvertisementID.toString()}
                    renderItem={({ item, index }) => {
                        return (<IntroItem item={item.Image} index={index} />);
                    }}>
                </FlatList>
                <SafeAreaView pointerEvents='box-none' style={styles.productInfo}>
                    {
                        !this.props.data || this.state.currentPage == this.props.data.length - 1 || this.props.data.length == 0 ?
                            <View style={styles.buttonSelect}>
                                <TouchableOpacity style={{ width: 40, height: 40 }} onPress={this.props.hideIntro}>
                                    <Image style={{ width: 40, height: 40, tintColor: Colors.tint }} source={require('../../assets/icon/ok.png')} />
                                </TouchableOpacity>
                            </View>
                            :
                            <PageControl style={styles.productPage}
                                numberOfPages={this.props.data.length}
                                currentPage={this.state.currentPage}
                                hidesForSinglePage
                                pageIndicatorTintColor={Colors.darkGray}
                                currentPageIndicatorTintColor={Colors.tint}
                                indicatorStyle={{ borderRadius: 3 }}
                                currentIndicatorStyle={{ borderRadius: 3 }}
                                indicatorSize={{ width: 6, height: 6 }}
                            />
                    }
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Constants.screenWidth,
        height: Constants.screenHeight,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    productSlider: {
        height: Constants.screenHeight
    },
    productInfo: {
        height: Constants.screenHeight - (Constants.isAndroid ? 20 : 0),
        width: Constants.screenWidth,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    productPage: {
        height: 20,
        marginBottom: 30,
    },
    buttonSelect: {
        padding: 20,
        alignItems: 'center',
        width: Constants.screenWidth
    }
});
