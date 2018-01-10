

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

var Button = require('apsl-react-native-button')
import {CountDownText} from 'react-native-sk-countdown'

var request = require('../Common/request')
var config = require('../Common/config')


var Login = React.createClass({

    getInitialState(){
        return({
            verifyCode:'',
            phoneNumber:'',
            codeSend:false,
            countingDone:false
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
                                <TextInput placeholder='请输入验证码'
                                           autoCaptialize='none'
                                           autoCorrect={false}
                                           keyboardType='number-pad'
                                           style={styles.inputTextField2}
                                           onChangeText={(text)=>{
                                               this.setState({
                                                   verifyCode:text
                                               })
                                           }}
                                />

                                {
                                    this.state.countingDone
                                    ?<Button style={styles.verifyCodeAgain}
                                             textStyle={{fontSize:14, color:'#ee735c'}}
                                             onPress={this._sendVerfiyCode}>获取验证码</Button>
                                    :<CountDownText
                                            style={styles.countBtn}
                                            countType='seconds' // 计时类型：seconds / date
                                            auto={true} // 自动开始
                                            afterEnd={this._countingDone} // 结束回调
                                            timeLeft={60} // 正向计时 时间起点为0秒
                                            step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                                            startText='获取验证码' // 开始的文本
                                            endText='获取验证码' // 结束的文本
                                            intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调
                                     />
                                }
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
    },

    //倒计时结束
    _countingDone(){
        this.setState({
            countingDone:true
        })
    },

    //登录
    _submit(){
        var phoneNumber = this.state.phoneNumber
        var verifyCode = this.state.verifyCode

        if (!phoneNumber || !verifyCode){
            return alert('手机号或验证码不能为空')
        }

        var body={
            phoneNumber:phoneNumber,
            verifyCode:verifyCode
        }
        var verify = config.api.base + config.api.verify
        request.post(verify, body)
            .then((data) => {
                if (data && data.success){
                    //页面传递登录后的用户信息
                    this.props.afterLogin(data.data)
                }else {
                    alert('登录失败，请检查网络')
                }
            })
            .catch((error)=>{
                alert('获取验证码失败，请检查网络')
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

    inputTextField2:{
        flex:1,
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
    },
    verifyCodeBox:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    countBtn:{
        width:110,
        height:40,
        padding:10,
        marginLeft:8,
        backgroundColor:'white',
        color:'#ee735c',
        borderColor:'#ee735c',
        textAlign:'center',
        fontWeight:'600',
        fontSize:13,
        borderRadius:2
    },

    verifyCodeAgain:{
        width:110,
        height:40,
        padding:10,
        marginLeft:8,
        backgroundColor:'white',
        borderColor:'#ee735c',
        borderRadius:2
    }

});


//输出组件
module.exports = Login;