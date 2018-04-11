<template>
  <main>
    <div class="wrapper">
      <section id="videoBox">
        <md-card>
          <input class="hidden-input" type="file"  accept="video/*" ref="fileInput">
          <div class="video-info" v-if="file">
            <span class="uploaded-message">
              <p>Video chosen. Please update your project's information.</p>
              <p>Video size: {{ `${sizeModifier}` }}</p>
              <div class="choose-another">
                <span>Or:</span>
                <md-button v-on:click="triggerFilePicker">Choose another</md-button>
              </div>
            </span>
            <div class="progress-box" v-if="uploading">
              <md-progress-bar class="md-accent" md-mode="indeterminate" :md-value="uploadProgress">
              </md-progress-bar>
            </div>
          </div>
          <div id="dropZone" class="video-container" ondrop="handleDroppedFile" v-else>
            <img class="main-thumbnail" :src="tempThumbnail" :alt="projectInfo.videoTitle"
                v-if="tempThumbnail !== ''">
            <div class="upload-info-box">
              <div class="upload-info-row">
                <md-icon class="md-size-3x">movie</md-icon>
                <div class="drag-upload-label">Drag a file to upload it, or</div>
                <md-button class="md-primary" v-on:click="triggerFilePicker">
                  Upload manually
                </md-button>
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
          <md-datepicker v-model="projectInfo.birthday">
            <label>Birthday</label>
          </md-datepicker>
          <md-datepicker v-model="projectInfo.dayOfDeath">
            <label>Day of death</label>
          </md-datepicker>
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
            <!-- <md-list>
              <md-list-item>
                <md-checkbox v-model="uploadData.isPrivate"></md-checkbox>
                <span class="md-list-item-text">Upload privately?</span>
              </md-list-item>
              <md-list-item>
                <md-checkbox v-model="uploadData.transcribeSpeech"></md-checkbox>
                <span class="md-list-item-text">Transcribe speech in video?</span>
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
            </md-list> -->
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
              <md-option v-for="period in periods" :key="period.name" :value="period.period">
                {{ period.name }}
              </md-option>
            </md-select>
          </md-field>
          <div class="verify-box">
            <div class="integrity-statement">
            <md-checkbox v-model="integrityStatementChecked">
            </md-checkbox>
              <b>
                This video is my own and I have not plagiarized work from other students or
                individuals. I understand that my I may be subject to consequences if my teacher
                finds out I didn't cite my sources properly.
              </b>
            </div>
          </div>
          <md-button class="md-primary" :disabled="!integrityStatementChecked" 
            v-on:click="finishUpload">
            Upload now
          </md-button>
        </md-card>
      </section>
      <md-snackbar :md-duration="40000" :md-active.sync="error.unrecoverableError" md-persistent>
        <span>Choose a video to upload then try again.</span>
      </md-snackbar>
      </section>
      <md-snackbar :md-duration="40000" :md-active.sync="error.showMissingInfoError" md-persistent>
        <span>Make sure you have all your project's info, then try again.</span>
      </md-snackbar>
      <md-snackbar :md-duration="4000" :md-active.sync="error.showChooseVideoError" md-persistent>
        <span>Whoops, something wrong happened. Refresh the page and try again.</span>
      </md-snackbar>
    </div>
  </main>
</template>

<script>
import { uploadPresentation, fetchClasses } from '../scripts/presentationManager';

export default {
  name: 'upload-screen',
  data() {
    return {
      uploadData: {
        isPrivate: false,
        transcribeSpeech: false,
        thumbnailUrl: '',
      },
      uploader: {
        name: '',
        period: -1,
      },
      file: '',
      projectInfo: {
        videoTitle: '',
        bytesSize: 0,
      },
      uploadProgress: 0,
      uploading: false,
      periods: [],
      tempThumbnail: null,
      integrityStatementChecked: false,
      error: {
        showChooseVideoError: false,
        unrecoverableError: false,
        showMissingInfoError: false,
      },
    };
  },
  computed: {
    fileChosen() {
      return this.file != null;
    },
    sizeModifier() {
      // http://codeaid.net/javascript/convert-size-in-bytes-to-human-readable-format-(javascript)#comment-1
      const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
      if (this.size == 0) {
        return '0 bytes';
      }
      const i = parseInt(Math.floor(Math.log(this.projectInfo.bytesSize) / Math.log(1024)));
      return Math.round(this.projectInfo.bytesSize / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
  },
  methods: {
    finishUpload() {
      if (!this.file) {
        this.error.showChooseVideoError = true;
        return;
      }
      uploadPresentation(this.file, {
        presentationMetadata: this.projectInfo,
        uploaderMetadata: this.uploader,
        videoMetadata: this.uploadData,
      })
      .then(this.onUploadDone)
      .catch((err) => {
        console.error('Error when ', err);
      });
    },
    /**
     * Redirects the site to view the video on the present screen.
     * 
     * @param {string} downloadLink A plain text link to the raw uploaded video file
     */
    onUploadDone({ downloadLink, presentationId }) {
      console.log(downloadLink, presentationId);
      this.$router.replace({
        name: 'present',
        props: {
          presentationId,
        },
        query: {
          downloadUrl: downloadLink,
          from_upload: true,
        },
      });
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDroppedFile(event) {
      console.log('File dropped');
      event.preventDefault();
    },
    handleFiles(event) {
      console.log(event);
      const files = event.srcElement.files;
      if (files.length !== 1) {
        console.error(`Expected 1 file, got ${files.length}`);
        // TODO: Show error toast
        return;
      }
      [this.file] = files;
      console.log(this.file);
      this.error.showChooseVideoError = false;
      this.projectInfo.videoTitle = this.file.name;
      this.projectInfo.bytesSize = this.file.size;
    },
    triggerFilePicker() {
      this.$refs.fileInput.click();
    },
    /**
     * @return True if the input are not empty, false otherwise
     */
    validate() {
      if (this.period === -1) {
        this.showMissingInfoError = true;
        return false;
      }
      if (this.name === '') {
        this.showChooseVideoError = true;
      }
    },
    fetchPeriods() {
      return fetchClasses()
        .then((periods) => {
          this.periods = periods.splice(0);
        }).catch((err) => {
          console.error('Error when fetching class periods', err);
          this.error.unrecoverableError = true;
        });
    },
  },
  mounted() {
    this.fetchPeriods();
    this.$refs.fileInput.onchange = this.handleFiles;
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: center;

  section {
    .md-card {
      padding: 24px 16px 16px;
      margin-top: 8px;
      max-width: 600px;
    }
  }

  #dropZone {
    background: #E0E0E0;
    min-height: 256px;
    min-width: 256px;
    border-radius: 50%;
  }

  .wrapper {
    display: block;
  }

  @media (min-width: 1280px) {
    .wrapper {
      display: grid;
      grid-gap: 8px;
      grid-template-columns: minmax(600px, 1fr) 1fr;
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: minmax(1fr, 600px) 1fr;
  }

  .upload-info-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .verify-box {
    height: 72px;
    display: block;

    .integrity-statement {
      display: flex;
      margin-bottom: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .md-button {
      height: 128px;
      padding-top: 56px;
    }
  }

  .upload-info-row {
    display: block;
    min-width: 172px;
    text-align: center;

    .md-icon {
      margin: 16px;
    }
  }

  .hidden-input {
    display: none;
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
}
</style>
