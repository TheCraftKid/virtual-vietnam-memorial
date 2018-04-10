<template>
  <md-app>
    <md-app-toolbar :class="toolbarClasses">
      <div class="md-toolbar-row">
        <md-button class="md-icon-button" v-if="!onHomeScreen" v-on:click="navigateBack">
          <md-icon>arrow_back</md-icon>
        </md-button>
        <span class="md-title">{{ appTitle }}</span>
      </div>
      <div class="md-toolbar-row" v-if="onHomeScreen && periods.length > 0">
        <md-tabs class="md-primary" md-sync-route>
          <md-tab v-for="period in periods" :key="period" :to="'/period/' + period"
              :md-label="'Period ' + period" ></md-tab>
        </md-tabs>
      </div>
      <md-button class="md-fab md-accent" v-on:click="startUploadFlow" v-if="onHomeScreen">
        <md-icon>file_upload</md-icon>
      </md-button>
    </md-app-toolbar>
    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>
<script>
import { fetchClasses } from './scripts/presentationManager';

export default {
  name: 'memorial-app',
  data() {
    return {
      periods: [2, 3, 6, 8],
    };
  },
  computed: {
    toolbarClasses() {
      return `md-primary md-dense ${this.onHomeScreen && this.periods.length > 0 ? 'md-large' : ''}
              ${this.onPresentationScreen ? 'presentation-mode' : ''}`;
    },
    appTitle() {
      switch (this.$route.name) {
        case 'home':
        case 'home-period':
          return 'Virtual Vietnam Memorial';
        case 'upload':
          return 'Upload a Video';
        case 'about':
          return 'About the Virtual Vietnam Memorial';
        default:
        case 'present':
          return ''; // Intentionally empty
      }
    },
    onHomeScreen() {
      return this.$route.name === 'home' || this.$route.name === 'home-period';
    },
    onPresentationScreen() {
      return this.$route.name === 'present';
    },
  },
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
    startUploadFlow() {
      this.$router.push({
        name: 'upload',
      });
    },
    fetchPeriods() {
      return fetchClasses()
        .then((classes) => {
          this.periods = classes.splice(0);
        })
        .catch((err) => {
          console.error('Could not fetch classes', err);
        });
    },
  },
  mounted() {
    this.fetchPeriods();
  },
};
</script>

<style lang="scss">
.md-app {
  height: 100vh;
}

.md-app-content {
  height: 100%;
}

.md-button.md-fab {
  // Put FAB on edge of toolbar on desktop
  position: absolute;
  bottom: -28px;
  right: 40px;
}

.presntation-mode {
  background: transparent;
}
</style>
