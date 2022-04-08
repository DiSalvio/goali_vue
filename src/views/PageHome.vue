<template>
  <div class="container list-group">
    <div v-if="activeGoals.length != 0">
      <h1 class="text-muted">Goals</h1>
      <GoalList
        :goals="activeInProgressGoals"
        @saveEditedGoal="saveEditedGoal"
        @updateGoalCompletion="updateGoalCompletion"
        @updateGoalRemoval="updateGoalRemoval"
      />
      <GoalList
        :goals="activeCompletedGoals"
        @saveEditedGoal="saveEditedGoal"
        @updateGoalCompletion="updateGoalCompletion"
        @updateGoalRemoval="updateGoalRemoval"
      />
    </div>
    <h1 v-else>No active goals were found, add new goals below</h1>
    <GoalAdd @addGoal="addGoal"/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import GoalList from '@/components/GoalList.vue'
import GoalAdd from '@/components/GoalAdd.vue'
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      activeGoals: 'activeGoals',
      activeCompletedGoals: 'activeCompletedGoals',
      activeInProgressGoals: 'activeInProgressGoals'
    })
  },
  methods: {
    addGoal ({ newGoal }) {
      this.$store.dispatch('createGoal', {
        name: newGoal.name,
        description: newGoal.description
      })
    },
    saveEditedGoal ({ editedGoal }) {
      this.$store.dispatch('saveEditedGoal', {
        ...editedGoal
      })
    }
  }
}
</script>
