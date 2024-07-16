import React from 'react';
import Colors from '../../helpers/Colors';
import Constants from '../../helpers/Constants';
import ImageSliderItem from '../Home/ImageSliderItem';
import {
    View,
    Image,
    FlatList,
    StyleSheet
} from 'react-native';
import PageControl
    from 'react-native-page-control';

const ratioImgae = 4 / 3;
const width = Constants.screenWidth;

export default class DetailBanner extends React.Component {

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
                    keyExtractor={(item) => item.ProductPictureSlideShowID.toString()}
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
        width: width,
        height: width / ratioImgae,
        overflow: 'hidden',
    },
    productSlider: {
        height: width / ratioImgae
    },
    productInfo: {
        height: 20,
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productPage: {
        height: 20
    }
});
