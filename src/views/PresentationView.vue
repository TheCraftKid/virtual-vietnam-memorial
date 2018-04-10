<template>
  <main>
    <video :src="presentation.url" preload>
      <p>Your browser does not support video.
        <a :href="presentation.url">Here</a> is a direct link.
      </p>
    </video>
    <div class="controls">

    </div>
    <aside class="description">

    </aside>
  </main>
</template>

<script>
import * as firebase from 'firebase';

function refetchPresentation(presentationId, attempt) {
  if (attempt > 3) {
    console.warn('Attempt 3 to fetch metadata failed');
    // TODO: Show error
    return null;
  }
  return firebase.firestore().doc(`/presentations/${presentationId}`).get();
}

function refetchMetadata(presentationId, attempt) {
  if (attempt > 3) {
    console.warn('Attempt 3 to fetch metadata failed');
    // TODO: Show error
    return null;
  }
  return firebase.firestore().doc(`/presentations/${presentationId}`).get();
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
          let attempt = 0;
          return presentationRef.getMetadata()
            .then((metadata) => {
              console.log('Presentation metadata:', metadata);
            }).catch((err) => {
              console.error('Error when fetching presentation metadata', err);
              attempt += 1;
              return refetchMetadata(this.presentationId, attempt);
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
