<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
     created() {
      if (window.localStorage.getItem('authenticated') === 'true') {
        this.$router.push('/products');
      }else{
        this.$router.push('/login');
      }
    }
  };
</script>

<style src="./styles/app.scss" lang="scss"/>


