

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,  //判断当前运行的系统
    Navigator
} from 'react-native';

//导入外部组件类
import TabNavigator from 'react-native-tab-navigator';

var Icon = require('react-native-vector-icons/Ionicons')
var Video = require('../Video/Video');
var Creation = require('../Creation/Creation');
var Account = require('../Account/Account');

var Main =  React.createClass({

    //初始化函数(状态机)
    getInitialState(){
        return{
            selectedTab:'video'
        }
    },

    render() {
        return (
            <TabNavigator>
                {/**视频*/}
                {this.renderTabBarItem('视频', 'tab_activity_normal_27x27_', 'tab_activity_inverse_27x27_highlighted', 'video', '视频', Video)}

                {/**创作*/}
                {this.renderTabBarItem('创作', 'tab_trends_normal_27x27_', 'tab_trends_inverse_27x27_highlighted', 'creation', '创作', Creation)}

                {/**我的*/}
                {this.renderTabBarItem('我的', 'tab_my_normal_27x27_', 'tab_my_inverse_27x27_highlighted', 'account', '我的', Account)}

            </TabNavigator>
        );
    },

    //每一个TabBarItem
    renderTabBarItem(title, iconName, selectedIconName, selectedTab, componentName, component){
        return(
            <TabNavigator.Item
                // title={title}   //这里传递变量一定要加上大括号
                renderIcon={() => <Image source={{uri:iconName}} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={{uri:selectedIconName}} style={styles.iconStyle}/>}
                onPress={() => {this.setState({selectedTab:selectedTab})}}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
            >
                <Navigator
                    initialRoute={{name:componentName, component:component}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return<Component {...route.passProps} navigator={navigator}/>
                    }}
                />

            </TabNavigator.Item>

        )
    }
});

const styles = StyleSheet.create({
    iconStyle:{
        width:Platform.OS === 'ios' ? 27 : 22,
        height:Platform.OS === 'ios' ? 27 : 22
    },

    selectedTitleStyle:{
        color:'rgba(39,198,214,1.0)'
    }

});

//输出组件
module.exports = Main;