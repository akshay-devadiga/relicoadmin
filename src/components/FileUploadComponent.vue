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
          <v-img :src="file.fileUrl" height="120px"></v-img>
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
import {
  uploadFile
} from "../apiServices";
export default {
  props:{
    imagefiles:{
      type:Array,
      default: () => []
    }
  },
  data() {
    return {
      length: 1,
      placeholderImage: "./images/add-image.jpg",
      files: [],
    };
  },
  watch:{
    imagefiles(value){
      this.files = value;
    }
  },
  methods: {
    uploadImage() {
      this.$refs.uploadFileReference.click();
    },
    gatherFormData() {
        const data = new FormData();
        let files = this.$refs.uploadFileReference.files;
        for (var i = 0; i < files.length; i++) {
           data.append('files', files[i]);
        }
        return data;
    },
    async uploadFileReference() {
      let payload = await this.gatherFormData();
      let response = await uploadFile(payload);
      this.showImage(response);
    },
    async showImage(response) {
      this.files = [];
      this.files = response;
      this.$emit('files-updated',this.files);

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
