<template>
  <h4 class="text-muted">Sub-tasks</h4>
  <div v-for="subTask in subTasks" :key="subTask.id" class="list-group-item">
    <div class="list-group-item-heading d-flex justify-content-between align-items-center">
      <h5>
        <router-link
          :to="{name: 'PageSubTaskShow',
          params: {goalId: subTask.goal, taskId: subTask.task, subTaskId: subTask.id}}"
        >
        {{subTask.name}}
        </router-link>
      </h5>
      <span v-if="subTask.completed" class="badge badge-secondary badge-pill">Done</span>
      <span v-else class="badge badge-warning badge-pill">In Progress</span>
    </div>
    <p class="list-group-item-light list-group-item-secondary">{{subTask.description}}</p>
  </div>
</template>

<script>
export default {
  props: {
    subTasks: {
      requred: true,
      type: Array
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
