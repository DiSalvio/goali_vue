<template>
  <div class="list-group-item">
    <div class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h4 class="mb-1">{{subTask.name}}</h4>
        <span v-if="subTask.completed" class="badge badge-secondary badge-pill">Done</span>
        <span v-else class="badge badge-warning badge-pill">In Progress</span>
      </div>
      <div class="align-items-end d-flex w-100 justify-content-between">
        <p class="my-2 list-group-item-light list-group-item-secondary">{{subTask.description}}</p>
        <AppDate :timestamp="subTask.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
    </div>
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
