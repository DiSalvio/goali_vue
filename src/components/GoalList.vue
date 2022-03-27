<template>
  <h1 class="text-muted">Goals</h1>
  <div v-for="goal in goals" :key="goal.id" class="list-group-item">
    <div class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h2 class="mb-1">
          <router-link
            :to="{name: 'PageGoalShow', params: {goalId: goal.id}}"
          >
          {{goal.name}}
          </router-link>
        </h2>
        <span v-if="goal.completed" class="badge badge-secondary badge-pill">Done</span>
        <span v-else class="badge badge-warning badge-pill">In Progress</span>
      </div>
      <div class="align-items-end d-flex w-100 justify-content-between">
        <p class="my-2 list-group-item-light list-group-item-secondary">{{goal.description}}</p>
        <AppDate :timestamp="goal.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goals: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>
@import "../assets/bootstrap.css"
</style>
