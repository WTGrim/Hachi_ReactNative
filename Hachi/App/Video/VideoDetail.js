

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
    ScrollView
} from 'react-native';

var Video = require('react-native-video').default

var VideoDetail = React.createClass({

    getInitialState(){
        return{
            data: this.props.rowData,
            rate: 1,
            muted: true,
            resizeMode: 'contain',
            repeat: false
        }
    },

    render() {
        var rowData = this.props.rowData
        console.log(rowData)
        return (
            <View style={styles.container}>
                <Text>视频详情{rowData._id}</Text>
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

    },
    //视频持续加载
    _onLoad(){

    },
    //视频进度
    _onProgress(){

    },
    //视频播放结束
    _onEnd(){

    },
    //播放错误
    _onError(){

    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


//输出组件
module.exports = VideoDetail;