<template>
  <h1 class="text-muted">Goals</h1>
  <div v-for="goal in goals" :key="goal.id" class="list-group-item">
    <div v-if="!editingThisGoal(goal.id)" class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h2 class="mb-1 mr-auto p-2">
          <router-link
            :to="{name: 'PageGoalShow', params: {goalId: goal.id}}"
          >
          {{goal.name}}
          </router-link>
        </h2>
        <div class="flex-column text-right">
          <div>
            <button @click="editGoal(goal.id)" class="badge badge-pill"><font-awesome-icon icon="user-pen"/></button>
            <button class="badge badge-pill"><font-awesome-icon icon="trash"/></button>
          </div>
          <span v-if="goal.completed" class="badge badge-secondary badge-pill">Done</span>
          <span v-else class="badge badge-warning badge-pill">In Progress</span>
        </div>
      </div>
      <div class="align-items-end d-flex w-100 justify-content-between">
        <p class="p-2 my-2 list-group-item-light list-group-item-secondary">{{goal.description}}</p>
        <AppDate :timestamp="goal.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
    </div>
    <div v-else>
      <GoalEditor :goal="goal" @finishEdit="finishEdit" @saveEditedGoal="saveEditedGoal"/>
    </div>
  </div>
</template>

<script>
import GoalEditor from '@/components/GoalEditor.vue'
export default {
  components: {
    GoalEditor
  },
  props: {
    goals: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      editingGoalId: null
    }
  },
  emits: [ "saveEditedGoal" ],
  methods: {
    editingThisGoal (goalId) {
      return this.editingGoalId === goalId
    },
    editGoal (goalId) {
      this.editingGoalId = goalId
    },
    finishEdit () {
      this.editingGoalId = null
    },
    saveEditedGoal (eventData) {
      this.$emit('saveEditedGoal', eventData)
    }
  }
}
</script>

<style>
@import "../assets/bootstrap.css"
</style>
