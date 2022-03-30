<template>
  <div class="pl-3">
    <h4 class="text-muted">Sub-tasks</h4>
    <div v-for="subTask in subTasks" :key="subTask.id" class="list-group-item">
      <div v-if="!editingThisSubTask(subTask.id)" class="list-group-item-heading">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h5 class="mb-1 mr-auto p-2">
            <router-link
              :to="{name: 'PageSubTaskShow',
              params: {goalId: subTask.goal, taskId: subTask.task, subTaskId: subTask.id}}"
            >
              {{subTask.name}}
            </router-link>
          </h5>
          <div class="flex-column text-right">
            <div>
              <button @click="editSubTask(subTask.id)" class="badge badge-pill">
                <font-awesome-icon icon="user-pen"/>
              </button>
              <button class="badge badge-pill text-danger">
                <font-awesome-icon @click="removeSubTask(subTask)" icon="trash"/>
              </button>
            </div>
            <button
              v-if="subTask.completed"
              class="badge badge-secondary badge-pill"
              @click="toggleSubTaskCompletion(subTask)"
            >
              Done
            </button>
            <button
              v-else
              class="badge badge-warning badge-pill"
              @click="toggleSubTaskCompletion(subTask)"
            >
              In Progress
            </button>
          </div>
        </div>
        <div class="align-items-end d-flex w-100 justify-content-between">
          <p class="my-2 list-group-item-light list-group-item-secondary">
            {{subTask.description}}
          </p>
          <AppDate :timestamp="subTask.updated" class="badge badge-light badge-pill pull-right"/>
        </div>
      </div>
      <div v-else>
        <SubTaskEditor
          :subTask="subTask"
          @finishEditingSubTask="finishEditingSubTask"
          @saveEditedSubTask="saveEditedSubTask"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubTaskEditor from "@/components/SubTaskEditor.vue"
export default {
  components: {
    SubTaskEditor
  },
  props: {
    subTasks: {
      requred: true,
      type: Array
    }
  },
  data () {
    return {
      editingSubTaskId: null
    }
  },
  emits: [
    "saveEditedSubTask",
    "updateSubTaskCompletion",
    "updateSubTaskRemoval"
  ],
  methods: {
    editingThisSubTask (subTaskId) {
      return this.editingSubTaskId === subTaskId
    },
    editSubTask (subTaskId) {
      this.editingSubTaskId = subTaskId
    },
    finishEditingSubTask () {
      this.editingSubTaskId = null
    },
    saveEditedSubTask (eventData) {
      this.$emit('saveEditedSubTask', eventData)
    },
    toggleSubTaskCompletion (subTask) {
      const updatedSubTask = {
        ...subTask,
        completed: !subTask.completed
      }
      this.$emit('updateSubTaskCompletion', { updatedSubTask })
    },
    removeSubTask (subTask) {
      const updatedSubTask = {
        ...subTask,
        removed: true
      }
      this.$emit('updateSubTaskRemoval', { updatedSubTask })
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
