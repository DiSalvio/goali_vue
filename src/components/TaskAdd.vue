<template>
  <div class="pl-3">
    <div class="list-group-item">
      <h5 id="add-task-header" class="p-2 text-muted">Add a new task</h5>
      <form id="add-task-form" @submit.prevent="saveTask" class="p-2">
        <div class="form-group">
          <label for="newName">Task Name</label>
          <input id="add-task-name-input" v-model="newName" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="newDescription">Task Description</label>
          <textarea id="add-task-description-input" @keyup.enter.prevent="saveTask" v-model="newDescription" cols="30" rows="5" class="form-control"/>
        </div>
        <button id="add-task-submit-button" type="submit" class="btn btn-primary">Add Task</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newName: "",
      newDescription: ""
    }
  },
  methods: {
    saveTask () {
      const newTask = {
        name: this.newName,
        description: this.newDescription
      }
      this.$emit('addTask', { newTask })
      this.newName = ""
      this.newDescription = ""
    }
  }
}
</script>
