import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import ImageSliderItem from './ImageSliderItem';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import PageControl
    from 'react-native-page-control';

const ratioImgae = 2.0;
const width = Constants.screenWidth - 20;

export default class ProductBanner extends React.Component {

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
                    onMomentumScrollEnd={this.onScrollEnd}
                    style={styles.productSlider}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    data={this.props.data}
                    keyExtractor={(item) => item.AdvertisementID.toString()}
                    renderItem={({ item, index }) => {
                        return (<ImageSliderItem item={item.Image} index={index} width={width} ratioImgae={ratioImgae} />);
                    }}>
                </FlatList>
                <View style={styles.productInfo}>
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
                </View>
            </View>
        );
    }

    componentWillMount() {
        var autoSlide = () => {
            var currentPage = this.state.currentPage + 1;
            if (currentPage >= this.props.data.length) {
                currentPage = 0;
            }
            if (this.props.data.length > 0) {
                this.slider && this.slider.scrollToIndex({ animated: true, index: currentPage });
                this.setState({ currentPage: currentPage });
            }
        }
        this.auto = setInterval(autoSlide, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.auto);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        margin: 10,
        marginTop: 4,
        marginBottom: -4,
        overflow: 'hidden'
    },
    productSlider: {
        height: width / ratioImgae
    },
    productInfo: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productPage: {
        height: 20
    }
});
