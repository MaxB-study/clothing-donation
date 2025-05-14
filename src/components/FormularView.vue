<template>
  <div class="max-w-2xl mx-auto p-8">
    <form @submit.prevent="validateAndSubmit" class="space-y-6">
      <!-- Add a new section for pickup address before the v-for loop -->
      <div v-if="formData.handovertype" class="mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Abholadresse</h3>
        <p v-if="nearbyLocation" class="text-sm text-indigo-600 mb-4">
          {{ nearbyLocation }}
        </p>
      </div>

      <!-- In the v-for loop, remove the heading section and keep only the inputs -->
      <div 
        v-for="field in formFields" 
        :key="field.id" 
        class="space-y-2"
        v-show="shouldShowField(field)"
      >
        <label :for="field.id" class="block text-sm font-medium text-gray-700">
          {{ field.label }}
        </label>

        <!-- Text Input -->
        <input
          v-if="field.type === 'text' && !field.id.startsWith('pickup')"
          :type="field.type"
          :id="field.id"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          :required="field.required"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >

        <!-- Select Input -->
        <select
          v-if="field.type === 'select' && field.id !== 'location'"
          :id="field.id"
          v-model="formData[field.id]"
          :required="field.required"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Bitte wählen</option>
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <!-- Date Input -->
        <input
          v-if="field.type === 'date'"
          :type="field.type"
          :id="field.id"
          v-model="formData[field.id]"
          :required="field.required"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >

        <!-- Time Input -->
        <select
          v-if="field.type === 'time'"
          :id="field.id"
          v-model="formData[field.id]"
          :required="field.required"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Bitte Uhrzeit wählen</option>
          <option v-for="time in allowedTimes" :key="time" :value="time">
            {{ time }} Uhr
          </option>
        </select>

        <!-- Multiselect Input -->
        <div v-if="field.type === 'multiselect'" class="space-y-2">
          <div class="flex flex-wrap gap-2">
            <div v-for="option in field.options" :key="option" class="flex items-center">
              <input
                type="checkbox"
                :id="option"
                v-model="formData[field.id]"
                :value="option"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label :for="option" class="ml-2 text-sm text-gray-700">{{ option }}</label>
            </div>
          </div>
          <!-- Ausgewählte Items anzeigen -->
          <div v-if="formData[field.id]?.length" class="mt-2">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in formData[field.id]"
                :key="item"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {{ item }}
                <button
                  type="button"
                  @click="removeItem(field.id, item)"
                  class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500"
                >
                  &times;
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- Toggle Input -->
        <div v-if="field.type === 'toggle'" class="flex items-center">
          <button
            type="button"
            :id="field.id"
            @click="formData[field.id] = !formData[field.id]"
            :class="[
              formData[field.id] ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
            ]"
            role="switch"
            :aria-checked="formData[field.id]"
          >
            <span
              :class="[
                formData[field.id] ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              ]"
            />
          </button>
          <span class="ml-3 text-sm text-gray-700">
            {{ formData[field.id] ? field.options.on : field.options.off }}
          </span>
        </div>

        <!-- Select Input for Location -->
        <select
          v-if="field.type === 'select' && field.id === 'location'"
          :id="field.id"
          v-model="formData[field.id]"
          :required="!formData.handovertype"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Bitte wählen</option>
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <!-- Pickup Address Inputs without the heading -->
        <input
          v-if="field.id === 'pickupStreet' && formData.handovertype"
          type="text"
          :id="field.id"
          v-model="formData[field.id]"
          :required="formData.handovertype"
          :placeholder="field.placeholder"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
        <input
          v-if="field.id === 'pickupZip' && formData.handovertype"
          type="text"
          :id="field.id"
          v-model="formData[field.id]"
          :required="formData.handovertype"
          :placeholder="field.placeholder"
          pattern="[0-9]{5}"
          @input="handlePlzInput"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
        <input
          v-if="field.id === 'pickupCity' && formData.handovertype"
          type="text"
          :id="field.id"
          v-model="formData[field.id]"
          :required="formData.handovertype"
          :placeholder="field.placeholder"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
      </div>

      <div class="pt-5">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        > 
          Spende registrieren
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import formularInput from '../assets/FormularInput.json'

const router = useRouter()
const formFields = ref([])
const formData = ref({})

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

const nearbyLocation = ref('')

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