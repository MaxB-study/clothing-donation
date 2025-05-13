<template>
  <div class="p-8">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-8">Über uns</h1>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Left column with text -->
        <div class="md:w-2/3">
          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Unsere Geschichte</h2>
            <p class="mb-4 text-gray-700">
              Clothing-Donation e.V. wurde 2020 von einer Gruppe engagierter Menschen gegründet, 
              die sich zum Ziel gesetzt haben, Menschen in Krisengebieten zu unterstützen. 
              Was als kleine Bürgerinitiative begann, hat sich zu einem etablierten 
              gemeinnützigen Verein entwickelt, der Menschen in Krisengebieten weltweit 
              mit dringend benötigter Kleidung versorgt.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Unsere Mission</h2>
            <p class="mb-4 text-gray-700">
              Wir glauben daran, dass jeder Mensch das Recht auf angemessene Kleidung hat. 
              Unsere Mission ist es, eine Brücke zwischen Menschen zu bauen, die helfen möchten, 
              und denen, die Hilfe benötigen. Durch unser effizientes Spendensystem stellen wir sicher, 
              dass Ihre Kleiderspenden genau dort ankommen, wo sie am dringendsten gebraucht werden.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold mb-4">Unsere Werte</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Transparenz in allen Prozessen</li>
              <li>Nachhaltigkeit und Ressourcenschonung</li>
              <li>Respektvoller Umgang mit Spendern und Empfängern</li>
              <li>Effizienz in der Verteilung</li>
              <li>Kulturelle Sensibilität</li>
            </ul>
          </section>
        </div>

        <!-- Right column with image and stats -->
        <div class="md:w-1/3">
          <img 
            :src="logo" 
            alt="Clothing-Donation Team" 
            class="w-full rounded-lg shadow-xl mb-8"
          >
          
          <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold mb-4">Unsere Erfolge als Verein</h3>
            <div class="space-y-4">
              <div>
                <p class="text-2xl font-bold text-indigo-600">50.000+</p>
                <p class="text-gray-600">Gespendete Kleidungsstücke</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-indigo-600">4</p>
                <p class="text-gray-600">Aktive Krisengebiete</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-indigo-600">15.000+</p>
                <p class="text-gray-600">Unterstützte Menschen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '../assets/Visual_1.png'
</script>