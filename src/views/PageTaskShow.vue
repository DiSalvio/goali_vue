<template>
  <div class="list-group-item">
    <div v-if="!editingTask" class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h2 class="mb-1 mr-auto p-2" :class="{ 'text-muted': task.completed }">{{task.name}}</h2>
        <div class="flex-column text-right">
          <div>
            <button @click="editTask()" class="badge badge-pill">
              <font-awesome-icon icon="user-pen"/>
            </button>
            <button @click="removeTask(task)" class="badge badge-pill text-danger">
              <font-awesome-icon icon="trash"/>
            </button>
          </div>
          <button
            v-if="task.completed"
            class="badge badge-secondary badge-pill"
            @click="toggleTaskCompletion(task)"
          >
            Done
          </button>
          <button
            v-else
            class="badge badge-warning badge-pill"
            @click="toggleTaskCompletion(task)"
          >
            In Progress
          </button>
        </div>
      </div>
      <div class="align-items-end d-flex w-100 justify-content-between">
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
    <div class="pt-3 container list-group">
      <div v-if="activeTaskSubTasks.length != 0">
        <h4 class="text-muted p-2">Sub-tasks</h4>
        <SubTaskList
          :subTasks="activeInProgressTaskSubTasks"
          @saveEditedSubTask="saveEditedSubTask"
        />
        <SubTaskList
          :subTasks="activeCompletedTaskSubTasks"
          @saveEditedSubTask="saveEditedSubTask"
        />
      </div>
      <SubTaskAdd @addSubTask="addSubTask"/>
    </div>
  </div>
</template> 

<script>
import SubTaskList from '@/components/SubTaskList.vue'
import SubTaskAdd from '@/components/SubTaskAdd.vue'
import TaskEditor from '@/components/TaskEditor.vue'
export default {
  components: {
    SubTaskList,
    SubTaskAdd,
    TaskEditor
  },
  data () {
    return {
      editingTask: false
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
      return this.$store.getters.task(this.taskId)
    },
    taskSubTasks () {
      return this.$store.getters.taskSubTasks(this.taskId)
    },
    activeTaskSubTasks () {
      return this.$store.getters.activeTaskSubTasks(this.taskSubTasks)
    },
    activeCompletedTaskSubTasks () {
      return this.$store.getters.activeCompletedTaskSubTasks(this.activeTaskSubTasks)
    },
    activeInProgressTaskSubTasks () {
      return this.$store.getters.activeInProgressTaskSubTasks(this.activeTaskSubTasks)
    }
  },
  methods: {
    editTask () {
      return this.editingTask = true
    },
    finishEditingTask () {
      return this.editingTask = false
    },
    saveEditedTask ({ editedTask }) {
      this.$store.dispatch('saveEditedTask', {
        editedTask: {
          ...editedTask
        },
        token: localStorage.getItem('token')
      })
    },
    async removeTask (editedTask) {
      const removed = await this.$store.dispatch('saveEditedTask', {
        editedTask: {
          ...editedTask,
          removed: true
        },
        token: localStorage.getItem('token')
      })
      if (removed) {
        this.$router.push({name: 'PageGoalShow', params: { goalId: this.goalId }})
      }
    },
    toggleTaskCompletion(editedTask) {
      this.$store.dispatch('saveEditedTask', {
        editedTask: {
          ...editedTask,
          completed: !editedTask.completed
        },
        token: localStorage.getItem('token')
      })
    },
    addSubTask ({ newSubTask }) {
      this.$store.dispatch('createSubTask', {
        newSubTask: {
          ...newSubTask,
          goal: parseInt(this.goalId),
          task: parseInt(this.taskId)
        },
        token: localStorage.getItem('token')
      })
    },
    saveEditedSubTask ({ editedSubTask }) {
      this.$store.dispatch('saveEditedSubTask', {
        editedSubTask: { ...editedSubTask },
        token: localStorage.getItem('token')
      })
    }
  },
  created () {
    this.$store.dispatch('fetchTaskSubTasks', {
      goalId: this.goalId,
      taskId: this.taskId,
      token: localStorage.getItem('token')
    })
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
