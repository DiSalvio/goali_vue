<template>
  <div class="list-group-item">
    <div class="list-group-item-heading d-flex justify-content-between align-items-center">
      <h4>{{subTask.name}}</h4>
      <span v-if="subTask.completed" class="badge badge-secondary badge-pill">Done</span>
      <span v-else class="badge badge-warning badge-pill">In Progress</span>
    </div>
    <p class="list-group-item-light list-group-item-secondary">{{subTask.description}}</p>
  </div>
</template> 

<script>
import sourceData from '@/data.json'
export default {
  data () {
    return {
      subTasks: sourceData.subTasks
    }
  },
  props: {
    subTaskId: {
      required: true,
      type: String
    },
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
    subTask () {
      return this.subTasks.find(subTask => subTask.id === parseInt(this.subTaskId))
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
