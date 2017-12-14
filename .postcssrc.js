// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "ie >= 9",
        "Firefox >= 20",
        "> 5%",
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31"
      ]
    },
    "postcss-opacity":{},//透明度兼容
    "cssgrace":{}//自动调整支持的旧版浏览器 //todo swiper3以上版本报错
  }
}
