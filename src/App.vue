<template>
  <div id="app">
    <!--<LoadingPage v-if="showSplashScreen && !hideSplashScreen" />-->
    <router-view></router-view>
  </div>
</template>

<script>

//import LoadingPage from './components/LoadingPage.vue';
export default {
  components: {
   // LoadingPage,
  },
  data() {
    return {
      showSplashScreen: true,
      hideSplashScreen: false,
    };
  },
  mounted() {
    // Simulez une attente de quelques secondes avant de masquer le splash screen
    setTimeout(() => {
      this.hideSplashScreen  = true;
    }, 3000);
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  left: 0;
  right: 0;
  margin: 0;
  /* margin-top: 60px; */
}
</style>
