<template>
  <main>
    <video :src="presentation.url" preload>
      <p>Your browser does not support video. <a :href="presentation.url">Here</a> is a direct link.</p>
    </video>
    <div class="controls">

    </div>
    <aside class="description">

    </aside>
  </main>
</template>

<script>
import * as firebase from 'firebase';

function refetchPresentation(presenationId) {
}

function refetchMetadata(presenationId) {

}

export default {
  name: 'presentation-view',
  props: [
    'presentationId',
  ],
  data() {
    return {
      presentation: {},
    };
  },
  methods: {
    fetchPresentation() {
      const presentationRef = firebase.storage().ref(`/uploads/${this.presentationId}`);
      return presentationRef.getDownloadURL()
        .then((downloadUrl) => {
          this.presentation.url = downloadUrl;
          return presentationRef.getMetadata()
            .then((metadata) => {
              
            })
            .catch((err) => {
              console.error('Error when fetching presentation metadata', err);
              return refetchMetadata(this.presentationId);
            });
        })
        .catch((err) => {
          console.error('Could not fetch presentation, trying again', err);
          return refetchPresentation();
        });
    },
  },
};
</script>

<style scoped>
main {

}
</style>
