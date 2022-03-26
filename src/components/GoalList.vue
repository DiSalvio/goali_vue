<template>
  <h1 class="text-muted">Goals</h1>
  <div v-for="goal in goals" :key="goal.id" class="list-group-item">
    <div class="list-group-item-heading d-flex justify-content-between align-items-center">
      <h2>
        <router-link
          :to="{name: 'PageGoalShow', params: {goalId: goal.id}}"
        >
        {{goal.name}}
        </router-link>
      </h2>
      <span v-if="goal.completed" class="badge badge-secondary badge-pill">Done</span>
      <span v-else class="badge badge-warning badge-pill">In Progress</span>
    </div>
    <p class="list-group-item-light list-group-item-secondary">{{goal.description}}</p>
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
