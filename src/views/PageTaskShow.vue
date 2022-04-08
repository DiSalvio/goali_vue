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
            <button @click="removeTask(task)" class="badge badge-pill">
              <router-link class="text-danger" :to="{name: 'PageGoalShow', params: {goalId: goalId}}">
                <font-awesome-icon icon="trash"/>
              </router-link>
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
        <h4 class="text-muted">Sub-tasks</h4>
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
import sourceData from '@/data.json'
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
      tasks: sourceData.tasks,
      subTasks: sourceData.subTasks,
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
        ...editedTask
      })
    },
    removeTask (task) {
      this.$store.dispatch('saveEditedTask', {
        ...task,
        removed: true
      })
    },
    toggleTaskCompletion(task) {
      this.$store.dispatch('saveEditedTask', {
        ...task,
        completed: !task.completed
      })
    },
    addSubTask ({ newSubTask }) {
      this.$store.dispatch('createSubTask', {
        ...newSubTask,
        goal: parseInt(this.goalId),
        task: parseInt(this.taskId),
        user: this.task.user,
      })
    },
    saveEditedSubTask ({ editedSubTask }) {
      this.$store.dispatch('saveEditedSubTask', editedSubTask) 
    }
  }
}
</script>

<style>
@import "@/assets/bootstrap.css"
</style>
