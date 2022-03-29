<template>
  <form @submit.prevent="saveSubTask" class="p-2">
    <div class="form-group">
      <div class="d-flex w-100">
        <label for="editName" class="mr-auto">Sub-Task Name</label>
        <button type="submit" class="badge badge-pill mb-1"><font-awesome-icon icon="floppy-disk"/></button>
        <button class="badge badge-pill mb-1"><font-awesome-icon icon="trash"/></button>
      </div>
      <input v-model="editName" v-focus type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="editDescription">Sub-Task Description</label>
      <textarea @keyup.enter.prevent="saveSubTask" v-model="editDescription" cols="30" rows="5" class="form-control"/>
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Save Sub-Task</button>
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
    }
  }
}
</script>
