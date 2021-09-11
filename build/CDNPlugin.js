const cheerio = require("cheerio");
// 自定义webpack插件
module.exports = class {
  constructor({ devUsed = false, css = [], js = [] }) {
    this.devUsed = devUsed;
    this.css = css;
    this.js = js;
  }
  apply(compiler) {
    let { js, css } = this;
    // dev使用模式 生产调用
    if (this.devUsed || compiler.options.mode === "production") {
      // 修改默认配置
      compiler.options.externals = js.reduce((x, y) => {
        return { ...x, [y.name]: y.externals };
      }, {});
      // name 插件名称
      compiler.hooks.compilation.tap({ name: "CDN-Plugin" }, (compilation) => {
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          function (htmlPluginData) {
            const { html } = htmlPluginData;
            const $ = cheerio.load(html);
            const Js = js.reduce((str, { path = [], externals }) => {
              let em = path.reduce((x, url, index) => {
                return `${x}${
                  index === 0
                    ? `<script src='${url}'></script>`
                    : `<script>window['${externals}'] || document.write('<script src="${url}"><script>')</script>`
                }`;
              }, "");
              return `${str}${em}`;
            }, "");
            const Css = css.reduce((str, link) => {
              return `${str}<link href="${link}" rel="preload" as="style">`;
            }, "");
            const header = $("head");
            header.prepend(Css);
            header.prepend(Js);
            Object.assign(htmlPluginData, { html: $["html"]() });
          }
        );
      });
    }
  }
};
