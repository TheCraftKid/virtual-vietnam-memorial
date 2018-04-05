<template>
  <main>
    <div class="wrapper">
      <section id="videoBox">
        <md-card>
          <div id="dropZone" class="video-container" ondrop="handleDroppedFile">
            <img :src="uploadData.thumbnailUrl" :alt="uploadData.videoTitle" v-if="uploadData.thumbnailUrl != ''">
            <div class="person-info">
              <div class="person-info-row">
                <div>Drag a file to upload it</div>
                <md-field>
                  <label for="uploadFile">Or upload it manually</label>
                  <md-file v-model="file" v-on:md-changed="onFileAdded" required></md-file>
                </md-field>
              </div>
            </div>
          </div>
        </md-card>
        <md-card>
          <span class="md-title">Project Info</span>
          <md-field>
            <label for="personName">Person Name</label>
            <md-input v-model="projectInfo.name" name="personName"></md-input>
          </md-field>
          <md-field>
            <label for="personBirthday">Person's Day of Birth</label>
            <md-input v-model="projectInfo.birthday" name="personBirthday"></md-input>
          </md-field>
          <md-field>
            <label for="deathDate">Day of Death</label>
            <md-input v-model="projectInfo.dayOfDeath" name="deathDate"></md-input>
          </md-field>
          <md-field>
            <label for="hometown">Hometown</label>
            <md-input v-model="projectInfo.hometown" name="hometown"></md-input>
          </md-field>
          <md-field>
            <label for="wayOfDeath">How he/she died</label>
            <md-input v-model="projectInfo.wayOfDeath" name="wayOfDeath"></md-input>
          </md-field>
          <md-field>
            <label for="placeOfDeath">Location of Death</label>
            <md-input v-model="projectInfo.placeOfDeath" name="placeOfDeath"></md-input>
          </md-field>
          <md-field>
            <label for="burialPlace">Place of Burial</label>
            <md-input v-model="projectInfo.placeOfBurial" name="placeOfBurial"></md-input>
          </md-field>
        </md-card>
      </section>
      <section id="metadataBox">
        <md-card>
          <div class="video-info">
            <span class="md-title">Video info</span>
            <md-field>
              <label for="videoTitle">Video title</label>
              <md-input v-model="projectInfo.videoTitle" name="videoTitle"></md-input>
            </md-field>
            <md-list>
               <md-list-item>
                 <span class="md-list-item-text">Upload privately?</span>
                 <md-switch v-model="uploadData.isPrivate"></md-switch>
               </md-list-item>
               <md-list-item>
                 <span class="md-list-item-text">Transcribe speech in video?</span>
                 <md-switch v-model="uploadData.transcribeSpeech"></md-switch>
               </md-list-item>
                <md-menu md-direction="top-end">
                  <md-button class="info-button md-icon-button" md-menu-trigger>
                    <md-icon>info</md-icon>
                  </md-button>
                  <md-menu-content>
                    This will make your video only available to those with the class code, not
                    to the public.
                  </md-menu-content>
                </md-menu>
              <md-switch v-model="uploadData.transcribeSpeech" name="transcribeSpeech">
                <label for="transcribeSpeech">Transcribe speech in video?</label>
              </md-switch>
            </md-list>
          </div>
          <div class="debug">
            <h2>Debug Data</h2>
            <p>Upload data: {{ uploadData }}</p>
            <p>Project data: {{ projectInfo }}</p>
          </div>
        </md-card>
        <md-card>
          <span class="md-title">Uploader info</span>
          <md-field>
            <label for="uploaderName">Name</label>
            <md-input v-model="uploader.name"></md-input>
          </md-field>
          <md-field>
            <label for="uploaderPeriod">Class Period</label>
            <md-select v-model="uploader.period" name="uploaderPeriod">
              <md-option v-for="period in periods" :key="period" value="period">Period {{ period }}</md-option>
            </md-select>
          </md-field>
        </md-card>
      </section>
    </div>
  </main>
</template>

<script>
import * as firebase from 'firebase';
import { uploadPresentation, fetchClasses } from '../scripts/presentationManager';

export default {
  name: 'upload-screen',
  data() {
    return {
      uploadData: {
        isPrivate: false,
        transcribeSpeech: false,
        videoTitle: '',
        thumbnailUrl: '',
      },
      uploader: {
        name: '',
        period: -1,
      },
      file: null,
      projectInfo: {},
      periods: [],
    };
  },
  methods: {  
    upload() {
      return uploadPresentation()
        .catch((err) => {
          console.error('Could not upload presentation', err);
          // TODO: Add snackbar to notify user
        });
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDroppedFile(event) {
      console.log('File dropped');
      event.preventDefault();


    },
    onFileAdded(fileList) {

    },
    validate() {
      if (this.period == -1) {
        // Fail here
      }
    },
    fetchPeriods() {
      return fetchClasses();
    },
  },
  mounted() {
    this.fetchPeriods();
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

section {
  .md-card {
    padding: 24px 16px 16px;
  }

  .md-card:not(:first-child) {
    margin-top: 8px;
  }
}

#dropZone {
  background: #E0E0E0;
  min-height: 256px;
  min-width: 256px;
  border-radius: 50%;
}

.wrapper {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: minmax(600px, 1fr) 1fr;
}

.card-container {
  display: grid;
  grid-template-columns: minmax(1fr, 600px) 1fr;
}

.person-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.person-info-row {
  display: block;
}

.vert-centered-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
