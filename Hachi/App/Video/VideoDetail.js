

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    ListView,

} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
var Video = require('react-native-video').default
var {width, height} = Dimensions.get('window');
var request = require('../Common/request')
var config = require('../Common/config')
var cachedResults = {
    nextPage:1,
    items:[],
    total:0
}


var VideoDetail = React.createClass({

    getInitialState(){

        return{

            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),

            data: this.props.rowData,
            rate: 1,
            muted: false,
            resizeMode: 'contain',
            repeat: false,

            videoOk:true,
            videoReady: false,
            videoProgress: 0.01,
            videoTotal:0,
            currentTime: 0,

            playing:false,
            paused:false,
        }
    },

    render() {
        var data = this.props.rowData
        console.log(data)
        console.log(data.video)
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox} onPress={this._pop}>
                        <Icon name='ios-arrow-back' style={styles.backIcon}/>
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>视频详情</Text>
                </View>

                <View style={styles.videoBox}>
                    <Video
                        ref='videoPlayer'
                        source={{uri:data.video}}
                        style={styles.video}
                        volume={5}
                        pause={this.state.paused}
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

                    {
                        this.state.videoReady && !this.state.playing   //视频加载完成并且没有播放时显示重播按钮
                            ? <Icon name= 'ios-play'
                                    size={28}
                                    style={styles.playIcon}
                                    onPress={this._replay}/>
                            :null
                    }

                    {
                        this.state.videoReady && this.state.playing
                            ?<TouchableOpacity onPress={this._pause} style={styles.pauseBtn}>
                                {
                                    this.state.paused
                                    ?<Icon onPress={this._resume} size={28} name='ios-play' style={styles.resumeIcon}/>
                                    :<Text></Text>
                                }
                            </TouchableOpacity>
                            :null
                    }

                    {
                        !this.state.videoOk && <Text style={styles.textFailed}>很抱歉，视频出错了！</Text>
                    }


                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar, {width:width * this.state.videoProgress}]}></View>
                    </View>
                </View>




                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={80}
                    showsVerticalScrollIndicator={true}
                    //底部加载
                    renderFooter = {this._renderFooter}

                    //头部视图
                    renderHeader = {this._renderHeader}
                />

            </View>
        );
    },

    componentDidMount(){
        this._fetchData()
    },


    _fetchData(){
        var that = this
        var url = config.api.base + config.api.comment

        request.get(url, {
            id:124,
            accessToken:'123'
        })
            .then((data) =>{
                console.log(data)
                if (data && data.success){
                    var comments = data.data
                    if (comments && comments.length > 0){
                        that.setState({
                            comments:comments,
                            dataSource:that.state.dataSource.cloneWithRows(comments)
                        })
                    }
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    },


    _fetchData(page) {

        var that = this
        var url = config.api.base + config.api.comment

        this.setState({
            isLoadingTail:true
        })


        request.get(url, {
            id:124,
            accessToken:'123',
            page:page
        })
            .then((responseData)=>{
                console.log(responseData)

                var items = cachedResults.items.slice()

                items = items.concat(responseData.data)
                cachedResults.nextPage += 1
                cachedResults.items = items
                cachedResults.total = responseData.total

                //更新数据源

                this.setState({
                    isLoadingTail:false,
                    dataSource:this.state.dataSource.cloneWithRows(cachedResults.items),
                })

            })
            .catch((error)=>{
                //更新数据源(可以是之前的缓存数据)
                this.setState({
                    isLoadingTail:false
                })

            })

    },


    //加载更多数据
    _fetchMoreData(){

        if (!this._hasMoreData() || this.state.isLoadingTail){
            return
        }

        //加载下一页数据
        var page = cachedResults.nextPage
        this._fetchData(page)
    },

    _hasMoreData(){
        return cachedResults.items.length !== cachedResults.total
    },

    //自定义加载
    _renderFooter(){
        if(!this._hasMoreData() && cachedResults.total !== 0){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>--我是有底线的--</Text>
                </View>
            )
        }

        if(!this.state.isLoadingTail){
            return <View style={styles.loadingMore}/>
        }

        return <ActivityIndicator style={styles.loadingMore}/>
    },

    _renderHeader(){
        var data = this.state.data
        return(
            <View style={styles.infoBox}>
                <Image style={styles.avatar} source={{uri:data.author.avatar}}/>
                <View style={styles.descBox}>
                    <Text style={styles.nickname}>{data.author.nickname}</Text>
                    <Text style={styles.title}>{data.title}</Text>
                </View>
            </View>
        )
    },

    _renderRow(row){
        return(
            <View key={row._id} style={styles.replyBox}>
                <Image style={styles.replyAvatar} source={{uri:row.replyBy.avatar}}/>
                <View style={styles.reply}>
                    <Text style={styles.replyNickname}>{row.replyBy.nickname}</Text>
                    <Text style={styles.replyContent}>{row.content}</Text>
                </View>
            </View>
        )
    },

    _pop(){
      this.props.navigator.pop()
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

        var newState = {
            videoTotal:duration,
            currentTime:Number(videoData.currentTime.toFixed(2)),
            videoProgress:percent
        }

        if(!this.state.videoReady){
            newState.videoReady = true
        }

        if (!this.state.playing){
            newState.playing = true
        }
        this.setState(newState)
    },

    //视频播放结束
    _onEnd(){
        console.log('end')

        //播放结束，进度条占满
        this.setState({
            videoProgress:1,
            playing:false
        })
    },

    //播放错误
    _onError(e){
        console.log('error')
        console.log(e)
    },

    //重新播放
    _replay(){
        this.refs.videoPlayer.seek(0)
    },

    //暂停
    _pause(){
        if (!this.state.paused){
            this.setState({
                paused:true
            })
        }
    },

    //继续播放
    _resume(){
        if (this.state.paused){
            this.setState({
                paused:false
            })
        }
    }

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:64,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        backgroundColor:'#fff'
    },

    backBox:{
        position:'absolute',
        left:12,
        top:32,
        width:50,
        flexDirection:'row',
        alignItems:'center'
    },

    headerTitle:{
        width:width - 120,
        textAlign:'center',
    },

    backIcon:{
        color:'#999',
        fontSize:20,
        marginRight:5
    },

    backText:{
      color:'#999',
    },

    videoBox:{
        width: width,
        height: width * 0.56,
        backgroundColor: '#000'
    },

    video:{
        width: width,
        height: width * 0.56,
        backgroundColor: '#000'
    },

    loading:{
        position:'absolute',
        left:0,
        top:80,
        width:width,
        alignSelf:'center',
        backgroundColor:'transparent'
    },

    textFailed:{
        position:'absolute',
        left:0,
        top:90,
        width:width,
        textAlign:'center',
        color:'white',
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

    },

    playIcon:{
        position:'absolute',
        top:90,
        left:width/2.0 - 30,
        width:60,
        height:60,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'white',
        borderWidth:1,
        borderRadius:23,
        color:'white'
    },

    pauseBtn:{
        position:'absolute',
        left:0,
        top:0,
        width:width,
        height:360
    },

    resumeIcon:{
        position:'absolute',
        top:80,
        left:width/2.0 - 30,
        width:60,
        height:60,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'white',
        borderWidth:1,
        borderRadius:23,
        color:'white'
    },

    infoBox:{
        width:width,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
    },
    avatar:{
        width:60,
        height:60,
        marginRight:10,
        marginLeft:10,
        borderRadius:30,
    },

    descBox:{
        flex:1,
    },
    nickname:{
        fontSize:18,
    },
    title:{
        marginTop:8,
        fontSize:16,
        color:'#666',
    },

    replyBox:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:10,
    },

    replyAvatar:{
        width:40,
        height:40,
        marginRight:10,
        marginLeft:10,
        borderRadius:20,
    },

    replyNickname:{
        color:'#666'
    },

    replyContent:{
        color:'#666',
        marginTop:4
    },

    reply:{
        flex:1
    },

    loadingMore:{
        marginVertical:20
    },

    loadingText:{
        color:'#777',
        textAlign:'center'
    }

});


//输出组件
module.exports = VideoDetail;