<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Products</h1>
      <v-row>
        <v-col cols="12">
          {{editedItem}}
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
                        @click="addPricesForSelectedItem"
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
                                v-model="editedItem.name"
                                label="Name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.gender"
                                :items="genders"
                                item-text="Name"
                                item-value="Name"
                                label="Gender"
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.color"
                                :items="colors"
                                item-text="Name"
                                item-value="Name"
                                label="Color"
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.size"
                                :items="sizes"
                                item-text="Name"
                                item-value="Name"
                                label="Size"
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                v-model="editedItem.brand"
                                :items="brands"
                                item-text="Name"
                                item-value="Name"
                                label="Brand"
                                single-line
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.discount"
                                label="Discount"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="editedItem.stock"
                                label="Stock"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-row align="center">
                                <v-col class="d-flex mx-3 my-1 elevation-1 rounded" v-for="priceOb in editedItem.prices" :key="priceOb.id" cols="4">
                                  <v-row align="center">
                                    <v-col class="d-flex pa-0 ma-0 justify-center" cols="3">
                                       <v-icon small color="success" left>
                                          mdi-cash
                                       </v-icon>
                                      <v-label> <span class="caption">{{priceOb.code}}</span></v-label>
                                    </v-col>
                                    <v-col class="d-flex pa-0" cols="7">
                                      <v-text-field
                                         flat
                                         solo
                                         height="30"
                                         dense
                                         hide-details
                                        v-model="priceOb.price"
                                        placeholder="Enter Price"
                                        class="ma-0 pa-0"
                                      />
                                    </v-col>
                                     <v-col class="d-flex pa-0 ma-0" cols="1">
                                         <v-btn
                                          class="ma-0 pa-0 remove-price"
                                          color="error"
                                          @click="removePrice(priceOb)"
                                          dark
                                          text
                                          icon
                                        >
                                          <v-icon dark>
                                            mdi-close
                                          </v-icon>
                                        </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
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
              <template v-slot:item.prices="{ item }">
              <div v-for="price in item.prices" :key="price.id">  <v-chip
                  class="mt-1"
                  color="green"
                  label
                   outlined
                    >
                      <v-icon left>
          mdi-cash
        </v-icon>
          {{ `${price.code} - ${price.price}`}}
        </v-chip></div>

              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status ? "Displayed" : "Hidden" }}
                </v-chip>
              </template>
              <template v-slot:item.image="{ item }">
                <v-img height="150" width="150" contain :src="item.image">
                </v-img>
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
  getPricesById,
  getCountries,
} from "../../apiServices";
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
export default {
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
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Gender", value: "gender" },
        { text: "Color", value: "color" },
        { text: "Size", value: "size" },
        { text: "Brand", value: "brand" },
        { text: "Discount", value: "discount" },
        { text: "Stock", value: "stock" },
        { text: "Status", value: "status" },
        { text: "Prices", value: "prices" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      editedItem: {
        productId: 0,
        name: "",
        gender: "",
        color: "",
        size: "",
        brand: "",
        discount: 0,
        stock: 0,
        status: 1,
        prices: [],
      },
      defaultItem: {
        productId: 0,
        name: "",
        gender: "Female",
        color: "",
        size: "",
        brand: "",
        discount: 0,
        stock: 0,
        status: 0,
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
      newProductId:''
    };
  },
  async created() {
    this.products = await getProducts();
    this.products.forEach(async (product) => {
      // let response = await getPricesById(product.productId);
      // if(response[0]){
      //      let prices = response[0].prices.split(',');
      //     Vue.set(product,'ind',prices[0]);
      //     Vue.set(product,'aus',prices[1]);
      //     Vue.set(product,'usa',prices[2]);
      // }
    });
    this.genders = await getGenders();
    this.categories = await getCategories();
    this.sizes = await getSizes();
    this.brands = await getBrands();
    this.colors = await getColors();
    this.countries = await getCountries();
    this.addPricesForSelectedItem();
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
    addPricesForSelectedItem(){
      this.editedItem.productId = this.newProductId;
      if(this.editedItem.prices.length==0){
        for (var i=0;i<this.countries.length;i++){
        this.editedItem.prices.push({price:'',code:this.countries[i].Code,id:this.countries[i].Id});
       } 
      }
       
    },
    removePrice(priceOb){
      this.editedIndex = this.editedItem.prices.indexOf(priceOb);
      this.editedItem.prices.splice(this.editedIndex, 1);
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
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

    save() {
      if (this.editedIndex > -1) {
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
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem);
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
    },
    getColor(status) {
      if (status) return "green";
      else return "red";
    },
  },
};
</script>

<style src="./Basic.scss" lang="scss"/>