<template>
  <div class="list-group-item">
    <div v-if="!editingSubTask" class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h4 class="mb-1 mr-auto p-2">{{subTask.name}}</h4>
        <div class="flex-column text-right">
          <div>
            <button @click="editSubTask()" class="badge badge-pill">
              <font-awesome-icon icon="user-pen"/>
            </button>
            <button class="badge badge-pill">
              <font-awesome-icon icon="trash"/>
            </button>
          </div>
          <span v-if="subTask.completed" class="badge badge-secondary badge-pill">Done</span>
          <span v-else class="badge badge-warning badge-pill">In Progress</span>
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
</template> 

<script>
import sourceData from '@/data.json'
import SubTaskEditor from '@/components/SubTaskEditor.vue'
export default {
  components: {
    SubTaskEditor
  },
  data () {
    return {
      subTasks: sourceData.subTasks,
      editingSubTask: false
    }
  },
  props: {
    subTaskId: {
      required: true,
      type: String
    },
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
    subTask () {
      return this.subTasks.find(subTask => subTask.id === parseInt(this.subTaskId))
    }
  },
  methods: {
    editSubTask () {
      return this.editingSubTask = true
    },
    finishEditingSubTask () {
      return this.editingSubTask = false
    },
    saveEditedSubTask (eventData) {
      const editedSubTask = {
        ...eventData.editedSubTask,
        updated: new Date(Date.now()).toISOString()
      }
      this.subTasks[
        this.subTasks.indexOf(
          this.subTasks.find(subTask => subTask.id === editedSubTask.id)
        )
      ] = editedSubTask
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
