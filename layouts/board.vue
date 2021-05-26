<template>
  <v-app>
    <Navbar />
    <!-- content -->
    <nuxt />
  </v-app>
</template>
<script>
import Navbar from './navbar'

export default {
  components: {
    Navbar,
  },
  middleware: ['auth'],
}
</script>
<style lang="scss">
.d-block {
  .trello-topbar {
    background-color: yellow;
  }
}
</style>
