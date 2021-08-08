<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="3">
        <v-card
          class="mx-auto"
          max-width="120"
          height="120"
          width="140"
          @click="uploadImage"
          outlined
        >
          <v-img :src="placeholderImage" height="120px"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3" v-for="(file, index) in files" :key="index">
        <v-card class="mx-auto" max-width="120" height="120" width="140">
          <v-img :src="file.url" height="120px"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <input
      type="file"
      multiple
      accept=""
      ref="uploadFileReference"
      @change="uploadFileReference"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      length: 1,
      placeholderImage: "./images/add-image.jpg",
      files: [],
    };
  },
  methods: {
    uploadImage() {
      this.$refs.uploadFileReference.click();
    },
    uploadFileReference(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.length = files.length;
      this.showImage(files);
    },
    showImage(files) {
      // if (files.length > 1) {
      this.files = [];
      /** Solution provided by Chem **/
      Array.from(files).forEach((file, idx) => {
        const fileReader = new FileReader();
        const getResult = new Promise((resolve) => {
          console.log(resolve);
          fileReader.onload = (e) => {
            this.files.push({
              id: idx,
              url: e.target.result,
            });
          };
        });

        fileReader.readAsDataURL(file);
        return getResult.then((file) => {
          return file;
        });
      });
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.img-wrapper {
  display: flex;
  flex: 1 0 100%;
  flex-direction: row;
  align-items: center;
}
.img-container {
  width: 10rem;
  height: 15rem;
}
img {
  max-width: 100%;
}
.card-text {
  font-size: 9px;
}
</style>
