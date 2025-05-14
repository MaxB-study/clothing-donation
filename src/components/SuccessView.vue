<template>
  <div class="max-w-2xl mx-auto p-8">
    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800">
            Ihre Spende wurde erfolgreich registriert!
          </h3>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mb-6">Ihre Spendendetails:</h2>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <dl>
          <div v-if="formData" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formData.firstName }} {{ formData.lastName }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Art der Kleidung</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ Array.isArray(formData?.clothingType) ? formData.clothingType.join(', ') : formData?.clothingType }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Krisengebiet</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formData?.crisisArea }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Übergabeart</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formData?.handovertype ? 'Abholung durch Sammelfahrzeug' : 'Übergabe an Abgabestelle' }}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Übergabetermin</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formatDate(formData?.date) }} um {{ formData?.time }} Uhr
            </dd>
          </div>
          <!-- Conditional rendering based on handovertype -->
          <div v-if="!formData?.handovertype" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Übergabeort</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formData?.location }}
            </dd>
          </div>

          <div v-if="formData?.handovertype" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Abholadresse</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ formData.pickupStreet }}<br>
              {{ formData.pickupZip }} {{ formData.pickupCity }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const formData = ref({})

onMounted(() => {
  if (route.query.data) {
    try {
      const parsedData = JSON.parse(route.query.data)
      // Clear appropriate fields based on handovertype
      if (parsedData.handovertype) {
        // If pickup is selected, clear location
        parsedData.location = ''
      } else {
        // If dropoff is selected, clear pickup address fields
        parsedData.pickupStreet = ''
        parsedData.pickupZip = ''
        parsedData.pickupCity = ''
      }
      formData.value = parsedData
    } catch (e) {
      console.error('Fehler beim Parsen der Formulardaten:', e)
      formData.value = {}
    }
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}
</script>