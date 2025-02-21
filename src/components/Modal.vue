<script setup>
import { computed } from 'vue'
import { ModalService } from '../services/ModalService'

const modals = computed(() => ModalService.modals.value)

const closeModal = (modalId) => {
  ModalService.hide(modalId)
}

const handleSave = (modalId, value) => {
  const modal = modals.value.find(m => m.id === modalId)
  if (modal?.props.onSave) {
    modal.props.onSave(value)
  }
}
</script>

<template>
  <Teleport to="body">
    <template v-for="modal in modals" :key="modal.id">
      <div 
        class="modal-overlay"
        @click="closeModal(modal.id)"
      >
      <div 
        class="modal-container"
        @click.stop
      >
        <div 
          class="modal-content"
        >
          <button 
            class="modal-close-button"
            @click="closeModal(modal.id)"
          >
            &times;
          </button>
          <component
            :is="modal.component"
            v-bind="modal.props"
            @close="closeModal(modal.id)"
            @save="(value) => handleSave(modal.id, value)"
          />
        </div>
      </div>
    </div>
    </template>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 40;
}

.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  min-width: 300px;
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
}

.modal-close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #6b7280;
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
}

.modal-close-button:hover {
  color: #374151;
}
</style>
