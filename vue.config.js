const CDNPlugins = require('./build/CDNPlugin');
module.exports = {
    configureWebpack:{
        plugins: [
            new CDNPlugins({
                devUsed: true,
                css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/theme-chalk/index.min.css'],
                js: [
                    {
                        name: 'vue',
                        externals: 'Vue',
                        path: ['https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js', 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js']
                    }
                ]
            })
        ]
    }
};