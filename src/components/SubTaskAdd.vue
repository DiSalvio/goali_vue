<template>
  <div class="list-group-item">
    <h5 class="text-muted">Add a new sub-task</h5>
    <form @submit.prevent="addSubTask">
      <div class="form-group">
        <label for="newName">Sub-task Name</label>
        <input v-model="newName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="newDescription">Sub-task Description</label>
        <input v-model="newDescription" type="text" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Add sub-task</button>
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
    addSubTask () {
      const newSubTask = {
        name: this.newName,
        description: this.newDescription
      }
      this.$emit('addSubTask', { newSubTask })
      this.newName = ""
      this.newDescription = ""
    }
  }
}
</script>
