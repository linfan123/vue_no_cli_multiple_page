import Vue from '@vue'
import axios from 'axios'
import header from '@/components/header/header'
// 本地存储
import storeLocal from 'store';
//图片懒加载
import VueLazyload from 'vue-lazyload';
// 轮播
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
//mint-ui样式引入
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui'
Vue.use(MintUI);

Vue.prototype.$axios = axios
// Vue.use(VueLazyload);
window.$vue = (mixins) => {
  new Vue({
    el: '#app',
    mixins: [mixins],
    components: {
      'c-header': header
    }
  })
}