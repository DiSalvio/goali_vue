<template>
  <div class="container list-group">
    <GoalList
      v-if="activeGoals.length != 0"
      :goals="activeGoals"
      @saveEditedGoal="saveGoal"
      @updateGoalCompletion="updateGoalCompletion"
      @updateGoalRemoval="updateGoalRemoval"
    />
    <h1 v-else>No active goals were found, add new goals below</h1>
    <GoalAdd @addGoal="addGoal"/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import GoalList from '@/components/GoalList.vue'
import GoalAdd from '@/components/GoalAdd.vue'
export default {
  components: {
    GoalList,
    GoalAdd
  },
  data() {
    return {
      goals: sourceData.goals
    }
  },
  computed: {
    activeGoals () {
      return this.goals.filter(goal => goal.removed === false)
    }
  },
  methods: {
    addGoal (eventData) {
      const goal = {
        ...eventData.newGoal,
        completed: false,
        id: this.goals[this.goals.length - 1].id + 1,
        user: 1,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString(),
        removed: false
      }
      this.goals.push(goal)
    },
    saveGoal (eventData) {
      const editedGoal = {
        ...eventData.editedGoal,
        updated: new Date(Date.now()).toISOString()
      }
      this.goals[
        this.goals.indexOf(
          this.goals.find(goal => goal.id === editedGoal.id)
        )
      ] = editedGoal
    },
    updateGoalCompletion (eventData) {
      const updatedGoal = {
        ...eventData.updatedGoal
      }
      this.goals[
        this.goals.indexOf(
          this.goals.find(goal => goal.id === updatedGoal.id)
        )
      ] = updatedGoal
    },
    updateGoalRemoval (eventData) {
      const updatedGoal = {
        ...eventData.updatedGoal
      }
      this.goals[
        this.goals.indexOf(
          this.goals.find(goal => goal.id === updatedGoal.id)
        )
      ] = updatedGoal
    }
  }
}
</script>
