<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <!-- Logo and Title -->
        <div class="flex items-center">
          <img :src="logo" alt="Logo" class="h-8 md:h-12 w-auto mr-2 md:mr-3 rounded-full">
          <div class="text-white font-bold text-lg md:text-2xl">Kleiderspende</div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-6 lg:space-x-10">
          <router-link 
            to="/" 
            class="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </router-link>
          <router-link 
            to="/spenden" 
            class="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Spenden
          </router-link>
          <router-link 
            to="/ueber-uns" 
            class="text-white hover:text-gray-300 transition-colors duration-200"
          >
            Über uns
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-white focus:outline-none"
        >
          <svg 
            class="h-6 w-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!isMobileMenuOpen" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden mt-4 space-y-3"
      >
        <router-link 
          to="/" 
          class="block text-white hover:text-gray-300 transition-colors duration-200 py-2"
          @click="closeMobileMenu"
        >
          Home
        </router-link>
        <router-link 
          to="/spenden" 
          class="block text-white hover:text-gray-300 transition-colors duration-200 py-2"
          @click="closeMobileMenu"
        >
          Spenden
        </router-link>
        <router-link 
          to="/ueber-uns" 
          class="block text-white hover:text-gray-300 transition-colors duration-200 py-2"
          @click="closeMobileMenu"
        >
          Über uns
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import logo from '../assets/Visual_1.png'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
