<template>
  <div class="d-block">
    <v-container class="trello-topbar" fluid>
      <v-row cols="1" align="center" justify="start">
        <v-col class="flex-grow-0 flex-shrink-0">
          <v-icon @click="drawer = true">mdi-menu</v-icon>
        </v-col>
        <v-col
          style="min-width: 100px max-width: 100%"
          class="flex-grow-1 flex-shrink-1"
        >
          <v-row no-gutters align="center" justify="center">
            <h3><nuxt-link to="/" class="logo">Trello</nuxt-link></h3>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="drawer" fixed left class="d-block">
      <v-container class="trello-topbar">
        <v-row
          no-gutters
          align="center"
          justify="space-between"
          style="margin: 7px auto"
        >
          <v-flex><v-icon @click="drawer = false">mdi-close</v-icon></v-flex>
          <v-row class="d-flex align-center justify-space-around">
            <div class="trello-user">
              Signed In as<br />
              {{ $nuxt.$fire.auth.currentUser.email }}
            </div>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-row>
        </v-row>
      </v-container>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <nuxt-link class="d-flex menu-item" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </nuxt-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-view-dashboard-variant-outline',
          title: 'My Boards',
          link: '/',
        },
        {
          icon: 'mdi-exit-to-app',
          title: 'Logout',
          link: '/auth/logout',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.menu-item {
  font-size: 14px;
}
</style>
