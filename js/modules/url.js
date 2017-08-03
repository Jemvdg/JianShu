define([
    'require',
    'jquery'
], function () {
    console.log('url')

    var host = 'http://localhost:3000/api/';
    return {
        login: host + 'login',
        regsiter: host + 'regsiter',
        banner: host + 'banner',
        topic: host + 'topic',
        title: host + 'title',
        recommend: host + 'recommend',
    };

});