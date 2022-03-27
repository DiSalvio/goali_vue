<template>
  <div class="list-group-item">
    <h5 class="text-muted">Add a new goal</h5>
    <form @submit.prevent="saveGoal">
      <div class="form-group">
        <label for="newName">Goal Name</label>
        <input v-model="newName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="newDescription">Goal Description</label>
        <textarea @keyup.enter.prevent="saveGoal" v-model="newDescription" cols="30" rows="5" class="form-control"/>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Add Goal</button>
      </div>
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
    saveGoal() {
      const newGoal = {
        name: this.newName,
        description: this.newDescription
      }

      this.$emit('addGoal', { newGoal })

      this.newName = ""
      this.newDescription = ""
    }
  }
}
</script>
