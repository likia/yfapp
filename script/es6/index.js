// import Http from './http'
// import util from './util'
// import global from './global'
//
// window.util = util
// window.Http = Http
// window.global = global

window.log = (obj) => {
  console.log(
    JSON.stringify(obj)
  );
}

//
// 导入Vue相关
//


// 懒加载
// Vue.use(vant.Lazyload);

import './vue/filter'
// 组件
import test from './vue/component/test.vue'


Vue.component('m-test', test)
