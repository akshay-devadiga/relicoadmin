<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Settings</h1>
      </v-row>
       <v-row no-gutters class="d-flex justify-space-between mt-10 mb-2 ml-4">
        <h7 class="title">Carousel</h7>
      </v-row>
      <v-row  class="d-flex justify-space-between ml-4">
        <v-col v-for="(carouselImage,i) in carouselImages" :key="carouselImage" lg="4" sm="4" cols="12">
          <v-card class="mx-1 mb-1 pt-6">
            <v-card-text class="pa-2 pt-0">
                  <v-row no-gutters class="justify-center" v-show="showCarouselChangeButton[i]">
                <v-col cols="10" class="my-auto">
                  <v-img
                    contain
                    aspect-ratio="1"
                    :src="carouselImage.Url"
                    :lazy-src="carouselImage.Url"
                  />

                </v-col>
       
              </v-row>
              <v-row no-gutters class="justify-center mt-2">
                <div v-if="showCarouselChangeButton[i]">
                  <v-btn color="primary" @click="changeCarouselImage(carouselImage,i)" outlined text>
                    {{ "Change" }}
                  </v-btn>
                </div>
                <div v-else>
                                      <vue-upload-multiple-image
                                @upload-success="uploadCarouselImage"
                                dragText="Drag & Drop file"
                                browseText="Or Browse"
                                primaryText="Default"
                                markIsPrimaryText="Set as default"
                                popupText="This image will be displayed as default"
                                dropText="Drop your file here..."
                                :maxImage="1"
                                :showEdit="false"
                                :showAdd="false"
                                :showDelete="false"
                                :showPrimary="false"
                                :fileName="'offer-image'"
                              ></vue-upload-multiple-image>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
         <v-row no-gutters class="d-flex justify-space-between mt-10 mb-2 ml-4">
        <h7 class="title">Mid Panels</h7>
      </v-row>
      <v-row  class="d-flex justify-between ml-4">
        <v-col v-for="(panelImage,i) in panelImages" :key="panelImage" lg="3" sm="3" cols="12">
          <v-card class="mx-1 mb-1 pt-6">
            <v-card-text class="pa-2 pt-0">
                 <v-row no-gutters class="justify-center" v-show="showPanelChangeButton[i]">
                <v-col cols="10" class="my-auto">
                  <v-img
                    contain
                    aspect-ratio="1"
                    :src="panelImage.Url"
                    :lazy-src="panelImage.Url"
                  />

                </v-col>
       
              </v-row>
              <v-row no-gutters class="justify-center mt-2">
                <div v-if="showPanelChangeButton[i]">
                  <v-btn color="primary" @click="changePanelImage(panelImage,i)" outlined text>
                    {{ "Change" }}
                  </v-btn>
                </div>
                <div v-else>
                                      <vue-upload-multiple-image
                                @upload-success="uploadPanelImage"
                                dragText="Drag & Drop file"
                                browseText="Or Browse"
                                primaryText="Default"
                                markIsPrimaryText="Set as default"
                                popupText="This image will be displayed as default"
                                dropText="Drop your file here..."
                                :maxImage="1"
                                :showEdit="false"
                                :showAdd="false"
                                :showDelete="false"
                                :showPrimary="false"
                                :fileName="'offer-image'"
                              ></vue-upload-multiple-image>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
           <v-row no-gutters class="d-flex justify-space-between mt-10 mb-2 ml-4">
        <h7 class="title">Offer Panel</h7>
      </v-row>
        <v-row  class="d-flex justify-between ml-4">
        <v-col lg="6" sm="6" cols="12" v-for="offerImage in offerImages" :key="offerImage">
          <v-card class="mx-1 mb-1 pt-6">
            <v-card-text class="pa-2 pt-0">
              <v-row no-gutters class="justify-center" v-show="showOfferChangeButton">
                <v-col cols="10" class="my-auto">
                  <v-img
                    contain
                    aspect-ratio="1"
                    :src="offerImage.Url"
                    :lazy-src="offerImage.Url"
                  />

                </v-col>
       
              </v-row>
              <v-row no-gutters class="justify-center mt-2">
                <div v-if="showOfferChangeButton">
                  <v-btn color="primary" @click="changeOfferImage(offerImage)" outlined text>
                    {{ "Change" }}
                  </v-btn>
                </div>
                <div v-else>
                                      <vue-upload-multiple-image
                                @upload-success="uploadOfferImage"
                                dragText="Drag & Drop file"
                                browseText="Or Browse"
                                primaryText="Default"
                                markIsPrimaryText="Set as default"
                                popupText="This image will be displayed as default"
                                dropText="Drop your file here..."
                                :maxImage="1"
                                :showEdit="false"
                                :showAdd="false"
                                :showDelete="false"
                                :showPrimary="false"
                                :fileName="'offer-image'"
                              ></vue-upload-multiple-image>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import VueUploadMultipleImage from "../../CommonComponents/FileUploadComponent.vue";
