// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';


Vue.config.productionTip = false;

Vue.use(VueResource);
// credentials 设为 true 用于 CORS 携带 Cookie
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});

// 本地开发环境
Vue.http.options.root = 'http://timeline.52byr.com/api';
// 线上环境

// filter
Vue.filter('time-filter', (value) => {
  // 半小时以内发布，显示“多少分钟以前发布”
  // 当天发布，仅显示除日期以外的时间，如“下午4:19:54”
  // 其余显示完整时间

  const date = new Date(value);
  const now = new Date();
  const diff = 30 * 60 * 1000;

  let ret;

  if (now - date < diff) {
    ret = `${parseInt((now - date) / (60 * 1000), 10)} 分钟前`;
  } else if (now.getFullYear() === date.getFullYear()
    && now.getMonth() === date.getMonth()
    && now.getDate() === date.getDate()) {
    ret = date.toLocaleTimeString();
  } else {
    ret = date.toLocaleString();
  }

  return ret;
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
