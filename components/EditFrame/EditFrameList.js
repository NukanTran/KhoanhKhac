import React from 'react';
import EditFrameItem from './EditFrameItem';
import Constants from '../../helpers/Constants';
import {
  View,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet
} from 'react-native';

export default class EditFrameList extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <FlatList
            horizontal={true}
            removeClippedSubviews={Constants.isIOS ? false : true}
            contentContainerStyle={styles.photoList}
            data={this.props.data}
            keyExtractor={(item) => item.TemplateID.toString()}
            renderItem={({ item, index }) => {
              return (
                <EditFrameItem item={item} index={index}
                  product={this.props.product}
                  onSelected={() => { this.props.onSelectedTemplate(index) }}
                />);
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                style={{ backgroundColor: 'transparent' }}
              />
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photoList: {
    paddingTop: 20
  }
});
