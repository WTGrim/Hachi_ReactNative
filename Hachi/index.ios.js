/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';

var Main = require('./App/Main/Main')

export default class Hachi extends Component {
    render() {
        return (
            <Main />
        );
    }
}

AppRegistry.registerComponent('Hachi', () => Hachi);