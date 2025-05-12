<template>
  <div class="max-w-2xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Kleiderspende registrieren</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <div v-for="field in formFields" :key="field.id" class="space-y-2">
        <label :for="field.id" class="block text-sm font-medium text-gray-700">
          {{ field.label }}
        </label>

        <!-- Text Input -->
        <input
          v-if="field.type === 'text'"
          :type="field.type"
          :id="field.id"
          v-model="formData[field.id]"
          :placeholder="field.placeholder"
          :required="field.required"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >

        <!-- Select Input -->
        <select
          v-if="field.type === 'select'"
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

onMounted(() => {
  formFields.value = formularInput.formFields
  formFields.value.forEach(field => {
    if (field.type === 'multiselect') {
      formData.value[field.id] = []
    } else {
      formData.value[field.id] = ''
    }
  })
})

const allowedTimes = [
  '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', 
  '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
  '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
  '16:30', '17:00', '17:30', '18:00'
]


const validateTime = (time) => {
  return allowedTimes.includes(time)
}

const submitForm = () => {
  const timeField = formFields.value.find(f => f.type === 'time')
  if (timeField && !validateTime(formData.value[timeField.id])) {
    alert('Bitte wählen Sie eine gültige Uhrzeit aus')
    return
  }

  // Verwenden Sie query statt params für die Datenübergabe
  router.push({
    name: 'Success',
    query: { 
      data: JSON.stringify(formData.value)
    }
  })
}
</script>