<template>
  <div class="container list-group">
    <div v-if="activeGoals.length != 0">
      <h1 id="yes-goals" class="text-muted">Goals</h1>
      <GoalList
        :goals="activeInProgressGoals"
        @saveEditedGoal="saveEditedGoal"
      />
      <GoalList
        :goals="activeCompletedGoals"
        @saveEditedGoal="saveEditedGoal"
      />
    </div>
    <h1 id="no-goals" v-else>No active goals were found, add new goals below</h1>
    <GoalAdd @addGoal="addGoal"/>
  </div>
</template>

<script>
import GoalList from '@/components/GoalList.vue'
import GoalAdd from '@/components/GoalAdd.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    GoalList,
    GoalAdd
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
        editedGoal
      })
    }
  },
  created () {
    this.$store.dispatch('fetchGoals')
  }
}
</script>
