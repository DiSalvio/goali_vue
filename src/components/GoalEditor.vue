<template>
  <form @keyup.esc="cancelEdit" @submit.prevent="saveGoal" class="p-2">
    <div class="form-group">
      <div class="d-flex w-100">
        <label for="editName" class="mr-auto">Goal Name</label>
        <button type="submit" class="badge badge-pill mb-1"><font-awesome-icon icon="floppy-disk"/></button>
        <button @click="cancelEdit" class="badge badge-pill mb-1 text-danger"><font-awesome-icon icon="rectangle-xmark"/></button>
      </div>
      <input v-model="editName" v-focus type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="editDescription">Goal Description</label>
      <textarea @keyup.enter.prevent="saveGoal" v-model="editDescription" cols="30" rows="5" class="form-control"/>
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Save Goal</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    goal: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      editName: this.goal.name,
      editDescription: this.goal.description
    }
  },
  emits: [
    "saveEditedGoal",
    "finishEditingGoal"
  ],
  methods: {
    saveGoal () {
      const editedGoal = {
        ...this.goal,
        name: this.editName,
        description: this.editDescription
      }

      this.$emit('saveEditedGoal', { editedGoal })
      this.$emit('finishEditingGoal', {})
    },
    cancelEdit () {
      this.$emit('finishEditingGoal', {})
    }
  }
}
</script>
