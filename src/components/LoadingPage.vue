<template>
  <div class="flex flex-col justify-center items-center h-screen w-full">
  <h1 class="animate__animated animate__fadeInDown text-4xl pl-3 md:pl-0 md:text-6xl lg:text-8xl">PROJECT MANAGEMENT</h1>
  <h2 class="animate__animated animate__fadeInUp text-3xl pl-3 md:pl-0 md:text-4xl lg:text-5xl text-orange-500">CollabZone</h2>
  </div>
  </template>
  
  Script
  <script>
  export default {
  mounted() {
  setTimeout(() => {
  this.$router.push('/auth');
  }, 50000); 
  },
  };
  </script>
  
  <style scoped>
  </style>