<template>
  <div class="app">

  </div>
</template>

<script>
  import './main.scss'
  import { createNamespacedHelpers } from 'vuex'
  const { mapGetters, mapActions, mapState } = createNamespacedHelpers('/')
  export default {
    name: '',
    data () {
      return {
      }
    },
    components: {},
    computed: {
      ...mapState([]),
      ...mapGetters([])
    },
    methods: {
      ...mapActions([])
    },
    watch: {},
    created () {},
    beforeDestroy () {}
  }
</script>
