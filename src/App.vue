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

<style>
:root {
  --footer-height: 64px;
}

#app {
  min-height: 100vh;
  padding-bottom: var(--footer-height);
}

@media (max-width: 768px) {
  :root {
    --footer-height: 80px;
  }
}
</style>

