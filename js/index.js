require([
    'jquery',
    'bootstrap',
    'modules/api',
    'modules/url',
    'modules/unit',
    'modules/animationBall',
], function ($, boot, api, url, unit) {

    $(function () {
        initBanner();
        initTopic();
        initTitle();
        initRecommend();
        initSearch();
    })

    $('button').css({
        'outline': 'none',
        'boxShadow': 'none',
    });

    $('.code').on('mouseover', function () {
        $('.scan').show()
    }).on('mouseout', function () {
        $('.scan').hide()
    })


    // 搜索框匹配相关信息的函数
    function initSearch() {
        $('.search-box').on('input', function () {
            var arr = [];
            var val = $('.search-box').val();
            $('.search-menu dd').not('.search-menu .recent').not('.search-menu .no-search').remove();
            if (val.length > 0) {
                $('.search-menu .recent').hide();
                $.get('http://localhost:3000/api/recommend', function (data) {
                    var datas = JSON.parse(data);
                    $(datas.data.recommends).each(function (index, item) {
                        if (item.name.indexOf(val) >= 0) {
                            arr.push(item.name);
                        }
                    })
                    if (arr.length > 0) {
                        for (var i in arr) {
                            $('.search-menu').append('<dd class="search-data">' + arr[i] + '</dd>')
                        }
                        $('.search-menu .search-data').each(function (index, item) {
                            $(item).on('click', function () {
                                var textVal = $(item).text()
                                $('.search-box').val('')
                                $('.search-box').val(textVal)
                            })
                        })
                    }
                })
            } else {
                $('.search-menu .search-data').remove();
                $('.search-menu .recent').show();
            }

        })

        $('.search-menu .recent').each(function (index, item) {
            $(item).on('click', function () {
                var textVal = $(item).text()
                $('.search-box').val('')
                $('.search-box').val(textVal)
            })
        })
    }


    // 渲染banner模板
    function initBanner() {
        api.banner()
            .then(function (data) {
                unit.renderTem('banner_box', 'banner_tem', {
                    slider: data.data.sliders
                })
            })
    }

    // 渲染topic模板
    function initTopic() {
        api.topic()
            .then(function (data) {
                unit.renderTem('topic_box', 'topic_tem', {
                    topic: data.data.topics
                })
            })
            .then(function () {
                getTopic();
            })
    }

    //获取更多topic的函数
    function getTopic() {
        $('.get-more').click(function () {
            api.topic()
                .then(function (data) {
                    var topicNum = $('.more-topic .btn')
                    if (topicNum.length < 30) {
                        var valArr = data.data.topics;
                        console.log(valArr.length)
                        for (var i = 0; i < valArr.length; i++) {
                            var val = '<a class="btn" href="#"><img class="cover pull-left" src="' + valArr[i].topicImg + '" alt="fff">' + valArr[i].title + '</a> '
                            $('.get-more').before(val)
                        }
                    } else {
                        alert('已经没有更多了')
                    }

                })
        })

    }


    // 渲染titlec模板
    function initTitle() {
        api.titleList()
            .then(function (data) {
                unit.renderTem('title_box', 'title_tem', {
                    titleItem: data.data.titles
                })
            })
            .then(function () {
                getTitle();
            })

    }

    //获取更多title的函数
    function getTitle() {
        $('.getmore-title').click(function () {
            api.titleList()
                .then(function (data) {
                    var titleNum = $('.title-list .content')
                    if (titleNum.length < 50) {
                        var valArr = data.data.titles;
                        console.log(valArr)
                        for (var i = 0; i < valArr.length; i++) {
                            var val = '<div class="content">' + '<div class="writer">' +
                                '<p><img src="' + valArr[i].head + '" alt="fff">' + valArr[i].name + '<span>' + valArr[i].time + '</span></p>' +
                                '</div><div class="title-heading">' + valArr[i].title + '</div>' +
                                ' <div class="text">' + valArr[i].text + '</div>' +
                                '<div class="title-info"><span class="label text-center ">' + valArr[i].type + '</span>' +
                                ' <span class="views details"><i class="fa fa-eye"></i>' + valArr[i].readNum + '</span>' +
                                '<span class="comments details"><i class="fa fa-comment"></i>' + valArr[i].comment + '</span>' +
                                '<span class="likes details"><i class="fa fa-heart"></i>' + valArr[i].like + '</span>' +
                                '<span class="awards details"><i class="fa fa-money"></i>' + valArr[i].money + '</span>' +
                                '</div><img class="cover img-responsive" src="' + valArr[i].cover + '" alt="fff"></div>';
                            $('.getmore-title').before(val)
                        }
                    } else {
                        alert('已经没有更多了')
                    }

                })
        })

    }


    // 渲染recommend模板
    function initRecommend() {
        api.recommendList()
            .then(function (data) {
                var valArr = data.data.recommends;
                var pageNum = Math.ceil(valArr.length / 5);
                $('.all-page').html(pageNum)
                unit.renderTem('recommend_box', 'recommend_tem', {
                    recommendItem: data.data.recommends
                });
                return data;
            })
            .then(function (data) {
                var valArr = data.data.recommends;
                $('.page-next').click(function () {
                    $('.page-pre').removeClass('disabled')
                    var pageNum = Math.ceil(valArr.length / 5);
                    var pageNow = Number($('.show-page').html());
                    if (Number(pageNow) < Number(pageNum)) {
                        $('#recommend_box').children().remove();
                        var pageIndex = pageNow * 5;
                        pageNow++;
                        $('.show-page').html(pageNow);
                        for (var i = pageIndex; i < pageIndex + 5; i++) {
                            console.log(i)
                            var val = '<div class="writer-info"><img class="pull-left img-responsive" src="' + valArr[i].cover + '" alt="fff">' +
                                '<p class="name">' + valArr[i].name + '<span class="pull-right">+关注</span></p>' +
                                '<p class="detail">写了<span>' + valArr[i].readNum + '字</span> - <span>17.6k喜欢</-span></p>';
                            $('#recommend_box').append(val)
                        }
                    } else {
                        alert('已经是最后一页了')
                        $('.page-next').addClass('disabled')
                    }
                })
                $('.page-pre').click(function () {
                    $('.page-next').removeClass('disabled')
                    var pageNow = Number($('.show-page').html());
                    if (Number(pageNow) > 1) {
                        $('#recommend_box').children().remove();
                        var pageIndex = pageNow * 5;
                        pageNow--;
                        $('.show-page').html(pageNow);
                        for (var i = (pageIndex - 10); i < pageIndex - 5; i++) {
                            console.log(i)
                            var val = '<div class="writer-info"><img class="pull-left img-responsive" src="' + valArr[i].cover + '" alt="fff">' +
                                '<p class="name">' + valArr[i].name + '<span class="pull-right">+关注</span></p>' +
                                '<p class="detail">写了<span>' + valArr[i].readNum + '字</span> - <span>17.6k喜欢</-span></p>';
                            $('#recommend_box').append(val)
                        }
                    } else {
                        alert('已经是第一页了')
                        $('.page-pre').addClass('disabled')
                    }
                })
            })
    }




})