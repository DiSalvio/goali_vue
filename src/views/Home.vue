<template>
  <div>
    {{goals}}
  </div>
</template>

<script>
import sourceData from '@/data.json'
export default {
  data() {
    return {
      goals: sourceData.goals
    }
  }
}
</script>
