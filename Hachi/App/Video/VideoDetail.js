

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
    Dimensions,
    ActivityIndicator,

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
            repeat: false,

            videoReady: false,
            videoProgress: 0.01,
            videoTotal:0,
            currentTime: 0,
        }
    },

    render() {
        var data = this.props.rowData
        console.log(data)
        console.log(data.video)
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

                    />
                    {
                        !this.state.videoReady && <ActivityIndicator color='#fff' style={styles.loading}/>
                    }

                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar, {width:width * this.state.videoProgress}]}></View>
                    </View>
                </View>
            </View>
        );
    },

    //视频刚开始加载瞬间
    _onLoadStart(){
        console.log('start')
    },
    //视频持续加载
    _onLoad(){
        console.log('loads')
    },
    //视频进度
    _onProgress(videoData){
        console.log(videoData)
        console.log('progress')

        if (!this.state.videoReady){
            this.setState({
                videoReady:true
            })
        }

        var duration = videoData.playableDuration
        var currentTime = videoData.currentTime
        var percent = Number(currentTime / duration).toFixed(2)
        this.setState({
            videoTotal:duration,
            currentTime:Number(videoData.currentTime.toFixed(2)),
            videoProgress:percent
        })
    },
    //视频播放结束
    _onEnd(){
        console.log('end')

        //播放结束，进度条占满
        this.setState({
            videoProgress:1
        })
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

    loading:{
        position:'absolute',
        left:0,
        top:140,
        width:width,
        alignSelf:'center',
        backgroundColor:'transparent'
    },
    progressBox:{
        width:width,
        height:2,
        backgroundColor:'#ccc',

    },

    progressBar:{
        width:1,
        height:2,
        backgroundColor:'#ff6600',

    }
});


//输出组件
module.exports = VideoDetail;