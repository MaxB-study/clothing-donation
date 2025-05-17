<template>
  <footer class="fixed bottom-0 left-0 w-full bg-gray-400 p-3 md:p-4">
    <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
      <div class="text-white text-center md:text-left">
        <p class="text-sm md:text-base">&copy; 2025 Clothing-Donation e.V. Alle Rechte vorbehalten.</p>
      </div>
      <div class="flex space-x-4">
        <router-link 
          to="/datenschutz" 
          class="text-sm md:text-base text-white hover:text-gray-300 transition-colors duration-200"
        >
          Datenschutz
        </router-link>
        <router-link 
          to="/impressum" 
          class="text-sm md:text-base text-white hover:text-gray-300 transition-colors duration-200"
        >
          Impressum
        </router-link>
      </div>
    </div>
  </footer>
</template>
