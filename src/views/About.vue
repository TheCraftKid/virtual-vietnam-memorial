<template>
  <main>
    <div class="card-wrapper">
      <md-card>
        <h2>About the Project</h2>
        <p>
          The Virtual Vietnam Memorial is a project by Willie Chalmers III to
          dedicate the lives of those fallen in the Vietnam War.
        </p>
        <p>
          After reading <i>The Things They Carried</i> by Tim O'Brien, a man who
          served in the Vietnam War, my AP English Language class began a project
          to honor the fallen soldiers in the Vietnam War: we'd all make videos
          about a solider we chose, whether because he was an interesting man
          all-around or he had some personal connection to one of us.

          I immediately thought about how I'd present my soldier, but I remembered
          an unfortunate part of the presentation process.
        </p>
        <p>
          The time it takes between presentations leaves a lot of room to forget.
          How come is it, in 2018, that sharing multimedia presentations is
          difficult not only for the teacher, but for the student?

          Yes, there's <a href="https://www.youtube.com" target="_blank">YouTube</a>,
          but not everyone wishes to upload their school projects to YouTube. Many
          students and teachers would either email the file directly.
        </p>
        <p>
          And what about after the presentations? Are they lost forever? Why
          can't they be preserved for those interested souls well beyond our
          presentation days? Why does remembering have to stop after we get a
          grade for a project?
        </p>
        <p>
          Then came this idea a few minutes later: the idea of a virtual memorial.
          In this virtual memorial, students could upload their videos to a trusted
          site anyone could use for more than just a single presentation.
        </p>
        <p>I went ahead and built this in a day because, as Tim O'Brien said:</p>
        <blockquote>
          <em>In a story, miracles can happen.</em>
        </blockquote>
        <p>
          And in this case, I intend to preserve the stories of the fallen in a
          manner in which I know how.
        </p>
        <h2>About the Author</h2>
        <p>Willie Chalmers III builds projects that present information in a new way.</p>
        <p>For more info about this project and some others, see his
          <a href="https://sites.google.com/view/willie-projects/virtual-vietnam">Project Website</a>.
        </p>
      </md-card>
    </div>
    <!-- <img class="background"
        srcset="@/assets/the_wall_background_512px.jpg 512px,
                @/assets/the_wall_background_2048px.jpg 2048px"
        src="@/assets/the_wall_background_512px.jpg"
        alt="The Vietnam War Memorial in Washington DC"> -->
  </main>
</template>

<style scoped>
main {
  position: relative;
}

img.background {
  z-index: -1;
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
}

blockquote {
  font-weight: bold;
}

.card-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.md-card {
  padding: 24px 16px 16px;
  max-width: 600px;
  z-index: 1;
}
</style>
