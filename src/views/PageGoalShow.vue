<template>
  <div class="list-group-item">
    <div class="list-group-item-heading d-flex justify-content-between align-items-center">
      <h2>{{goal.name}}</h2>
      <span v-if="goal.completed" class="badge badge-secondary badge-pill">Done</span>
      <span v-else class="badge badge-warning badge-pill">In Progress</span>
    </div>
    <p class="list-group-item-light list-group-item-secondary">{{goal.description}}</p>
    <div class="container list-group">
      <TaskList v-if="goalTasks.length != 0" :tasks="goalTasks"/>
      <TaskAdd @addTask="saveTask"/>
    </div>
  </div>
</template> 

<script>
import sourceData from '@/data.json'
import TaskList from '@/components/TaskList.vue'
import TaskAdd from '@/components/TaskAdd.vue'
export default {
  components: {
    TaskList,
    TaskAdd
  },
  data() {
    return {
      goals: sourceData.goals,
      tasks: sourceData.tasks
    }
  },
  props: {
    goalId: {
      required: true,
      type: String
    }
  },
  computed: {
    goal () {
      return this.goals.find(goal => goal.id === parseInt(this.goalId))
    },
    goalTasks() {
      return this.tasks.filter(task => task.goal === parseInt(this.goalId))
    }
  },
  methods: {
    saveTask (eventData) {
      const newTask = {
        ...eventData.newTask,
        completed: false,
        id: this.tasks[this.tasks.length - 1].id + 1,
        goal: parseInt(this.goalId)
      }
      this.tasks.push(newTask)
    }
  }
}
</script>
