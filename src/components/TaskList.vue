<template>
  <div class="pl-3">
    <h3 class="text-muted">Tasks</h3>
    <div v-for="task in tasks" :key="task.id" class="list-group-item">
      <div class="list-group-item-heading">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h4 class="mb-1">
            <router-link
              :to="{name: 'PageTaskShow', params: {goalId: task.goal, taskId: task.id}}"
            >
              {{task.name}}
            </router-link>
          </h4>
          <span v-if="task.completed" class="badge badge-secondary badge-pill">Done</span>
          <span v-else class="badge badge-warning badge-pill">In Progress</span>
        </div>
      </div>
      <div class="align-items-end d-flex w-100100 justify-content-between">
        <p class="my-2 list-group-item-light list-group-item-secondary">{{task.description}}</p>
        <AppDate :timestamp="task.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
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
