<template>
  <div class="pl-3">
    <div v-for="task in tasks" :key="task.id" class="list-group-item">
      <div v-if="!editingThisTask(task.id)">
        <TaskCompleted
          :task="task"
          v-if="task.completed"
          @editTask="editTask"
          @removeTask="removeTask"
          @toggleTaskCompletion="toggleTaskCompletion"
        />
        <TaskInProgress
          :task="task"
          v-else
          @editTask="editTask"
          @removeTask="removeTask"
          @toggleTaskCompletion="toggleTaskCompletion"
        />
      </div>
      <div v-else>
        <TaskEditor
          :task="task"
          @finishEditingTask="finishEditingTask"
          @saveEditedTask="saveEditedTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskEditor from "@/components/TaskEditor.vue"
import TaskCompleted from "@/components/TaskCompleted.vue"
import TaskInProgress from "@/components/TaskInProgress.vue"
export default {
  components: {
    TaskEditor,
    TaskCompleted,
    TaskInProgress
  },
  props: {
    tasks: {
      requred: true,
      type: Array
    }
  },
  data () {
    return {
      editingTaskId: null
    }
  },
  emits: [
    "saveEditedTask",
    "updateTaskCompletion",
    "updateTaskRemoval"
  ],
  methods: {
    editingThisTask (taskId) {
      return this.editingTaskId === taskId
    },
    editTask (eventData) {
      this.editingTaskId = eventData.taskId
    },
    finishEditingTask () {
      this.editingTaskId = null
    },
    saveEditedTask (eventData) {
      this.$emit('saveEditedTask', eventData)
    },
    toggleTaskCompletion (eventData) {
      const updatedTask = {
        ...eventData.task,
        completed: !eventData.task.completed
      }
      this.$emit('updateTaskCompletion', { updatedTask })
    },
    removeTask (eventData) {
      const updatedTask = {
        ...eventData.task,
        removed: true
      }
      this.$emit('updateTaskRemoval', { updatedTask })
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
