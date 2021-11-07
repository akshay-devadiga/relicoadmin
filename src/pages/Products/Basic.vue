<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Products</h1>
      <v-row>
        <v-col cols="12">
          <!-- {{ editedItem }} -->
          <v-card class="employee-list mb-1">
            <v-data-table
              :headers="headers"
              :items="products"
              class="elevation-1"
              :search="search"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Products"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="addNewProduct"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Add new product
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                name="product name"
                                v-model="editedItem.name"
                                label="Name"
                                v-validate="'required'"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                return-object
                                v-model="editedItem.gender"
                                :items="genders"
                                item-text="Name"
                                item-value="Name"
                                label="Gender"
                                single-line
                                name="gender"
                                v-validate="'required'"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                return-object
                                v-model="editedItem.color"
                                :items="colors"
                                item-text="Name"
                                item-value="Name"
                                label="Color"
                                single-line
                                name="color"
                                v-validate="'required'"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                return-object
                                v-model="editedItem.brand"
                                :items="brands"
                                item-text="Name"
                                item-value="Name"
                                label="Brand"
                                single-line
                                name="brand"
                                v-validate="'required'"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                return-object
                                v-model="editedItem.discount"
                                :items="discounts"
                                item-text="DiscountPercentage"
                                item-value="Id"
                                label="Discount"
                                single-line
                                name="discount"
                                v-validate="'required'"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                return-object
                                v-model="editedItem.category"
                                :items="categories"
                                item-text="Name"
                                item-value="Name"
                                label="Category"
                                single-line
                                name="category"
                                v-validate="'required'"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <span class="caption font-weight-bold">{{
                                isEditMode ? "Update sizes" : "Add sizes"
                              }}</span>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                              v-show="!isEditMode"
                            >
                              <v-switch
                                :label="
                                  editedItem.hideSize
                                    ? 'Is Not Applicable'
                                    : 'Is Applicable'
                                "
                                v-model="editedItem.hideSize"
                              ></v-switch>
                            </v-col>
                            <v-col
                              v-if="!editedItem.hideSize"
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              <v-row align="center">
                                <v-col
                                  class="d-flex mx-3 my-1 elevation-1 rounded"
                                  v-for="sizeOb in editedItem.sizevariants"
                                  :key="sizeOb.sizeVariantId"
                                  cols="4"
                                >
                                  <v-row align="center">
                                    <v-col
                                      class="d-flex pa-0 ma-0 justify-center"
                                      cols="3"
                                    >
                                      <v-label>
                                        <span class="caption"
                                          >{{ sizeOb.Name }}
                                        </span></v-label
                                      >
                                    </v-col>
                                    <v-col class="d-flex pa-0" cols="7">
                                      <v-text-field
                                        flat
                                        solo
                                        height="30"
                                        dense
                                        hide-details
                                        type="number"
                                        v-model="sizeOb.stock"
                                        placeholder="Enter Stock"
                                        class="ma-0 pa-0"
                                        :name="
                                          `${sizeOb.Name.toLowerCase()} stock`
                                        "
                                        v-validate="'required'"
                                      />
                                    </v-col>
                                    <v-col
                                      class="d-flex pa-0 ma-0"
                                      cols="1"
                                      v-if="!isEditMode"
                                    >
                                      <v-btn
                                        class="ma-0 pa-0 remove-price"
                                        color="error"
                                        @click="removeSize(sizeOb)"
                                        dark
                                        text
                                        icon
                                      >
                                        <v-icon dark> mdi-close </v-icon>
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>

                            <v-col cols="12" sm="12" md="12">
                              <span class="caption font-weight-bold">{{
                                isEditMode ? "Update prices" : "Add prices"
                              }}</span>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-row align="center">
                                <v-col
                                  class="d-flex mx-3 my-1 elevation-1 rounded"
                                  v-for="priceOb in editedItem.prices"
                                  :key="priceOb.id"
                                  cols="4"
                                >
                                  <v-row align="center">
                                    <v-col
                                      class="d-flex pa-0 ma-0 justify-center"
                                      cols="3"
                                    >
                                      <v-icon small color="success" left>
                                        mdi-cash
                                      </v-icon>
                                      <v-label>
                                        <span class="caption"
                                          >{{ priceOb.code }}
                                        </span></v-label
                                      >
                                    </v-col>
                                    <v-col class="d-flex pa-0" cols="7">
                                      <v-text-field
                                        flat
                                        solo
                                        height="30"
                                        dense
                                        hide-details
                                        type="number"
                                        v-model="priceOb.price"
                                        placeholder="Enter Price"
                                        class="ma-0 pa-0"
                                        :name="
                                          `${priceOb.code.toLowerCase()} price`
                                        "
                                        v-validate="'required'"
                                      />
                                    </v-col>
                                    <v-col
                                      class="d-flex pa-0 ma-0"
                                      cols="1"
                                      v-if="!isEditMode"
                                    >
                                      <v-btn
                                        class="ma-0 pa-0 remove-price"
                                        color="error"
                                        @click="removePrice(priceOb)"
                                        dark
                                        text
                                        icon
                                      >
                                        <v-icon dark> mdi-close </v-icon>
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <span class="caption font-weight-bold"
                                >Choose image/images</span
                              >
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <!-- <file-upload-component
                                @files-updated="updateImage"
                                :imagefiles="editedItem.images"
                              /> -->
                              {{editedItem.images}}
                              <vue-upload-multiple-image
                                @upload-success="uploadImageSuccess"
                                @before-remove="beforeRemove"
                                :data-images="editedItem.images"
                                dragText="Drag & Drop files"
                                browseText="Or Browse"
                                primaryText="Default"
                                markIsPrimaryText="Set as default"
                                popupText="This image will be displayed as default"
                                dropText="Drop your file here..."
                                :maxImage="3"
                                :showEdit="false"
                              ></vue-upload-multiple-image>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-switch
                                label="Show this product on store (status)"
                                v-model="editedItem.status"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-col cols="12" v-if="errors && errors.items.length > 0">
                        <v-card class="ma-0">
                          <v-card-title>
                            <p class="caption">
                              Some of the product details are missing. Please
                              add them to continue
                            </p>
                          </v-card-title>
                          <v-card-text class="px-6 pt-0">
                            <v-row no-gutters class="typography-widget pb-2">
                              <v-col
                                cols="5"
                                class="card-dark-grey ml-1"
                                v-for="error in errors.items"
                                :key="error"
                              >
                                <v-alert
                                  dense
                                  outlined
                                  type="error"
                                  class="caption error--text"
                                >
                                  {{ error.msg }}
                                </v-alert>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        item?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.sizevariants`]="{ item }">
                <div
                  v-for="size in item.sizevariants"
                  :key="size.sizeVariantId"
                >
                  <v-chip class="mt-1" color="primary" label>
                    {{ `${size.Name} - ${size.stock}` }}
                  </v-chip>
                </div>
              </template>
              <template v-slot:[`item.prices`]="{ item }">
                <div v-for="price in item.prices" :key="price.id">
                  <v-chip class="mt-1" color="green" label outlined>
                    <v-icon left> mdi-cash </v-icon>
                    {{ `${price.code} - ${price.price}` }}
                  </v-chip>
                </div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary"> Reset </v-btn>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status ? "Displayed" : "Hidden" }}
                </v-chip>
              </template>
            
              <!-- eslint-disable-next-line -->
              <template v-slot:[`item.images`]="{ item }">
                <v-card elevation="24" max-width="40" class="mx-auto">
                  <v-carousel
                    height="40"
                    width="40"
                    cycle
                    hide-delimiters
                    :show-arrows="false"
                  >
                    <v-carousel-item v-for="(item, i) in item.images" :key="i">
                      <v-img
                        :src="item.path"
                        aspect-ratio="1"
                        contain
                      ></v-img>
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import {
  getProducts,
  getCategories,
  getGenders,
  getSizes,
  getBrands,
  getColors,
  getCountries,
  addProducts,
  updateProducts,
  getDiscounts,
  getPricesById,
  getSizesById,
  deleteProduct,
  uploadFile,
  removeFile
} from "../../apiServices";
//import FileUploadComponent from "../../components/FileUploadComponent.vue";
import VueUploadMultipleImage from "../../CommonComponents/FileUploadComponent.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  components: {
    //FileUploadComponent,
    VueUploadMultipleImage,
  },
  data() {
    return {
      mock,
      products: [],
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "productId",
        },
        { text: "Images", value: "images" },
        { text: "Name", value: "name" },
        { text: "Gender", value: "gender.Name" },
        { text: "Color", value: "color.Name" },
        { text: "Size with stock", value: "sizevariants" },
        { text: "Brand", value: "brand.Name" },
        { text: "Category", value: "category.Name" },
        { text: "Discount", value: "discount.DiscountPercentage" },
        { text: "Status", value: "status" },
        { text: "Prices", value: "prices" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      editedItem: {
        productId: 0,
        hideSize: false,
        name: "",
        gender: "",
        color: "",
        sizevariants: [],
        brand: "",
        discount: "",
        status: 1,
        images: [],
        category: "",
        prices: [],
      },
      defaultItem: {
        productId: 0,
        hideSize: false,
        name: "",
        gender: "Female",
        color: "",
        sizevariants: [],
        brand: "",
        discount: "",
        status: 0,
        category: "",
        images: [],
        prices: [],
      },
      genders: [],
      categories: [],
      sizes: [],
      brands: [],
      colors: [],
      search: "",
      position: "top-right",
      countries: [],
      newProductId: "",
      discounts: [],
      isEditMode: false,
      isAddMode: false,
    };
  },
  async created() {
    this.discounts = await getDiscounts();
    this.products = await getProducts();
    this.products.forEach(async (product) => {
      product.gender = JSON.parse(product.gender);
      product.color = JSON.parse(product.color);
      product.brand = JSON.parse(product.brand);
      product.category = JSON.parse(product.category);
      product.discount = JSON.parse(product.discount);
      /*
          TODO- Fix later Edge case - Discount has issue with object reference 
      */
      if (product.discount) {
        product.discount = this.discounts.find(
          (dis) => dis.Id == product.discount.Id
        );
      }
      let response1 = await getPricesById(product.id);
      let prices = response1[0].prices;
      let response2 = await getSizesById(product.id);
      let sizevariants = response2[0].sizevariants;

      if (prices) product.prices = JSON.parse(prices);

      if (sizevariants) product.sizevariants = JSON.parse(sizevariants);

      if (product.images)
      {
          product.images = JSON.parse(product.images);
      }
      
    });

    this.genders = await getGenders();
    this.categories = await getCategories();
    this.sizes = await getSizes();
    this.brands = await getBrands();
    this.colors = await getColors();
    this.countries = await getCountries();

    this.addPricesForSelectedItem();
    this.addSizesForSelectedItem();
    this.newProductId = uuidv4();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add new product"
        : "Edit product details";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    addNewProduct() {
      this.isEditMode = false;
      this.isAddMode = true;
      this.addSizesForSelectedItem();
      this.addPricesForSelectedItem();
    },
    updateImage(e) {
      this.editedItem.images = e;
      console.log(this.editedItem);
    },
    addPricesForSelectedItem() {
      this.editedItem.productId = this.newProductId;
      if (this.editedItem.prices.length == 0) {
        for (var i = 0; i < this.countries.length; i++) {
          this.editedItem.prices.push({
            price: "",
            code: this.countries[i].Code,
            Id: this.countries[i].Id,
            countryId: this.countries[i].Id,
          });
        }
      }
    },
    removePrice(priceOb) {
      this.editedIndex = this.editedItem.prices.indexOf(priceOb);
      this.editedItem.prices.splice(this.editedIndex, 1);
    },
    addSizesForSelectedItem() {
      this.editedItem.productId = this.newProductId;
      if (this.editedItem.sizevariants.length == 0) {
        for (var i = 1; i < this.sizes.length; i++) {
          let payload = {
            SizeId: this.sizes[i].Id,
            Name: this.sizes[i].Name,
            Id: this.sizes[i].Id,
            stock: "",
          };
          this.editedItem.sizevariants.push(payload);
        }
      }
    },
    removeSize(sizeOb) {
      this.editedIndex = this.editedItem.sizevariants.indexOf(sizeOb);
      this.editedItem.sizevariants.splice(this.editedIndex, 1);
    },
    editItem(item) {
      this.isEditMode = true;
      this.isAddMode = false;
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await deleteProduct(this.editedItem.productId);
      this.products.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    validateNewProduct() {},
    async save() {
      this.$validator.validate().then(async (valid) => {
        console.log(this.errors);
        if (valid) {
          if (this.editedItem.hideSize) {
            this.editedItem.sizevariants = [];
            this.editedItem.sizevariants.push(this.sizes[0]);
          }
          if (!this.isAddMode && this.isEditMode) {
            this.$toast.success("Product updated successfully", {
              position: this.position,
              timeout: 6000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
            });

            await updateProducts(this.editedItem);
            Object.assign(this.products[this.editedIndex], this.editedItem);
          } else {
            console.log(this.editedItem);
            await addProducts(this.editedItem);
            this.products.unshift(this.editedItem);
            this.$toast.success("Product added successfully", {
              position: this.position,
              timeout: 6000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
            });
          }
          this.close();
        }
      });
    },
    getColor(status) {
      if (status) return "green";
      else return "red";
    },
    async uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
      // let files = await this.gatherFormData(formData);
      let response = await uploadFile(formData);
      response.index=index;
      console.log(response,"response");
      this.editedItem.images.push(response);
      // Add image from folder
      // Update the file url object - editItemObject
    },
    //eslint-disable-next-line
    async beforeRemove(index, done, fileList) {
      var r = confirm("remove image");
      if (r == true) {
        done();
        //eslint-disable-next-line
         let productImages = this.editedItem.images;
         let imageToBeRemoved = productImages.find(imageItem=>imageItem.index == index);
         const actualIndex = productImages.indexOf(imageToBeRemoved);
          if (actualIndex > -1) {
            productImages.splice(actualIndex, 1);
          }
         this.editedItem.images = productImages;
         await removeFile(imageToBeRemoved.filename);
               this.$toast.success("Image removed successfully", {
              position: this.position,
              timeout: 6000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
            });
      }
    }   
  },
};
</script>

<style src="./Basic.scss" lang="scss" />

<style lang="scss" scoped>
::v-deep .image-primary{
    display: none !important;
}

::v-deep .image-bottom-left{
    display: none !important;
}
</style>
