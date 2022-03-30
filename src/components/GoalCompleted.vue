<template>
  <div class="list-group-item-heading">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <del class="mb-1 mr-auto p-2">
        <router-link
          :to="{name: 'PageGoalShow', params: {goalId: goal.id}}"
          class="text-muted"
        >
        {{goal.name}}
        </router-link>
      </del>
      <div class="flex-column text-right">
        <div>
          <button @click="editGoal(goal.id)" class="badge badge-pill">
            <font-awesome-icon icon="user-pen"/>
          </button>
          <button @click="removeGoal(goal)" class="badge badge-pill text-danger">
            <font-awesome-icon icon="trash"/>
          </button>
        </div>
        <div>
          <button @click="toggleGoalCompletion(goal)" class="badge badge-secondary badge-pill">Done</button>
        </div>
        <AppDate :timestamp="goal.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
    </div>
    <div class="align-items-end d-flex w-100 justify-content-between">
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
