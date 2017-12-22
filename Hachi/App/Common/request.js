'use strick'

var queryString = require('query-string')
var _ = require('lodash')
var config = require('./config')
var request = {}

request.get = function (url, params) {
    if(params){
        url += '?' + queryString.stringify(params)
    }
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
}

request.post = function (url, body) {
    var options = _.extend(config.header, {
        body:JSON.stringify(body)
    })
    return fetch(url + 'POST', options)
        .then((response) => response.json())
}


module.exports = request

// fetch(this.props.api_url, {

// })