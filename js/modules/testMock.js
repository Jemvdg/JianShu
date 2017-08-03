define(function (require) {

    console.log('mock')

    var urlApi = require('./url'),
        Mock = require('mock');

    function dataMock() {
        this.mocks = []
    }

    dataMock.prototype.trriger = function () {
        this.mocks.forEach(function (item) {
            item();
        })
    }



    dataMock.prototype.add = function (fn) {
        this.mocks.push(fn);
    }



    var wholesMock = new dataMock();

    wholesMock.add(function () {
        Mock.mock(urlApi.banner, {
            success: true,
            data: {
                'sliders|5': [{
                    sliderImg: '@dataImage(1170x358)',
                }]
            },
        })
    })


    wholesMock.add(function () {
        Mock.mock(urlApi.topic, {
            success: true,
            data: {
                'topics|8': [{
                    title: '@ctitle(3,5)',
                    topicImg: '@dataImage(32x32)',
                }]
            },
        })
    })

    wholesMock.add(function () {
        Mock.mock(urlApi.title, {
            success: true,
            data: {
                'titles|8': [{
                    head: '@dataImage(26x26)',
                    cover: '@dataImage(123x97)',
                    name: '@cname',
                    time: '@time',
                    title: '@ctitle(3,20)',
                    text: '@cparagraph(2,10)',
                    type: '@ctitle(2,4)',
                    'readNum|500-2000': 0,
                    'comment|30-200': 0,
                    'like|10-20': 0,
                    'money|0-10': 0
                }]
            },
        })
    })

    wholesMock.add(function () {
        Mock.mock(urlApi.recommend, {
            success: true,
            data: {
                'recommends|210': [{
                    name: '@cname',
                    cover: '@dataImage(40x40)',
                    'readNum|500-2000': 0,
                }]
            },
        })
    })



    return wholesMock;

});