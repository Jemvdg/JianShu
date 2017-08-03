define(function (require) {

    console.log('api')

    var $ = require('jquery');
    var urlApi = require('./url'),
        testMock = require('./testMock')


    testMock.trriger(); //mock生成数据

    function Api() {

    };


    Api.prototype.login = function (arg) {
        var dtd = $.Deferred();
        $.post(urlApi.login, arg, function (data) {
            var val = JSON.parse(data);
            if (val.success) {
                dtd.resolve(val)
            }
        });
        return dtd;
    }


    Api.prototype.regsiter = function (arg) {
        var dtd = $.Deferred();
        $.post(urlApi.regsiter, arg, function (data) {
            var val = JSON.parse(data);
            if (val.success) {
                dtd.resolve(val)
            }
        });
        return dtd;
    }


    Api.prototype.banner = function (arg) {
        var dtd = $.Deferred();
        $.get(urlApi.banner, arg, function (data) {
            var val = JSON.parse(data);
            if (val.success) {
                dtd.resolve(val);
            }
        });
        return dtd;
    }

    Api.prototype.topic = function (arg) {
        var dtd = $.Deferred();
        $.get(urlApi.topic, arg, function (data) {
            var val = JSON.parse(data);
            if (val.success) {
                dtd.resolve(val)
            }
        });
        return dtd;
    }

    Api.prototype.titleList = function (arg) {
        var dtd = $.Deferred();
        $.get(urlApi.title, arg, function (data) {
            var val = JSON.parse(data);
            if (val.success) {
                dtd.resolve(val)
            }
        });
        return dtd;
    }
    Api.prototype.recommendList = function (arg) {
        var dtd = $.Deferred();
        $.get(urlApi.recommend, arg, function (data) {
            var val = JSON.parse(data);
            if (val.success) {
                dtd.resolve(val)
            }
        });
        return dtd;
    }





    return new Api();

});