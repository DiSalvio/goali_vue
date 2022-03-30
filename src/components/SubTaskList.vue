<template>
  <div class="pl-3">
    <h4 class="text-muted">Sub-tasks</h4>
    <div v-for="subTask in subTasks" :key="subTask.id" class="list-group-item">
      <div v-if="!editingThisSubTask(subTask.id)">
        <SubTaskCompleted
          :subTask="subTask"
          v-if="subTask.completed"
          @editSubTask="editSubTask"
          @removeSubTask="removeSubTask"
          @toggleSubTaskCompletion="toggleSubTaskCompletion"
        />
        <SubTaskInProgress
          :subTask="subTask"
          v-else
          @editSubTask="editSubTask"
          @removeSubTask="removeSubTask"
          @toggleSubTaskCompletion="toggleSubTaskCompletion"
        />
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
import SubTaskCompleted from "@/components/SubTaskCompleted.vue"
import SubTaskInProgress from "@/components/SubTaskInProgress.vue"
export default {
  components: {
    SubTaskEditor,
    SubTaskCompleted,
    SubTaskInProgress
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
    editSubTask (eventData) {
      this.editingSubTaskId = eventData.subTaskId
    },
    finishEditingSubTask () {
      this.editingSubTaskId = null
    },
    saveEditedSubTask (eventData) {
      this.$emit('saveEditedSubTask', eventData)
    },
    toggleSubTaskCompletion (eventData) {
      const updatedSubTask = {
        ...eventData.subTask,
        completed: !eventData.subTask.completed
      }
      this.$emit('updateSubTaskCompletion', { updatedSubTask })
    },
    removeSubTask (eventData) {
      const updatedSubTask = {
        ...eventData.subTask,
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
