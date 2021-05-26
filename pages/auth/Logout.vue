<template>
  <div>
    <h2 class="fancy-title">Sign Out</h2>
  </div>
</template>

<script>
export default {
  asyncData() {
    // eslint-disable-next-line no-undef
    $nuxt.$fire.auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened
      })
  },
}
</script>

<style></style>
