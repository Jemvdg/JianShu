require.config({

    // paths属性指定各个模块的加载路径。
    paths: {
        //设置需要引用/依赖的模块/库的别名
        jquery: 'lib/jquery',
        swiper: 'lib/jquery.swiper.min',
        bootstrap: 'lib/bootstrap',
        tem: 'lib/template-web',
        confirm: 'modules/confirm',
        mock: 'lib/mock',
    },
    map: {
        /**
         * 配置css插件的路径
         */
        '*': {
            'css': 'lib/css'
        }
    },

    // shim属性， 
    // 专门用来配置不兼容的模块。 
    //   理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。
    shim: { // 加载非规范的模块
        swiper: ['jquery', 'css!../css/modules/swiper.css'], //第一个参数是传入要依赖的模块，第二个参数自己文件本身的位置
        bootstrap: ['jquery']
    }
})