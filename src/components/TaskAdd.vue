<template>
  <div class="list-group-item">
    <h5 class="text-muted">Add a new task</h5>
    <form @submit.prevent="addTask">
      <div class="form-group">
        <label for="newName">Task Name</label>
        <input v-model="newName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="newDescription">Task Description</label>
        <input v-model="newDescription" type="text" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>
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
    addTask () {
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
