import { ref, shallowRef } from 'vue'

export const ModalService = {
  modals: ref([]),
  show(component, props = {}) {
    this.modals.value.push({
      id: Date.now(), // Unique identifier for each modal
      component: shallowRef(component),
      props
    })
  },
  hide(modalId) {
    const index = this.modals.value.findIndex(modal => modal.id === modalId)
    if (index > -1) {
      this.modals.value.splice(index, 1)
    }
  },
  hideAll() {
    this.modals.value = []
  }
}
