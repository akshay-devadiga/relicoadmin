<template>
  <v-container fluid class="typography-page">
    <h1 class="page-title mt-10 mb-6">Orders</h1>
    <v-row>
      <v-col lg=12 cols=12>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
            <p>To get orders list follow below steps</p>
          </v-card-title>
          <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class=" pb-6">
              <v-col cols="12" class="card-dark-grey">
                <h5>Step I: <span class="subtitle-1 my-3">Go to  <a style="text-decoration:none" href="https://dashboard.stripe.com/">Stripe Dashboard</a> </span></h5>
                <h5>Step II:  <span class="subtitle-1 my-3">Click on payments</span></h5>
                <v-img :src="step1" class="elevation-1 mb-5"></v-img>
                <h5>Step III: <span class="subtitle-1 my-3">These are list of all the transactions. Click on succeeded to get details about the order for which the payement succeded</span></h5>
                 <v-img :src="step2" class="elevation-1 mb-5"></v-img>
                <h5>Step IV: <span class="subtitle-1 my-3">You can get more options to Refund,Send receipt.</span></h5>
                  <v-img :src="step3" class="elevation-1 mb-5"></v-img>
                           <h5>Step V: <span class="subtitle-1 my-3">Click view customer to get address details or Click on refund payement to refund or Click on Send receipt to send invoice to customer</span></h5>
                      <v-img :src="step4" class="elevation-1 mb-5"></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getOrderDetails } from '../../apiServices';
export default {
  name: 'Typography',
  data(){
    return{
      headers: [
        { text: 'Order Id', value: 'orderId' },
        { text: 'Name', value: 'name' },
        { text: 'ContactNo', value: 'ContactNo' },
        { text: 'AlternativeContactNo', value: 'AlternativeContactNo' },
        { text: 'Address', value: 'address' },
        { text: 'Country', value: 'country' },
        { text: 'Price', value: 'price' }
      ],
      orders:[],
      step1: "./images/step1.png",
      step2: "./images/step2.png",
      step3: "./images/step3.png",
      step4: "./images/step4.png"
    }
  },
  /*
    AlternativeContactNo: 2147483647
ContactNo: 2147483647
EmailVerified: 0
address: "5/591, Sri, Lakshmi Nagar Road, Raja Nagar, Pitchampalayam Pudur, Tiruppur, Tamil Nadu 641603"
country: "USA"
id: 1
name: "John Wick"
orderId: 1
price: 900
  */
  async created(){
    this.orders = await getOrderDetails();
  }
};
</script>

<style src="./Typography.scss" scoped lang="scss"></style>
