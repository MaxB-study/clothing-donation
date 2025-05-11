<template>
  <nav class="bg-gray-800 p-4">
      <div class="flex justify-between items-center">
          <div class="flex items-center">
              <img :src="logo" alt="Logo" class="h-12 w-auto mr-3 rounded-full">
              <div class="text-white font-bold">Kleiderspende</div>
          </div>
          <div class="space-x-10">
              <router-link to="/" class="text-white hover:text-gray-300">Home</router-link>
              <router-link to="/spenden" class="text-white hover:text-gray-300">Spenden</router-link>
              <router-link to="/about" class="text-white hover:text-gray-300">Über uns</router-link>
          </div>
      </div>
  </nav>
</template>

<script setup>
import logo from '../assets/Visual_1.png'
</script>
