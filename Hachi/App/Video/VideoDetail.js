

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView,
    Dimensions
} from 'react-native';

var Video = require('react-native-video').default
var {width, height} = Dimensions.get('window');

var VideoDetail = React.createClass({

    getInitialState(){
        return{
            data: this.props.rowData,
            rate: 1,
            muted: false,
            resizeMode: 'contain',
            repeat: false
        }
    },

    render() {
        var data = this.props.rowData
        console.log(data)
        return (
            <View style={styles.container}>
                <Text>视频详情{data._id}</Text>
                <View style={styles.videoBox}>
                    <Video
                        ref='videoPlayer'
                        source={{uri:data.video}}
                        style={styles.video}
                        volume={5}
                        pause={false}
                        rate={this.state.rate}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        repeat={this.state.repeat}

                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        onError={this._onError}
                    >
                    </Video>
                </View>
            </View>
        );
    },

    //视频刚开始加载瞬间
    _onLoadStart(){
        console.log('start111')
    },
    //视频持续加载
    _onLoad(){
        console.log('loads')
    },
    //视频进度
    _onProgress(videoData){
        console.log(videoData)
        console.log('progress')

    },
    //视频播放结束
    _onEnd(){
        console.log('end')

    },
    //播放错误
    _onError(e){
        console.log('error')
        console.log(e)
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    videoBox:{
        width: width,
        height: 360,
        backgroundColor: '#000'
    },

    video:{
        width: width,
        height: 360,
        backgroundColor: '#000'
    },
});


//输出组件
module.exports = VideoDetail;