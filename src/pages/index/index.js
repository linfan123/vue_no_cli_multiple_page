import './index.scss'

const mixins = {
  methods: {
    switchPage() {
      window.location.href = '/log.html'
    }
  }
}

$vue(mixins)