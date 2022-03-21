<template>
  <div class="list-group-item">
    <div class="list-group-item-heading d-flex justify-content-between align-items-center">
      <h2>{{task.name}}</h2>
      <span v-if="task.completed" class="badge badge-secondary badge-pill">Done</span>
      <span v-else class="badge badge-warning badge-pill">In Progress</span>
    </div>
    <p class="list-group-item-light list-group-item-secondary">{{task.description}}</p>
  </div>
</template> 

<script>
import sourceData from '@/data.json'
export default {
  data () {
    return {
      tasks: sourceData.tasks
    }
  },
  props: {
    taskId: {
      required: true,
      type: String
    },
    goalId: {
      required: true,
      type: String
    }
  },
  computed: {
    task () {
      return this.tasks.find(task => task.id === parseInt(this.taskId))
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
