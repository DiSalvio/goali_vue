<template>
  <form id="edit-sub-task-form" @submit.prevent="saveSubTask" @keyup.esc="cancelEdit" class="p-2">
    <div class="form-group">
      <div class="d-flex w-100">
        <label for="editName" class="mr-auto">Sub-Task Name</label>
        <button id="save-sub-task-edit-button" type="submit" class="badge badge-pill mb-1">
          <font-awesome-icon icon="floppy-disk"/>
        </button>
        <button id="cancel-sub-task-edit-button" @click="cancelEdit" class="badge badge-pill mb-1 text-danger">
          <font-awesome-icon icon="rectangle-xmark"/>
        </button>
      </div>
      <input id="edit-sub-task-name-input" v-model="editName" v-focus type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="editDescription">Sub-Task Description</label>
      <textarea id="edit-sub-task-description-input" @keyup.enter.prevent="saveSubTask" v-model="editDescription" cols="30" rows="5" class="form-control"/>
    </div>
    <div>
      <button id="submit-sub-task-edit-button" type="submit" class="btn btn-primary">Save Sub-Task</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    subTask: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      editName: this.subTask.name,
      editDescription: this.subTask.description
    }
  },
  emits: [
    "saveEditedSubTask",
    "finishEditingSubTask"
  ],
  methods: {
    saveSubTask () {
      const editedSubTask = {
        ...this.subTask,
        name: this.editName,
        description: this.editDescription
      }

      this.$emit('saveEditedSubTask', { editedSubTask })
      this.$emit('finishEditingSubTask', {})
    },
    cancelEdit () {
      this.$emit('finishEditingSubTask', {})
    }
  }
}
</script>
