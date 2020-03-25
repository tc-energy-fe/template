<template>
  <div class="login">

  </div>
</template>

<script>
  import './login.scss'
  import { createNamespacedHelpers } from 'vuex'
  const { mapGetters, mapActions, mapState } = createNamespacedHelpers('login')
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
