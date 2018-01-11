

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

import Icon from 'react-native-vector-icons/Ionicons';
var {width, height} = Dimensions.get('window');

var Account = React.createClass({
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Text style={styles.navBarTitle}>我的账户</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarTip}>添加狗狗头像</Text>
                    <TouchableOpacity style={styles.avatorBox}>
                        <Icon
                            name='ios-cloud-upload-outline'
                            style={styles.plusIcon}
                        />
                    </TouchableOpacity>
                </View>
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
        backgroundColor:'#eee'
    },

    avatarTip:{

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