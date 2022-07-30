import { updateItemInArray } from '@/helpers/index.js'

export default {
  setGoals (state, goals) {
    state.goals = goals
  },
  pushGoal (state, newGoal) {
    state.goals.push(newGoal)
  },
  updateGoal: updateItemInArray({ resource: 'goals' })
}
