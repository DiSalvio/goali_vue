<template>
  <div v-for="goal in goals" :key="goal.id" class="list-group-item">
    <div v-if="!editingThisGoal(goal.id)">
      <GoalCompleted 
        :goal="goal"
        v-if="goal.completed"
        @editGoal="editGoal"
        @removeGoal="removeGoal"
        @toggleGoalCompletion="toggleGoalCompletion"
      />
      <GoalInProgress
        :goal="goal"
        v-else
        @editGoal="editGoal"
        @removeGoal="removeGoal"
        @toggleGoalCompletion="toggleGoalCompletion"
      />
    </div>
    <div v-else>
      <GoalEditor :goal="goal" @finishEditingGoal="finishEditingGoal" @saveEditedGoal="saveEditedGoal"/>
    </div>
  </div>
</template>

<script>
import GoalEditor from '@/components/GoalEditor.vue'
import GoalCompleted from '@/components/GoalCompleted.vue'
import GoalInProgress from '@/components/GoalInProgress.vue'
export default {
  components: {
    GoalEditor,
    GoalCompleted,
    GoalInProgress
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
  emits: [ 
    "saveEditedGoal",
    "updateGoalCompletion",
    "updateGoalRemoval"
  ],
  methods: {
    editingThisGoal (goalId) {
      return this.editingGoalId === goalId
    },
    editGoal (eventData) {
      this.editingGoalId = eventData.goalId
    },
    finishEditingGoal () {
      this.editingGoalId = null
    },
    saveEditedGoal (eventData) {
      this.$emit('saveEditedGoal', eventData)
    },
    toggleGoalCompletion (eventData) {
      const editedGoal = {
        ...eventData.goal,
        completed: !eventData.goal.completed
      }
      this.$emit('saveEditedGoal', { editedGoal })
    },
    removeGoal (eventData) {
      const editedGoal = {
        ...eventData.goal,
        removed: true
      }
      this.$emit('saveEditedGoal', { editedGoal })
    }
  }
}
</script>

<style>
@import "../assets/bootstrap.css"
</style>
