<div align="center">
<h1>CDNPlugins-webpack</h1>
<p>
  <strong>webpack插件【CDN】</strong>
</p>
<p>
  <sub>Made with ❤︎ by
    <a href="https://github.com/JousenZhou">JousenZhou</a>
  </sub>
</p>
<p>
<a href="https://github.com/JousenZhou/CDNPlugins-webpack"><img src="https://img.shields.io/badge/Github Page-JousenZhou-yellow" /></a>
<a href="https://github.com/JousenZhou"><img src="https://img.shields.io/badge/Author-Jousen-blueviolet" /></a>
</div>


<img align="left"   src="https://img.shields.io/badge/npm包名称-blueviolet" >cdn-plugins-jousenzhou

# Usage 

<img align="left"   src="https://img.shields.io/badge/example-vue-green" ><br>


```js
// vue.config.js
const CDNPlugins = require('cdn-plugins-jousenzhou');
module.exports = {
    configureWebpack:{
        plugins: [
            new CDNPlugins({
                devUsed: true,
                /*devUsed: {
                   js:true,
                   css:true
                },*/  
                css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.3/theme-chalk/index.min.css'],
                js: [
                    {
                        name: 'vue',
                        externals: 'Vue',
                        path: 
                        ['https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
                        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js']
                    }
                ]
            })
        ]
    }
};
```

| 参数  | 类型 | 描述 |
| :-------- | ---- | ----------------------------- |
| devUsed | boolean \| object | 开发环境是否使用插件。也可以对象形式控制css 或者 js |
| css | string[] | css外链地址数组 |
| js | object[] | name,externals 懂得都懂                                            <br>path cdn数组[防挂]    第一个地址挂了请求下一个地址 |
