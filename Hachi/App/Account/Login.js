

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
} from 'react-native';

import Button from 'apsl-react-native-button'
var request = require('../Common/request')
var config = require('../Common/config')

var Account = React.createClass({

    getInitialState(){
        return({
            veriyCode:'',
            phoneNumber:'',
            codeSend:false
        })
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.signupBox}>
                    <Text style={styles.title}>快速登录</Text>
                    <TextInput placeholder='请输入手机号'
                               autoCaptialize='none'
                               autoCorrect={false}
                               keyboardType='number-pad'
                               style={styles.inputTextField}
                               onChangeText={(text)=>{
                                   this.setState({
                                       phoneNumber:text
                                   })
                               }}
                    />

                    {
                        this.state.codeSend
                            ?<View style={styles.verifyCodeBox}>
                                <TextInput placeholder='请验证码'
                                           autoCaptialize='none'
                                           autoCorrect={false}
                                           keyboardType='number-pad'
                                           style={styles.inputTextField}
                                           onChangeText={(text)=>{
                                               this.setState({
                                                   veriyCode:text
                                               })
                                           }}
                                />
                            </View>
                            :null
                    }

                    {
                        this.state.codeSend
                        ?<Button style={styles.btn}
                                 onPress={this._submit}
                                 textStyle={{fontSize:14, color:'#ee7c5c'}}>登录</Button>
                        :<Button style={styles.btn}
                                 onPress={this._sendVerfiyCode}
                                 textStyle={{fontSize:14, color:'#ee7c5c'}}>获取验证码</Button>
                    }
                </View>
            </View>
        );
    },

    //发送验证码
    _sendVerfiyCode(){
        var phoneNumber = this.state.phoneNumber
        if (!phoneNumber){
            return alert('手机号不能为空')
        }

        var body={
            phoneNumber:phoneNumber
        }
        var signup = config.api.base + config.api.signup
        request.post(signup, body)
            .then((data) => {
                if (data && data.success){
                    this._showVerify()
                }else {
                    alert('获取验证码失败，请检查手机号是否正确')
                }
            })
            .catch((error)=>{
                alert('获取验证码失败，请检查网络')
            })
    },

    //显示填写验证码
    _showVerify(){
        this.setState({
            codeSend:true
        })
    }

});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        backgroundColor: '#f9f9f9',
    },

    signupBox:{
        marginTop:30,
    },

    title:{
       marginBottom:20,
       color:'#333',
       fontSize:20,
       textAlign:'center'
    },

    inputTextField:{
        // flex:1,
        height:40,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:4,
        color:'#666',
        fontSize:16,
        backgroundColor:'#fff',
    },

    submitBtn:{
        backgroundColor:'transparent',
        marginTop:10,
        padding:10,
        borderRadius:4,
        borderColor:'#ee735c',
        color:'#ee735c',
        borderWidth:1
    },

    btn:{
        backgroundColor:'transparent',
        marginTop:10,
        padding:10,
        borderRadius:4,
        borderColor:'#ee735c',
        borderWidth:1
    }

});


//输出组件
module.exports = Account;