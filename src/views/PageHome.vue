<template>
  <div class="container list-group">
    <GoalList :goals="goals"/>
    <GoalAdd @addGoal="saveGoal"/>
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
    saveGoal (eventData) {
      const goal = {
        ...eventData.newGoal,
        completed: false,
        id: this.goals[this.goals.length - 1].id + 1
      }
      this.goals.push(goal)
    }
  }
}
</script>