import { uploadPanelFile,getOfferImages,getPanelImages,getCarouselImages,updateOfferImages,updatePanelImages,updateCarouselImages } from '../../apiServices';
export default {
  name: "Dashboard",
  components: {VueUploadMultipleImage},
  data() {
    return {
      mock,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Daily",
      showOfferChangeButton:true,
      offerImages:[],
      panelImages:[],
      carouselImages:[],
      showPanelChangeButton: [],
      showCarouselChangeButton: []
    };
  },
  async created(){
    this.offerImages = await getOfferImages();
    this.panelImages = await getPanelImages();
    this.carouselImages = await getCarouselImages();
    this.showPanelChangeButton = Array(this.panelImages.length).fill(true);
    this.showCarouselChangeButton = Array(this.carouselImages.length).fill(true);
  },
  methods: {
    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
    generatePieSeries() {
      let series = [];

      for (let i = 0; i < 4; i++) {
        let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
        series.push(y);
      }
      return series;
    },
    getRandomInt(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    async uploadOfferImage(formData, index) {
      let response = await uploadPanelFile(formData);
      response.index = index;
      this.showOfferChangeButton=true;
      let imageToUpdate = this.offerImages.find(offerImage=>offerImage.Id==this.selectedImageId);
      imageToUpdate.Url=response.Url;
      await updateOfferImages({Url:response.Url,Id:this.selectedImageId});
    },
    changeOfferImage(imageOb){
      this.showOfferChangeButton=!this.showOfferChangeButton;
      this.selectedImageId = imageOb.Id;
    },
    async uploadPanelImage(formData, index) {
      let response = await uploadPanelFile(formData);
      response.index = index;
      this.showPanelChangeButton[index]=true;
      let imageToUpdate = this.panelImages.find(panelImage=>panelImage.Id==this.selectedImageId);
      imageToUpdate.Url=response.Url;
      await updatePanelImages({Url:response.Url,Id:this.selectedImageId});
    },
    changePanelImage(imageOb,index){
      let showPanelChangeButton = JSON.parse(JSON.stringify(this.showPanelChangeButton));
      showPanelChangeButton[index] =! showPanelChangeButton[index];
      this.showPanelChangeButton = showPanelChangeButton;
      this.selectedImageId = imageOb.Id;
    },
    async uploadCarouselImage(formData, index) {
      let response = await uploadPanelFile(formData);
      response.index = index;
      this.showCarouselChangeButton[index]=true;
      let imageToUpdate = this.carouselImages.find(carouselImage=>carouselImage.Id==this.selectedImageId);
      imageToUpdate.Url=response.Url;
      await updateCarouselImages({Url:response.Url,Id:this.selectedImageId});
    },
    changeCarouselImage(imageOb,index){
      let showCarouselChangeButton = JSON.parse(JSON.stringify(this.showCarouselChangeButton));
      showCarouselChangeButton[index] =! showCarouselChangeButton[index];
      this.showCarouselChangeButton = showCarouselChangeButton;
      this.selectedImageId = imageOb.Id;
    }
  },
  mounted() {
    setTimeout(() => {
      this.apexLoading = true;
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
