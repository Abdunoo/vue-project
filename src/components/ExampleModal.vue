<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Modal Title'
  }
})

const inputValue = ref('')
const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const inputValue4 = ref('')
const inputValue5 = ref('')
const inputValue6 = ref('')
const emit = defineEmits(['close', 'save'])

const handleSave = () => {
    const values = [inputValue.value, inputValue1.value, inputValue2.value, inputValue3.value, inputValue4.value, inputValue5.value, inputValue6.value] 
  emit('save', values)
  emit('close')
}
</script>

<template>
  <div class="example-modal">
    <h2>{{ title }}</h2>
    <div class="content">
   
      <input 
        v-model="inputValue" 
        type="text" 
        placeholder="Enter your text"
      >
      <input 
        v-model="inputValue1" 
        type="text" 
        placeholder="Enter your text"
      >
      <input 
        v-model="inputValue2" 
        type="text" 
        placeholder="Enter your text"
      >
      <input 
        v-model="inputValue3" 
        type="text" 
        placeholder="Enter your text"
      >
      <input 
        v-model="inputValue4" 
        type="text" 
        placeholder="Enter your text"
      >
      <input 
        v-model="inputValue5" 
        type="text" 
        placeholder="Enter your text"
      >
      <input 
        v-model="inputValue6" 
        type="text" 
        placeholder="Enter your text"
      >

      <div class="modal-actions">
        <button @click="$emit('close')">Cancel</button>
        <button @click="handleSave">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-modal {
  padding: 1rem;
}

.content {
  margin-top: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
