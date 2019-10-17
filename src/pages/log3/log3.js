import './log3.scss'

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
  }
}

$vue(mixins)