<template>
  <div class="list-group-item">
    <div v-if="!editingSubTask" class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h4 class="mb-1 mr-auto p-2" :class="{ 'text-muted': subTask.completed }">{{subTask.name}}</h4>
        <div class="flex-column text-right">
          <div>
            <button @click="editSubTask()" class="badge badge-pill">
              <font-awesome-icon icon="user-pen"/>
            </button>
            <button @click="removeSubTask()" class="badge badge-pill">
              <router-link class="text-danger" :to="{name: 'PageTaskShow', params: {goalId: goalId, taskId: taskId}}">
                <font-awesome-icon icon="trash"/>
              </router-link>
            </button>
          </div>
          <button
            v-if="subTask.completed"
            class="badge badge-secondary badge-pill"
            @click="toggleSubTaskCompletion()"
          >
            Done
          </button>
          <button
            v-else
            class="badge badge-warning badge-pill"
            @click="toggleSubTaskCompletion"
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
    },
    toggleSubTaskCompletion () {
      this.subTask.completed = !this.subTask.completed
    },
    removeSubTask () {
      const updatedSubTask = {
        ...this.subTask,
        removed: true
      }
      this.subTasks[
        this.subTasks.indexOf(
          this.subTasks.find(subTask => subTask.id === updatedSubTask.id)
        )
      ] = updatedSubTask
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
