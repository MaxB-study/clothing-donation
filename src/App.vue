<script setup>
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div>
    <NavBar />
    <router-view />
    <FooterBar />
  </div>
</template>

<style scoped>

</style>

