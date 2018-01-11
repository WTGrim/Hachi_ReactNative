

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
    AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
var {width, height} = Dimensions.get('window');

var Account = React.createClass({

    getInitialState(){
        return({
            user:this.props.user || {}
        })
    },

    componentDidMount(){
        AsyncStorage.getItem('user')
            .then((data)=>{
                var user

                if (data){
                    user = JSON.parse(data)
                }

                if (user && user.accessToken){
                    this.setState({
                        user:user
                    })
                }
            })
    },

    render() {
        var user = this.state.user
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Text style={styles.navBarTitle}>我的账户</Text>
                </View>

                {
                    !user.avatar
                    ?<TouchableOpacity style={styles.avatarContainer}>
                            <Image  source={{uri:user.avatar}} style={styles.avatarContainer}>
                                <View style={styles.avatorBox}>
                                    <Image
                                        source={{uri:user.avatar}}
                                        style={styles.avatar}
                                    />
                                </View>
                                <Text style={styles.avatarTip}>戳这里换头像</Text>
                            </Image>

                        </TouchableOpacity>
                    :<View style={styles.avatarContainer}>
                            <Text style={styles.avatarTip}>添加狗狗头像</Text>
                            <TouchableOpacity style={styles.avatorBox}>
                                <Icon
                                    name='ios-cloud-upload-outline'
                                    style={styles.plusIcon}
                                />
                            </TouchableOpacity>
                    </View>
                }

             </View>
         );
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    navBar:{
        flexDirection:'row',
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#ee735c'
    },

    navBarTitle:{
        flex:1,
        fontSize:16,
        color:'#fff',
        textAlign:'center',
        fontWeight:'600'
    },

    avatarContainer:{
        width:width,
        height:140,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#666'
    },

    avatarTip:{
        color:'#fff',
        backgroundColor:'transparent',
        fontSize:14
    },

    avatar:{
        marginBottom:15,
        width:width * 0.2,
        height:width * 0.2,
        resizeMode:'cover',
        borderRadius:width * 0.1,
        borderWidth:1,
        borderColor:'#ccc'
    },


    avatorBox:{
        marginTop:15,
        alignItems:'center',
        justifyContent:'center'
    },

    plusIcon:{
        padding:20,
        paddingLeft:25,
        paddingRight:25,
        color:'#999',
        backgroundColor:'#fff',
        borderRadius:8,
        fontSize:30
    }


});


//输出组件
module.exports = Account;