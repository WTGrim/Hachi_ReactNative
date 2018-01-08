
'use strick'

module.exports = {
    header:{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    },

    api:{
        base:'http://rap2api.taobao.org/app/mock/2210/',
        videolist:'GET//api/videolist',
        up: 'POST/api/up',
        comment:'GET/api/comments',
        submitComment:'POST/api/submitComment',
        signup:'POST/api/u/signup',
        verify:'POST/api/u/verify'
    }
}