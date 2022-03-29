<template>
  <div class="container list-group">
    <GoalList v-if="goals.length != 0" :goals="goals" @saveEditedGoal="saveGoal"/>
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
  methods: {
    addGoal (eventData) {
      const goal = {
        ...eventData.newGoal,
        completed: false,
        id: this.goals[this.goals.length - 1].id + 1,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString()
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
    }
  }
}
</script>
