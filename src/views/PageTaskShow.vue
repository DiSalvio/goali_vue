<template>
  <div class="list-group-item">
    <div class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h2 class="mb-1">{{task.name}}</h2>
        <span v-if="task.completed" class="badge badge-secondary badge-pill">Done</span>
        <span v-else class="badge badge-warning badge-pill">In Progress</span>
      </div>
      <div class="align-items-end d-flex w-100 justify-content-between">
        <p class="my-2 list-group-item-light list-group-item-secondary">{{task.description}}</p>
        <AppDate :timestamp="task.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
    </div>
    <div class="pt-3 container list-group">
      <SubTaskList v-if="taskSubTasks.length != 0" :subTasks="taskSubTasks"/>
      <SubTaskAdd @addSubTask="saveSubTask"/>
    </div>
  </div>
</template> 

<script>
import sourceData from '@/data.json'
import SubTaskList from '@/components/SubTaskList.vue'
import SubTaskAdd from '@/components/SubTaskAdd.vue'
export default {
  components: {
    SubTaskList,
    SubTaskAdd
  },
  data () {
    return {
      tasks: sourceData.tasks,
      subTasks: sourceData.subTasks
    }
  },
  props: {
    taskId: {
      required: true,
      type: String
    },
    goalId: {
      required: true,
      type: String
    }
  },
  computed: {
    task () {
      return this.tasks.find(task => task.id === parseInt(this.taskId))
    },
    taskSubTasks () {
      return this.subTasks.filter(subTask => subTask.task === parseInt(this.taskId))
    }
  },
  methods: {
    saveSubTask (eventData) {
      const newSubTask = {
        ...eventData.newSubTask,
        completed: false,
        id: this.subTasks[this.subTasks.length - 1].id + 1,
        goal: parseInt(this.goalId),
        task: parseInt(this.taskId)
      }
      this.subTasks.push(newSubTask)
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
