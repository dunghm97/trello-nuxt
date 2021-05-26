<template>
  <v-app>
    <v-main>
      <!-- Content -->
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>
