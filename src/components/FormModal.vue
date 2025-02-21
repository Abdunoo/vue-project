<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'User Information'
  }
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.firstName) {
    errors.value.firstName = 'First name is required'
  }
  
  if (!form.value.lastName) {
    errors.value.lastName = 'Last name is required'
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('save', form.value)
  }
}

const isFormValid = computed(() => {
  return form.value.firstName && 
         form.value.lastName && 
         form.value.email
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
    <form @submit.prevent="handleSubmit" class="mt-6">
      <div class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input 
            id="firstName"
            v-model="form.firstName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.firstName }"
          >
          <span class="text-sm text-red-600" v-if="errors.firstName">
            {{ errors.firstName }}
          </span>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input 
            id="lastName"
            v-model="form.lastName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.lastName }"
          >
          <span class="text-sm text-red-600" v-if="errors.lastName">
            {{ errors.lastName }}
          </span>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email"
            v-model="form.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-500': errors.email }"
          >
          <span class="text-sm text-red-600" v-if="errors.email">
            {{ errors.email }}
          </span>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone (optional)</label>
          <input 
            id="phone"
            v-model="form.phone"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button 
            type="button" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!isFormValid"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
