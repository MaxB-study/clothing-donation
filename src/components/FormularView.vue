<template>
  <div class="max-w-2xl mx-auto p-8">
    <form @submit.prevent="validateAndSubmit" class="space-y-8">
      <!-- Persönliche Daten -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Persönliche Daten</h2>
        <div class="space-y-4">
          <div v-for="field in personalFields" 
               :key="field.id" 
               class="space-y-2"
               v-show="shouldShowField(field)">
            <label :for="field.id" class="block text-sm font-medium text-gray-700">
              {{ field.label }}
            </label>
            <input
              v-if="field.type === 'text'"
              :type="field.type"
              :id="field.id"
              v-model="formData[field.id]"
              :placeholder="field.placeholder"
              :required="field.required"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
            >
          </div>
        </div>
      </div>

      <!-- Spendendetails -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Spendendetails</h2>
        <div class="space-y-4">
          <!-- Multiselect für Kleidungsarten -->
          <div v-if="clothingTypeField" class="space-y-2">
            <label :for="clothingTypeField.id" class="block text-sm font-medium text-gray-700">
              {{ clothingTypeField.label }}
            </label>
            <div class="flex flex-wrap gap-2">
              <div v-for="option in clothingTypeField.options" :key="option" 
                   class="flex items-center bg-gray-50 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  :id="option"
                  v-model="formData[clothingTypeField.id]"
                  :value="option"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label :for="option" class="ml-2 text-sm text-gray-700">{{ option }}</label>
              </div>
            </div>
            <!-- Ausgewählte Items -->
            <div v-if="formData[clothingTypeField.id]?.length" class="mt-3">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in formData[clothingTypeField.id]"
                  :key="item"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {{ item }}
                  <button
                    type="button"
                    @click="removeItem(clothingTypeField.id, item)"
                    class="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 transition-colors"
                  >
                    &times;
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Krisengebiet Select -->
          <div v-if="crisisAreaField" class="space-y-2">
            <label :for="crisisAreaField.id" class="block text-sm font-medium text-gray-700">
              {{ crisisAreaField.label }}
            </label>
            <select
              :id="crisisAreaField.id"
              v-model="formData[crisisAreaField.id]"
              :required="crisisAreaField.required"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Bitte wählen</option>
              <option v-for="option in crisisAreaField.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Übergabe -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Übergabe</h2>
        <div class="space-y-4">
          <!-- Toggle für Übergabeart -->
          <div v-if="handoverTypeField" class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <button
              type="button"
              :id="handoverTypeField.id"
              @click="formData[handoverTypeField.id] = !formData[handoverTypeField.id]"
              :class="[
                formData[handoverTypeField.id] ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              ]"
              role="switch"
              :aria-checked="formData[handoverTypeField.id]"
            >
              <span
                :class="[
                  formData[handoverTypeField.id] ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                ]"
              />
            </button>
            <span class="ml-3 text-sm text-gray-700">
              {{ formData[handoverTypeField.id] ? handoverTypeField.options.on : handoverTypeField.options.off }}
            </span>
          </div>

          <!-- Datum und Uhrzeit -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="dateField" class="space-y-2">
              <label :for="dateField.id" class="block text-sm font-medium text-gray-700">
                {{ dateField.label }}
              </label>
              <input
                type="date"
                :id="dateField.id"
                v-model="formData[dateField.id]"
                :required="dateField.required"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
            </div>
            <div v-if="timeField" class="space-y-2">
              <label :for="timeField.id" class="block text-sm font-medium text-gray-700">
                {{ timeField.label }}
              </label>
              <select
                :id="timeField.id"
                v-model="formData[timeField.id]"
                :required="timeField.required"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Bitte Uhrzeit wählen</option>
                <option v-for="time in allowedTimes" :key="time" :value="time">
                  {{ time }} Uhr
                </option>
              </select>
            </div>
          </div>

          <!-- Übergabeort oder Abholadresse -->
          <div v-if="!formData.handovertype" class="space-y-2">
            <label :for="locationField?.id" class="block text-sm font-medium text-gray-700">
              {{ locationField?.label }}
            </label>
            <select
              :id="locationField?.id"
              v-model="formData[locationField?.id]"
              :required="!formData.handovertype"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Bitte wählen</option>
              <option v-for="option in locationField?.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Abholadresse -->
          <div v-if="formData.handovertype" class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900">Abholadresse</h3>
            <div v-if="nearbyLocation" 
                 class="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-indigo-700">{{ nearbyLocation }}</p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <label :for="'pickupStreet'" class="block text-sm font-medium text-gray-700">
                  Straße & Hausnummer
                </label>
                <input
                  type="text"
                  id="pickupStreet"
                  v-model="formData.pickupStreet"
                  required
                  placeholder="Beispielstraße 123"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label :for="'pickupZip'" class="block text-sm font-medium text-gray-700">
                    PLZ
                  </label>
                  <input
                    type="text"
                    id="pickupZip"
                    v-model="formData.pickupZip"
                    required
                    placeholder="12345"
                    pattern="[0-9]{5}"
                    @input="handlePlzInput"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                  >
                </div>
                <div class="space-y-2">
                  <label :for="'pickupCity'" class="block text-sm font-medium text-gray-700">
                    Stadt
                  </label>
                  <input
                    type="text"
                    id="pickupCity"
                    v-model="formData.pickupCity"
                    required
                    placeholder="Berlin"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
        </svg>
        Spende registrieren
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import formularInput from '../assets/FormularInput.json'

