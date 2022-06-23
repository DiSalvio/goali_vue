<template>
  <form id="edit-task-form" @keyup.esc="cancelEdit" @submit.prevent="saveTask" class="p-2">
    <div class="form-group">
      <div class="d-flex w-100">
        <label for="editName" class="mr-auto">Task Name</label>
        <button id="save-edit-task-button" type="submit" class="badge badge-pill mb-1"><font-awesome-icon icon="floppy-disk"/></button>
        <button id="cancel-edit-task-button" @click="cancelEdit" class="badge badge-pill mb-1 text-danger"><font-awesome-icon icon="rectangle-xmark"/></button>
      </div>
      <input id="edit-task-name-input" v-model="editName" v-focus type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="editDescription">Task Description</label>
      <textarea id-"edit-task-description-input" @keyup.enter.prevent="saveTask" v-model="editDescription" cols="30" rows="5" class="form-control"/>
    </div>
    <div>
      <button id="submit-edited-task-button" type="submit" class="btn btn-primary">Save Task</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    task: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      editName: this.task.name,
      editDescription: this.task.description
    }
  },
  emits: [
    "saveEditedTask",
    "finishEditingTask"
  ],
  methods: {
    saveTask () {
      const editedTask = {
        ...this.task,
        name: this.editName,
        description: this.editDescription
      }

      this.$emit('saveEditedTask', { editedTask })
      this.$emit('finishEditingTask', {})
    },
    cancelEdit () {
      this.$emit('finishEditingTask', {})
    }
  }
}
</script>
