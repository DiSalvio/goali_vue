<template>
  <div class="container list-group">
    <h3 class="text-muted">Tasks</h3>
    <div v-for="task in tasks" :key="task.id" class="list-group-item">
      <div class="list-group-item-heading d-flex justify-content-between align-items-center">
        <h4><router-link :to="{name: 'PageTaskShow', params: {goalId: task.goal, taskId: task.id}}">{{task.name}}</router-link></h4>
        <span v-if="task.completed" class="badge badge-secondary badge-pill">Done</span>
        <span v-else class="badge badge-warning badge-pill">In Progress</span>
      </div>
      <p class="list-group-item-light list-group-item-secondary">{{task.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      requred: true,
      type: Array
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