const router = useRouter()
const formFields = ref([])
const formData = ref({})
const nearbyLocation = ref('')

// Computed properties for field filtering
const personalFields = computed(() => 
  formFields.value.filter(field => !field.id?.startsWith('pickup') && field.type === 'text')
)

const clothingTypeField = computed(() => 
  formFields.value.find(field => field.id === 'clothingType')
)

const crisisAreaField = computed(() => 
  formFields.value.find(field => field.id === 'crisisArea')
)

const handoverTypeField = computed(() => 
  formFields.value.find(field => field.id === 'handovertype')
)

const dateField = computed(() => 
  formFields.value.find(field => field.id === 'date')
)

const timeField = computed(() => 
  formFields.value.find(field => field.id === 'time')
)

const locationField = computed(() => 
  formFields.value.find(field => field.id === 'location')
)

const allowedTimes = [
  '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', 
  '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
  '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00'
]

const validateTime = (time) => {
  return allowedTimes.includes(time)
}

// First, add this helper function to extract PLZ regions and create a mapping
const getPlzRegion = (plz) => plz.substring(0, 2)

const abgabestellenPLZ = {
  '10': 'Berlin',
  '20': 'Hamburg',
  '80': 'München',
  '50': 'Köln'
}

// Add this function to check for nearby locations
const checkNearbyLocation = (plz) => {
  const region = getPlzRegion(plz)
  if (abgabestellenPLZ[region]) {
    return `Hinweis: In Ihrer Nähe befindet sich unsere Abgabestelle in ${abgabestellenPLZ[region]}.`
  }
  return null
}

// Modify the existing input handler for PLZ
const handlePlzInput = (event) => {
  const plz = event.target.value
  if (plz.length === 5) {
    const nearbyMessage = checkNearbyLocation(plz)
    if (nearbyMessage) {
      nearbyLocation.value = nearbyMessage
    } else {
      nearbyLocation.value = ''
    }
  } else {
    nearbyLocation.value = ''
  }
}

const validateAndSubmit = () => {
  // Validate based on handovertype
  if (formData.value.handovertype) {
    // Validate pickup address fields when handovertype is true
    if (!formData.value.pickupStreet || !formData.value.pickupZip || !formData.value.pickupCity) {
      alert('Bitte füllen Sie alle Adressfelder aus')
      return
    }
    if (!formData.value.pickupZip.match(/^[0-9]{5}$/)) {
      alert('Bitte geben Sie eine gültige PLZ ein (5 Ziffern)')
      return
    }
    // Clear location field
    formData.value.location = ''
  } else {
    // Validate location field when handovertype is false
    if (!formData.value.location) {
      alert('Bitte wählen Sie einen Übergabeort aus')
      return
    }
    // Clear pickup address fields
    formData.value.pickupStreet = ''
    formData.value.pickupZip = ''
    formData.value.pickupCity = ''
  }

  // Continue with form submission
  router.push({
    name: 'Success',
    query: { 
      data: JSON.stringify(formData.value)
    }
  })
}

const shouldShowField = (field) => {
  if (!field.showWhen) return true
  return eval(field.showWhen.replace('handovertype', formData.value.handovertype))
}

onMounted(() => {
  formFields.value = formularInput.formFields
  formFields.value.forEach(field => {
    if (field.type === 'multiselect') {
      formData.value[field.id] = []
    } else if (field.type === 'toggle') {
      formData.value[field.id] = false
    } else {
      formData.value[field.id] = ''
    }
  })
})
</script>