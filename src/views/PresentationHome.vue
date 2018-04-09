<template>
  <main>
    <div class="grid" v-if="loaded">
      <div class="items">
        <div class="grid-item" v-for="presentation in presentations" :key="presentation.id">
          <img :src="presentation.thumbnail" :alt="'Presentation for ' + presentation.name">
          <div class="description-wrapper">
            <span>{{ presentation.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-box" v-else>
      <div style="display: block;">
        <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
        <span class="md-subheader">Loading presentations...</span>
      </div>
    </div>
  </main>
</template>

<script>
import { getPresentations } from '../scripts/presentationManager';

export default {
  name: 'presentation-home',
  props: [
    'classPeriod',
  ],
  data() {
    return {
      presentations: [],
      loaded: false,
    };
  },
  methods: {
    fetchPresentations() {
      return getPresentations(this.classPeriod)
        .then((presentations) => {
          console.log('Presentations loaded.');
          this.presentations = presentations.slice(0);
          this.loaded = true;
        })
        .catch((err) => {
          console.error('Could not display all presentations', err);
        });
    },
    launchPresentation(presentationId) {
      this.$router.push({
        name: 'present',
        params: {
          id: presentationId,
        },
      });
    },
  },
  mounted() {
    this.fetchPresentations();
  },
};
</script>

<style scoped>
.md-fab {
  position: relative;
  bottom: 16px;
  right: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 16px;
  padding: 16px;
}

.items {
  display: flex;
  grid-column-start: 3;
  grid-column-end: 11;
}

.grid-item {
  height: 128px;
  margin: 8px;
}

.loading-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
</style>
