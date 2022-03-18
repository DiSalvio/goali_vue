<template>
  <div class="list-group-item">
    <div class="list-group-item-heading d-flex justify-content-between align-items-center">
      <h2>{{goal.name}}</h2>
      <span v-if="goal.completed" class="badge badge-secondary badge-pill">Done</span>
      <span v-else class="badge badge-warning badge-pill">In Progress</span>
    </div>
    <p class="list-group-item-light list-group-item-secondary">{{goal.description}}</p>
  </div>
</template> 

<script>
import sourceData from '@/data.json'
export default {
  data() {
    return {
      goals: sourceData.goals
    }
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    goal () {
      return this.goals.find(goal => goal.id === parseInt(this.id))
    }
  }
}
</script>
