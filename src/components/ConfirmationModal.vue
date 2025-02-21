<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['close', 'confirm'])

const handleConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
    <div class="mt-6">
      <p class="my-6 text-lg text-gray-600">{{ message }}</p>
      <div class="flex justify-end gap-4">
        <button 
          class="px-6 py-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 font-medium hover:bg-gray-200 transition-colors" 
          @click="$emit('close')"
        >
          {{ cancelButtonText }}
        </button>
        <button class="px-6 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-colors" @click="handleConfirm">
          {{ confirmButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirmation-modal {
  padding: 1.5rem;
}

.message {
  margin: 1.5rem 0;
  font-size: 1.1rem;
  color: #666;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.cancel-btn {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #374151;
}

.confirm-btn {
  background-color: #ef4444;
  border: 1px solid #dc2626;
  color: white;
}
</style>
