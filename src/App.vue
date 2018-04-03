<template>
  <md-app>
    <md-app-toolbar>
      <router-link class="md-title" to="/">Virtual Vietnam Memorial</router-link>
    </md-app-toolbar>
    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<style lang="scss">

.md-app {
  height: 100vh;
}

.md-app-content {
  height: 100%;
}
</style>
