<template>
  <div class="max-w-2xl mx-auto p-8">
    <form @submit.prevent="validateAndSubmit" class="space-y-8" novalidate>
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
const formData = ref({
  clothingType: [],
  crisisArea: ''
})

// Initialize form fields on component mount
onMounted(() => {
  // Filter only needed fields for tablet view
  formFields.value = formularInput.formFields.filter(field => 
    field.id === 'clothingType' || field.id === 'crisisArea'
  )
})

// Computed properties for field filtering
const clothingTypeField = computed(() => 
  formFields.value.find(field => field.id === 'clothingType')
)

const crisisAreaField = computed(() => 
  formFields.value.find(field => field.id === 'crisisArea')
)

// Function to remove selected clothing items
const removeItem = (fieldId, item) => {
  if (Array.isArray(formData.value[fieldId])) {
    formData.value[fieldId] = formData.value[fieldId].filter(i => i !== item)
  }
}

const validateAndSubmit = () => {
  let isValid = true

  // Validate clothing type (at least one must be selected)
  if (!formData.value.clothingType?.length) {
    isValid = false
    alert('Bitte wählen Sie mindestens eine Kleidungsart aus')
    return
  }

  // Validate crisis area (must be selected)
  if (!formData.value.crisisArea) {
    isValid = false
    alert('Bitte wählen Sie ein Krisengebiet aus')
    return
  }

  if (isValid) {
    // If validation passes, proceed with form submission
    router.push({
      name: 'Success',
      query: { 
        data: JSON.stringify(formData.value)
      }
    })
  }
}
</script>