<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <!-- @/assets/logo.svg -->
            <v-img src="https://blog.logomyway.com/wp-content/uploads/2017/01/nba-logo-1.jpg" height="200" width="350" contain></v-img>
            
              <v-badge
            color="green"
            content="BETA"
          >
            <!-- <p>Relico</p> -->
               <p class="text-h3">TheJerseyStore</p>
          </v-badge>
          </div>
        </v-col>
        <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
          <v-row no-gutters class="align-start">
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper pt-md-4 pt-0">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <!-- <v-col>
                            <p class="login-slogan title text-center font-weight-medium my-10">Login to continue</p>
                            <v-btn height="45" block color="white" elevation="0" class="google text-capitalize">
                              <v-img src="@/assets/google.svg" max-width="30" class="mr-4"></v-img>
                              Sign in with Google</v-btn>
                          </v-col>
                          <v-col cols="12" class="d-flex align-center my-8">
                            <v-divider></v-divider>
                            <span class="px-5"> or </span>
                            <v-divider></v-divider>
                          </v-col> -->
                          <v-form>
                            <v-col>
                              <v-text-field
                                  v-model="email"
                                  :rules="emailRules"
                                  value="admin@nba"
                                  label="Email Address"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="password"
                                  :rules="passRules"
                                  type="password"
                                  label="Password"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="password.length === 0 || email.length === 0"
                                  color="primary"
                                  @click="login"
                              >
                                Login</v-btn>
                              <!-- <v-btn large text class="text-capitalize primary--text">Forget Password</v-btn> -->
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">© 2021 <a class="text-decoration-none">Relico Ecommerce</a></div>
              </v-footer>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        adminEmail: 'admin@thejerseystore.com',
        adminpassword: 'theJ_str@293_',
        password: '',
        passRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Min 6 characters'
        ]
      }
    },
    methods: {
      login(){
        if(this.password==this.adminpassword && this.email==this.adminEmail){
           window.localStorage.setItem('authenticated', true);
           this.$router.push('/products');
        }
      }
    },
    created() {
      if (window.localStorage.getItem('authenticated') === 'true') {
        this.$router.push('/products');
      }else{
        this.$router.push('/login');
      }
    }
  }

</script>

<style src="./Login.scss" lang="scss"/>
