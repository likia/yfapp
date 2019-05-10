window.filters = {
  /**
   * 转换缩略图
   *
   * @param  String val  图片地址
   * @param  String name 缩略图名称
   * @return String      拼接url
   */
  thumb (val, name) {
    if (val.indexOf('?x-oss-process') !== -1) {
      return this.image(val)
    }
    return this.image(val + '?x-oss-process=style/' + name)
  },

  /**
   * 前端显示价格
   */
  price (val) {
    return (parseFloat(val) / 100).toFixed(2)
  },

  /**
   * 转图片
   */
  image: (val) => {
    if (/^http[s]{0,1}:/.test(val)) {
        return val
    }
    return urls.imgUrl + val
  },
}

/**
 * 服务端时间戳转日期
 */
Vue.filter('time', (v) => {
  return window.util.formatTime(v)
})

// 图片缩略图
Vue.filter('thumb', function (val, name) {
  return window.filters.thumb(val, name)
})

// 图片原图
Vue.filter('image', function (val) {
  return window.filters.image(val)
})

Vue.filter('price', (v) => {
  return window.filters.price(v)
})
