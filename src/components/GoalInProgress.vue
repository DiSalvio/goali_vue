<template>
  <div class="list-group-item-heading">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h2 id="goal-name-in-progress" class="mb-1 mr-auto p-2">
        <router-link
          :to="{name: 'PageGoalShow', params: {goalId: goal.id}}"
        >
        {{goal.name}}
        </router-link>
      </h2>
      <div class="flex-column text-right">
        <div>
          <button id="edit-goal-in-progress" @click="editGoal(goal.id)" class="badge badge-pill">
            <font-awesome-icon icon="user-pen"/>
          </button>
          <button id="remove-goal-in-progress" @click="removeGoal(goal)" class="badge badge-pill text-danger">
            <font-awesome-icon icon="trash"/>
          </button>
        </div>
        <button id="toggle-goal-completion-in-progress" @click="toggleGoalCompletion(goal)" class="badge badge-warning badge-pill">In Progress</button>
      </div>
    </div>
    <div class="align-items-end d-flex w-100 justify-content-between">
      <p id="goal-description-in-progress" class="p-2 my-2 list-group-item-light list-group-item-secondary">
        {{goal.description}}
      </p>
      <AppDate :timestamp="goal.updated" class="badge badge-light badge-pill pull-right"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goal: {
      required: true,
      type: Object
    }
  },
  emits: ["editGoal", "removeGoal", "toggleGoalCompletion"],
  methods: {
    editGoal (goalId) {
      this.$emit("editGoal", { goalId } )
    },
    removeGoal (goal) {
      this.$emit("removeGoal", { goal })
    },
    toggleGoalCompletion (goal) {
      this.$emit("toggleGoalCompletion", { goal })
    }
  }
}
</script>
