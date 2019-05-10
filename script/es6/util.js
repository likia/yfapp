const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

let frames = []

/**
 * saveFrame - 保存当前页面
 *
 * @param  {type} url description
 * @return {type}     description
 */
const saveFrame = (url) => {
  localStorage.setItem('currentUrl', url)
  const index = frames.findIndex(item => {
    return item == url
  })
  if (index == -1) {
    frames.push(url);
    localStorage.setItem('frames', JSON.stringify(frames));
  }
}

export default {
  /**
   * 注册当前页面的下拉刷新
   */
  pullRefresh (onRefresh) {
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: '',
        bgColor: '#fff',
        textColor: '#333',
        textDown: '',
        textUp: '松开刷新页面...',
        showTime: false
    }, function(r, e) {
      if (typeof onRefresh === 'function') {
        onRefresh()
      }
      api.refreshHeaderLoadDone();
    });
  },

  /**
   * 时间戳
   */
  timestamp () {
    return Math.floor((new Date()).getTime()/1000)
  },

  /**
   * 多图预览
   *
   * @param  Array list 相册列表
   * @param  String img  当前图
   * @return void
   */
  showGallery (list, img, onClosed) {
    const index = list.findIndex(item => {
      return img == item
    })
    api.openWin({
        name: 'gallery',
        bounces: false,
        // slidBackEnabled: false,
        animation: {
          type:"push",                //动画类型（详见动画类型常量）
          subType:"from_right",       //动画子类型（详见动画子类型常量）
          duration: 300                //动画过渡时间，默认300毫秒
        },
        url: 'widget://html/common/gallery.html',
        pageParam: {
          list: list,
          index: index,
          onClosed: onClosed
        }
    });
  },

  switchWindow (url, data) {


  },

  /**
   * 跳页面
   */
  switchFrame(url, data, bounce) {
    if (bounce == undefined) {
      bounce = true
    }
    const top = localStorage.getItem('headerH');
    const bottom = localStorage.getItem('footerH');

    const frames = JSON.parse(localStorage.getItem('frames'))

    if (frames) {
      setTimeout(() => {
        frames.forEach(item => {
          if (url != item) {
            log('hide:' + item)
            api.setFrameAttr({
                name: item,
                hidden: true
            });
          } else {
            log('show:' + item)
            api.setFrameAttr({
                name: item,
                hidden: false
            });
          }
        })
      }, 0)
    }
    api.openFrame({
        name: url,
        url: 'html/' + url,
        bounces: bounce,
        pageParam: data,
        useWKWebView: true,
        overScrollMode: 'scrolls',
        rect: { // 推荐使用Margin布局，用于适配屏幕的动态变化
            marginTop: top, // main页面距离win顶部的高度
            marginBottom: bottom,
            w: 'auto' // main页面的宽度 自适应屏幕宽度
        }
    });
    saveFrame(url)
    api.sendEvent({
        name: 'switchFrame',
        extra: {
            url: url,
            data: data
        }
    });
  },


  /**
   * 服务端时间戳转日期
   *
   * @param  Date ts 时间戳
   * @return String    日期
   */
  formatTime (ts) {
     const date = new Date(parseInt(ts) * 1000)

     const year = date.getFullYear()
     const month = date.getMonth() + 1
     const day = date.getDate()
     const hour = date.getHours()
     const minute = date.getMinutes()
     const second = date.getSeconds()

     return formatNumber(year) + '年' + formatNumber(month) + '月' + formatNumber(day) + '日'+' '+ [hour, minute, second].map(formatNumber).join(':')
   }
}
