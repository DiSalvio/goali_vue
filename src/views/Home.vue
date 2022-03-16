<template>
  <div>
    <div v-for="goal in goals" :key="goal.id">
      <h1>{{goal.name}}</h1>
      <p>{{goal.description}}</p>
    </div>
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
}
</script>
