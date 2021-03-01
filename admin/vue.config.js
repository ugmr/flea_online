const Timestamp = new Date().getTime();

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    output: {
      filename: `[name].[hash].js`,
      chunkFilename: `[name].[hash].js`,
    },
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    https: false,
    hotOnly: false,
    proxy: {
      '/admin/api': {
        target: 'http://localhost:3000', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
      }
    },
  }
};
