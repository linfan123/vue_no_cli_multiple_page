import '../../log/log.scss'

const mixins = {
  data () {
    return {
      logData: []
    }
  },
  methods: {
    getData() {
      let that = this
      that.$axios.get('./../../../statics/data/logData.json').then((response) => {
        that.logData = response.data
      })
    },
    switchPage() {
      window.location.href = '/index.html'
    }
  },
  created() {
    this.getData()

    var mySwiper = new Swiper('.swiper-container', {
      autoplay: false,//可选选项，自动滑动
    })
    
    //如果你初始化时没有定义Swiper实例，后面也可以通过Swiper的HTML元素来获取该实例
    new Swiper('.swiper-container')
    // var mySwiper = document.querySelector('.swiper-container').swiper
  }
}

$vue(mixins)