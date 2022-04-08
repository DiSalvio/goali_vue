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
            <button @click="removeSubTask(subTask)" class="badge badge-pill">
              <router-link class="text-danger" :to="{name: 'PageTaskShow', params: {goalId: goalId, taskId: taskId}}">
                <font-awesome-icon icon="trash"/>
              </router-link>
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
</template> 

<script>
import SubTaskEditor from '@/components/SubTaskEditor.vue'
export default {
  components: {
    SubTaskEditor
  },
  data () {
    return {
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
      return this.$store.getters.subTask(this.subTaskId)
    }
  },
  methods: {
    editSubTask () {
      return this.editingSubTask = true
    },
    finishEditingSubTask () {
      return this.editingSubTask = false
    },
    saveEditedSubTask ({ editedSubTask }) {
      this.$store.dispatch('saveEditedSubTask', {
        ...editedSubTask
      })
    },
    toggleSubTaskCompletion (subTask) {
      this.$store.dispatch('saveEditedSubTask', {
        ...subTask,
        completed: !subTask.completed
      })
    },
    removeSubTask (subTask) {
      this.$store.dispatch('saveEditedSubTask', {
        ...subTask,
        removed: true
      })
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
