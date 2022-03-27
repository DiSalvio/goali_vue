<template>
  <div class="pl-3">
    <h4 class="text-muted">Sub-tasks</h4>
    <div v-for="subTask in subTasks" :key="subTask.id" class="list-group-item">
      <div class="list-group-item-heading">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h5 class="mb-1">
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
        <div class="align-items-end d-flex w-100 justify-content-between">
          <p class="my-2 list-group-item-light list-group-item-secondary">{{subTask.description}}</p>
          <AppDate :timestamp="subTask.updated" class="badge badge-light badge-pill pull-right"/>
        </div>
      </div>
    </div>
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
