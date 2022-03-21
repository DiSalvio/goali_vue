<template>
  <GoalList :goals="goals"/>
</template>

<script>
import sourceData from '@/data.json'
import GoalList from '@/components/GoalList.vue'
export default {
  components: {
    GoalList
  },
  data() {
    return {
      goals: sourceData.goals
    }
  },
}
</script>
