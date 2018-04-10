<template>
  <md-app>
    <md-app-toolbar :class="toolbarClasses">
      <div class="md-toolbar-row">
        <md-button class="md-icon-button" v-if="!(onHomeScreen || onSplashScreen)"
          v-on:click="navigateBack">
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
      <md-button class="md-fab md-accent desktop-only" v-on:click="startUploadFlow" v-if="onHomeScreen">
        <md-icon>file_upload</md-icon>
      </md-button>
    </md-app-toolbar>
    <md-app-content>
      <router-view />
      <md-button class="md-fab md-accent mobile-only" v-on:click="startUploadFlow" v-if="onHomeScreen">
        <md-icon>file_upload</md-icon>
      </md-button>
    </md-app-content>
  </md-app>
</template>
<script>
import { fetchClasses } from './scripts/presentationManager';

export default {
  name: 'memorial-app',
  data() {
    return {
      periods: [],
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
        case 'splash':
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
    onSplashScreen() {
      return this.$route.name === 'splash';
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
          const classMappings = classes.map(period => period.period);
          this.periods = classMappings.splice(0);
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
  padding: 0px;
}

@media (min-width: 945px) {
  .md-app-toolbar:not(:md-dense) {
    height: 56px;
  }
}

@media(max-width: 600px) {
  .md-button.md-fab.mobile-only {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }

  .desktop-only {
    display: none;
  }
}

@media(min-width: 601px) {
  .md-button.md-fab.desktop-only {
    // Put FAB on edge of toolbar on desktop
    position: absolute;
    bottom: -28px;
    right: 40px;
  }

  .mobile-only {
    display: none;
  }
}

.presntation-mode {
  background: transparent;
}
</style>
