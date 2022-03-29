<template>
  <div class="pl-3">
    <h3 class="text-muted">Tasks</h3>
    <div v-for="task in tasks" :key="task.id" class="list-group-item">
      <div v-if="!editingThisTask(task.id)" class="list-group-item-heading">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h4 class="mb-1 mr-auto p-2">
            <router-link
              :to="{name: 'PageTaskShow', params: {goalId: task.goal, taskId: task.id}}"
            >
              {{task.name}}
            </router-link>
          </h4>
          <div class="flex-column text-right">
            <div>
              <button @click="editTask(task.id)" class="badge badge-pill">
                <font-awesome-icon icon="user-pen"/>
              </button>
              <button class="badge badge-pill">
                <font-awesome-icon icon="trash"/>
              </button>
            </div>
            <span v-if="task.completed" class="badge badge-secondary badge-pill">Done</span>
            <span v-else class="badge badge-warning badge-pill">In Progress</span>
          </div>
        </div>
        <div class="align-items-end d-flex w-100100 justify-content-between">
          <p class="p-2 my-2 list-group-item-light list-group-item-secondary">
            {{task.description}}
          </p>
          <AppDate :timestamp="task.updated" class="badge badge-light badge-pill pull-right"/>
        </div>
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
export default {
  components: {
    TaskEditor
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
  emits: [ "saveEditedTask" ],
  methods: {
    editingThisTask (taskId) {
      return this.editingTaskId === taskId
    },
    editTask (taskId) {
      this.editingTaskId = taskId
    },
    finishEditingTask () {
      this.editingTaskId = null
    },
    saveEditedTask (eventData) {
      this.$emit('saveEditedTask', eventData)
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
