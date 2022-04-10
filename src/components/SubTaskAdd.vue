<template>
  <div class="pl-3">
    <div class="list-group-item">
      <h5 class="text-muted p-2">Add a new sub-task</h5>
      <form @submit.prevent="saveSubTask" class="p-2">
        <div class="form-group">
          <label for="newName">Sub-task Name</label>
          <input v-model="newName" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="newDescription">Sub-task Description</label>
          <textarea @keyup.enter.prevent="saveSubTask" v-model="newDescription" cols="30" rows="5" class="form-control"/>
        </div>
        <button type="submit" class="btn btn-primary">Add sub-task</button>
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
    saveSubTask () {
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
