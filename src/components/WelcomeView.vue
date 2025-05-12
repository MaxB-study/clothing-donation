<template>
  <div class="p-8 flex">
    <!-- Linke Spalte mit Text -->
    <div class="flex-1 pr-11">
      <div>
        <h1 class="text-3xl font-bold mb-4">Willkommen bei Clothing-Donation!</h1>

        <p class="text-lg">
          In einer Welt, die von Herausforderungen und Krisen geprägt ist, ist es
          wichtiger denn je, zusammenzuhalten und Gutes zu tun. Bei
          Clothing-Donation bieten wir Ihnen die Möglichkeit, einen positiven
          Unterschied zu machen, indem Sie Kleidung spenden, die direkt an
          Menschen in Not geht.
        </p>
      </div>
      <div class="mt-8">
        <h2 class="text-3xl font-bold mb-4">Warum jetzt spenden?</h2>
        <p class="text-lg">
          Die aktuellen globalen Krisen haben Millionen von Menschen in schwierige
          Situationen gebracht. Von den Konflikten in der Ukraine bis hin zu den
          humanitären Notlagen in der Demokratischen Republik Kongo, die Not ist
          groß und die Hilfe dringend erforderlich. Ihre Spende kann dazu
          beitragen, das Leben von Menschen in diesen Krisengebieten zu
          verbessern.
        </p>
      </div>
      <div class="mt-8">
        <h2 class="text-3xl font-bold mb-4">Ihre Spende, Ihre Wahl</h2>
        <p class="text-lg">
          Bei Clothing-Donation haben Sie die Möglichkeit, das Krisengebiet
          auszuwählen, in das Ihre Spende gesendet werden soll. Ob es sich um die
          Ukraine, die Demokratische Republik Kongo oder ein anderes Krisengebiet
          handelt – Ihre Spende erreicht genau die Menschen, die sie am
          dringendsten benötigen.
        </p>
      </div>
      <div class="mt-8">
        <h2 class="text-3xl font-bold mb-4">Gemeinsam Gutes tun</h2>
        <p class="text-lg">
          Jede Spende zählt und kann einen großen Unterschied machen. Lassen Sie
          uns gemeinsam die Welt ein Stück besser machen. Ihre Unterstützung ist
          ein Zeichen der Hoffnung und Solidarität in diesen schwierigen Zeiten.
          Vielen Dank, dass Sie Teil unserer Mission sind!
        </p>
      </div>
    </div>

    <!-- Rechte Spalte mit Bild -->
    <div class="w-1/3">
      <img
        :src="WelcomePicture1"
        alt="Welcome Picture"
        class="sticky top-24 rounded-lg shadow-xl"
      >
    </div>
  </div>
</template>

<script setup>
import WelcomePicture1 from '../assets/Welcome_Page_Picture_1.png'
</script>
