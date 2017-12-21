

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Platform,
    ListView,
    TouchableHighlight,
    Dimensions
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');
var {width, height} = Dimensions.get('window');

var Video = React.createClass({

    getInitialState(){
        // 初始化数据源
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return{
            dataSource: ds.cloneWithRows([
                {
                "_id": "330000200204053239",
                "thumb": "http://dummyimage.com/1200x600/79f2a6)",
                "video": "https://vd3.bdstatic.com//mda-hmjcb522vhq06stn//sc//mda-hmjcb522vhq06stn.mp4?auth_key=1513763151-0-0-e99275a926646031fdbbee30ec210895&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' type='video/mp4"
                },
                {
                    "_id": "820000198005152943",
                    "thumb": "http://dummyimage.com/1200x600/f28379)",
                    "video": "https://vd3.bdstatic.com//mda-hmjcb522vhq06stn//sc//mda-hmjcb522vhq06stn.mp4?auth_key=1513763151-0-0-e99275a926646031fdbbee30ec210895&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' type='video/mp4"
                }]),

            // dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        }
    },

    render() {
        return (
            <View  style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>视频</Text>
                </View>

                {/*视频列表*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />


            </View>
        );
    },


    renderRow(rowData) {
        return(
            <TouchableHighlight onPress={this.onPressCell}>
                <View style={styles.item}>
                    <Text style={styles.title}>{rowData._id}</Text>
                    <Image
                        source={{uri:rowData.thumb}}
                        style={styles.thumb}
                    >
                        {/*<Icon*/}
                            {/*name:'ios-play'*/}
                            {/*size={28}*/}
                            {/*style={styles.play}*/}
                        {/*/>*/}

                    </Image>

                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            {/*<Icon*/}
                                {/*name='ios-heart-outline'*/}
                                {/*size={28}*/}
                                {/*style={styles.up}*/}
                            {/*/>*/}
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>

                        <View style={styles.handleBox}>
                            {/*<Icon*/}
                                {/*name='ios-chatbubble-outline'*/}
                                {/*size={28}*/}
                                {/*style={styles.commentIcon}*/}
                            {/*/>*/}
                            <Text style={styles.handleText}>评论</Text>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>
        )
    },


    //点击视频列表
    onPressCell(){

    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    header:{
        paddingTop:30,
        paddingBottom:20,
        backgroundColor:'#ee735c',
    },

    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },

    item:{
        width:width,
        marginBottom:10,
        backgroundColor:'white',

    },
    title:{
        padding:10,
        fontSize:15,
        color:'#333'
    },
    thumb:{
        width:width,
        height:width * 0.5,
        resizeMode:'cover'
    },
    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:16,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'white',
        borderWidth:1,
        borderRadius:23,
        color:'white'
    },
    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },
    handleBox:{
        padding:10,
        flexDirection:'row',
        width:width * 0.5 - 0.5,
        backgroundColor:'white',
        justifyContent:'center'
    },
    up:{
        fontSize:22,
        color:'#333'
    },
    handleText:{
        left:12,
        fontSize:15,
        color:'#333'
    },
    commentIcon:{
        color:'#333',
        fontSize:22,
    }

});

module.exports = Video;