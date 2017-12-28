

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
    Dimensions,
    ActivityIndicator,
    RefreshControl,
    AlertIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
var request = require('../Common/request')
var config = require('../Common/config')
var VideoDetail = require('./VideoDetail')
var {width, height} = Dimensions.get('window');

var cachedResults = {
    nextPage:1,
    items:[],
    total:0
}

var Item = React.createClass({

    getInitialState(){
        var rowData = this.props.rowData
        return{
            rowData : rowData,
            voted:rowData.voted,
        }
    },

    render(){
        var rowData = this.state.rowData
        return (
            <TouchableHighlight onPress={this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <Image
                        source={{uri:rowData.thumb}}
                        style={styles.thumb}
                    >
                        <Icon
                        name='ios-play'
                        size={28}
                        style={styles.play}
                        />

                    </Image>

                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                            name='ios-heart-outline'
                            size={28}
                            style={[styles.up, this.state.voted ? null:styles.down]}
                            />
                            <Text style={[styles.handleText, this.state.voted ? styles.handleTextUp : null]}  onPress={this._up}>喜欢</Text>
                        </View>

                        <View style={styles.handleBox}>
                            <Icon
                            name='ios-chatboxes-outline'
                            size={28}
                            style={styles.commentIcon}
                            />
                            <Text style={styles.handleText}>评论</Text>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>
        )
    },

    //点击喜欢
    _up() {
        var up = !this.state.voted
        var rowData = this.state.rowData
        var url = config.api.base + config.api.up

        var body = {
            id: rowData._id,
            up: up ? 'yes' : 'no',
            accessToken: 'abc'
        }

        var that = this
        request.post(url, body)
            .then((data)=>{
                console.log(data)
                if (data && data.success){
                    that.setState({
                        up: up
                    })
                }else {
                    AlertIOS.alert('点赞失败，稍后重试')
                }
        })
            .catch((error)=>{
                AlertIOS.alert('点赞失败，稍后重试')
        })
    },

})

var Video = React.createClass({

    getDefaultProps(){
        return {
            api_url:'http://rap2api.taobao.org/app/mock/data/8425'
        }
    },

    getInitialState(){

        // 初始化数据源
        return {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),

            //是否正在加载
            isLoadingTail:false,
            //头部刷新状态
            isRefreshing:false

            // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // return{
            // dataSource: ds.cloneWithRows([
                //构造测试数据
                // {
                //     "_id": "130000201605234716",
                //     "thumb": "http://dummyimage.com/1280x720/797ff2)",
                //     "video": "https://vd3.bdstatic.com//mda-hmjcb522vhq06stn//sc//mda-hmjcb522vhq06stn.mp4?auth_key=1513763151-0-0-e99275a926646031fdbbee30ec210895&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' type='video/mp4",
                //     "title": "Rcjzvl"
                // },
                // {
                //     "_id": "460000198612147428",
                //     "thumb": "http://dummyimage.com/1280x720/a2f279)",
                //     "video": "https://vd3.bdstatic.com//mda-hmjcb522vhq06stn//sc//mda-hmjcb522vhq06stn.mp4?auth_key=1513763151-0-0-e99275a926646031fdbbee30ec210895&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' type='video/mp4",
                //     "title": "Rdhqe"
                // },
                // {
                //     "_id": "460000198612147428",
                //     "thumb": "http://dummyimage.com/1280x720/a2f279)",
                //     "video": "https://vd3.bdstatic.com//mda-hmjcb522vhq06stn//sc//mda-hmjcb522vhq06stn.mp4?auth_key=1513763151-0-0-e99275a926646031fdbbee30ec210895&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' type='video/mp4",
                //     "title": "Rdhqe"
                // },
                // {
                //     "_id": "150000199811078455",
                //     "thumb": "http://dummyimage.com/1280x720/f279c6)",
                //     "video": "https://vd3.bdstatic.com//mda-hmjcb522vhq06stn//sc//mda-hmjcb522vhq06stn.mp4?auth_key=1513763151-0-0-e99275a926646031fdbbee30ec210895&bcevod_channel=searchbox_feed&pd=bjh&abtest=all' type='video/mp4",
                //     "title": "Trq"
                // }
                // ]),

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
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}
                    //底部加载
                    renderFooter = {this._renderFooter}
                    //顶部加载
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor='#ff6600'
                            title="拼命加载中..."
                            // titleColor='#ff6600'
                            //下面两个是安卓配置属性
                            // colors={['#ff0000', '#00ff00', '#0000ff']}
                            // progressBackgroundColor="#ffff00"
                        />
                    }
                />

            </View>
        );
    },

    componentDidMount(){
        this._fetchData(1)
    },

    _fetchData(page) {

        if (page !== 0){
            this.setState({
                isLoadingTail:true
            })
        }else {
            this.setState({
                isRefreshing:true
            })
        }

        request.get(config.api.base + config.api.videolist, {
            accessToken:'ww',
            page:page
        })
            .then((responseData)=>{
                console.log(responseData)

                var items = cachedResults.items.slice()
                if (page !== 0){
                    items = items.concat(responseData.data)
                    cachedResults.nextPage += 1

                }else {
                    items = responseData.data.concat(items)
                }
                cachedResults.items = items
                cachedResults.total = responseData.total

                //更新数据源
                if (page !== 0){
                    this.setState({
                        isLoadingTail:false,
                        dataSource:this.state.dataSource.cloneWithRows(cachedResults.items),
                    })
                }else {
                    this.setState({
                        isRefreshing:false,
                        dataSource:this.state.dataSource.cloneWithRows(cachedResults.items),
                    })
                }

            })
            .catch((error)=>{
                //更新数据源(可以是之前的缓存数据)
                if (page !== 0){
                    this.setState({
                        isLoadingTail:false
                    })
                }else {
                    this.setState({
                        isRefreshing:false
                    })
                }

            })

    },

    //刷新
    _onRefresh(){
        if (!this._hasMoreData() || this.state.isRefreshing){
            return
        }

        this._fetchData(0)
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


    renderRow(rowData) {
        return(
            <Item
                key={rowData._id}
                onSelect={() => this._goToDetail(rowData)}
                rowData={rowData}
            />
        )
    },

    //自定义加载
    _renderFooter(){
        if(!this._hasMoreData() && cachedResults.total !== 0){
            return(
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>--我们是有底线的--</Text>
                </View>
            )
        }

        if(!this.state.isLoadingTail){
            return <View style={styles.loadingMore}/>
        }

        return <ActivityIndicator style={styles.loadingMore}/>
    },


    //进入详情页
    _goToDetail(rowData){
        this.props.navigator.push({
            name: 'detail',
            component: VideoDetail,
            //要传递的参数
            params:{
                rowData: rowData
            }
        })
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
        height:width * 0.56,
        resizeMode:'cover'
    },
    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
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
    down:{
        fontSize:22,
        color:'#333'
    },

    up:{
        fontSize:22,
        color:'#ed7b66'
    },
    handleText:{
        left:12,
        fontSize:15,
        color:'#333'
    },

    handleTextUp:{
        left:12,
        fontSize:15,
        color:'#ed7b66'
    },
    commentIcon:{
        color:'#333',
        fontSize:22,
    },

    loadingMore:{
        marginVertical:20
    },

    loadingText:{
        color:'#777',
        textAlign:'center'
    }
});

module.exports = Video;