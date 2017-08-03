define(function (require) {
    console.log('unit')

    var $ = require('jquery'),
        tem = require('tem');



    function unit() {

    }

    unit.prototype = {
        constructor: unit,


        //渲染模板的函数 
        renderTem: function (domID, temID, data) {
            var html = tem(temID, data);
            $('#' + domID).html(html);
        }
    }


    return new unit();

});