const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

// 添加样式源
const addStyleResource = rule => {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        resolve("src/styles/variables.less"),
        resolve("src/styles/mixin.less")
      ]
    });
};

module.exports = {
  // 设置本地接口代理
  devServer: {
    proxy: {
      "/api_host": {
        target: "http://dev-api.51zan.com",
        changeOrigin: true,
        pathRewrite: { "^/api_host": "" }
      }
    }
  },

  chainWebpack: config => {
    // CLI内部webpack配置
    // 设置可在全局引用的样式: 变量、函数
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );

    // 设置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@business", resolve("src/components/business"))
      .set("@config", resolve("src/config"))
      .set("@router", resolve("src/router"))
      .set("@services", resolve("src/services"))
      .set("@store", resolve("src/store"))
      .set("@styles", resolve("src/styles"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"));
  },

  css: {
    modules: true
  }
};
