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
body{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* border: 1px solid rgb(137, 130, 238); */

}

#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
