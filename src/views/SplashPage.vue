<template>
  <main>
    <section id="carousel">
      <img v-for="(thumbnail, index) in thumbnails" :key="index" :src="thumbnail.src"
        :alt="thumbnail.title">
    </section>
    <section id="marquee">
      <div class="wrapper">
        <div class="marquee-box">
          <div class="marquee-text">
            <b>Honoring those who gave their lives in the Vietnam War.</b>
          </div>
        </div>
      </div>
    </section>
    <section id="about">
      <div class="wrapper">
        <div class="horizontal-container">
          <section class="three-part">
            <div class="md-title">About the Virtual Vietnam Project</div>
            <div class="info-card">
              <div class="info-title">
              </div>
              <div class="info-description"></div>
            </div>
          </section>
          <section class="about-main">
            <p>
              After reading <i>The Things They Carried</i> by O'Brien, a class in Schertz, TX
              started a project to honor a serviceman from the Vietnam Memorial wall. Each student
              would choose someone off the wall, study him, and then make a video dedicating his
              life.
            </p>
            <p>
              This website is a place to honor and uphold those Americans who had no choice in
              fighting in Vietnam yet paid the ultimate sacrifice.
            </p>
            <div class="end-box">
              <router-link class="about-read-more" to="/about">
                More about the Virtual Vietnam Memorial
              </router-link>
            </div>
          </section>
        </div>
      </div>
    </section>
    <section id="callToAction">
      <div class="wrapper-main">
        <div class="wrapper">
          <p>We're currently open for students to upload their video projects.</p>
          <md-button class="md-primary" v-on:click="startUpload">Upload your project</md-button>
        </div>
        <div class="wrapper">
          <p>Or just watch others' videos:</p>
          <md-button to="/period">View presentations</md-button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { fetchThumbnails as getThumbnails } from '../scripts/splashPage';

export default {
  name: 'splash-page',
  data() {
    return {
      thumbnails: [],
    };
  },
  methods: {
    fetchThumbnails() {
      getThumbnails()
        .then((thumbnails) => {
          console.log('Video thumbnails successfully fetched');
        })
        .catch((err) => {
          console.error('Could not get thumbnails', err);
        });
    },
    startUpload() {
      this.$router.push({
        name: 'upload',
        query: {
          utm_source: 'homescreen',
        },
      });
    },
  },
  mounted() {
    this.fetchThumbnails();
  },
};
</script>

<style lang="scss">
section#carousel {
  display: inline;
  overflow: hidden;

  img {

  }
}

.wrapper {
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.horizontal-container {
  display: block;
  max-width: 600px;

  .end-box {
    text-align: right;
  }
}

.about-read-more {
  text-align: right;
}

section#marquee {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
  background: url('/img/otherassets/the_wall_background_512px.jpg');
  background-size: cover;
  color: #FAFAFA;
  text-shadow: #424242 2px 2px 2px;
  opacity: 78%;

  .marquee-box {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .marquee-text {
      display: block;
      padding: 16px;
      max-width: 600px;
      text-align: center;
      line-height: 32px;
      font-size: 32px;
    }
  }
}

section#about {
  .three-part {
    display: flex;

    .third {
      flex: 3;
    }
  }

  .info-card {
    text-align: center;

    .info-description {
      text-align: left;
    }
  }
}

section#callToAction {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #E0E0E0;

  @media (max-width: 600px) {
    .wrapper {
      text-align: center;
      display: inline-block;
    }
  }

  @media (min-width: 601px) {
    .wrapper {
      text-align: center;
    }
  }

  .wrapper-main {
    display: block;
    text-align: center;
  }
}
</style>
