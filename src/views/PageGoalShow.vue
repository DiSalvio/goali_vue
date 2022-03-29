<template>
  <div class="list-group-item">
    <div v-if="!editingGoal" class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h2 class="mb-1 mr-auto p-2">{{goal.name}}</h2>
        <div class="flex-column text-right">
          <div>
            <button @click="editGoal()" class="badge badge-pill">
              <font-awesome-icon icon="user-pen"/>
            </button>
            <button class="badge badge-pill">
              <font-awesome-icon icon="trash"/>
            </button>
          </div>
          <button
            v-if="goal.completed"
            class="badge badge-secondary badge-pill"
            @click="toggleGoalCompletion()"
          >
            Done
          </button>
          <button
            v-else
            class="badge badge-warning badge-pill"
            @click="toggleGoalCompletion()"
          >
            In Progress
          </button>
        </div>
      </div>
      <div class="align-items-end d-flex w-100 justify-content-between">
        <p class="p-2 my-2 list-group-item-light list-group-item-secondary">
          {{goal.description}}
        </p>
        <AppDate :timestamp="goal.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
    </div>
    <div v-else>
      <GoalEditor
        :goal="goal"
        @finishEditingGoal="finishEditingGoal"
        @saveEditedGoal="saveEditedGoal"
      />
    </div>
    <div class="pt-3 container list-group">
      <TaskList
        v-if="goalTasks.length != 0"
        :tasks="goalTasks"
        @saveEditedTask="saveEditedTask"
        @updateTaskCompletion="updateTaskCompletion"
      />
      <TaskAdd @addTask="addTask"/>
    </div>
  </div>
</template> 

<script>
import sourceData from '@/data.json'
import TaskList from '@/components/TaskList.vue'
import TaskAdd from '@/components/TaskAdd.vue'
import GoalEditor from '@/components/GoalEditor.vue'
export default {
  components: {
    TaskList,
    TaskAdd,
    GoalEditor
  },
  data() {
    return {
      goals: sourceData.goals,
      tasks: sourceData.tasks,
      editingGoal: false
    }
  },
  props: {
    goalId: {
      required: true,
      type: String
    }
  },
  computed: {
    goal () {
      return this.goals.find(goal => goal.id === parseInt(this.goalId))
    },
    goalTasks() {
      return this.tasks.filter(task => task.goal === parseInt(this.goalId))
    }
  },
  methods: {
    editGoal() {
      return this.editingGoal = true
    },
    finishEditingGoal () {
      return this.editingGoal = false
    },
    saveEditedGoal (eventData) {
      const editedGoal = {
        ...eventData.editedGoal,
        updated: new Date(Date.now()).toISOString()
      }
      this.goals[
        this.goals.indexOf(
          this.goals.find(goal => goal.id === editedGoal.id)
        )
      ] = editedGoal
    },
    addTask (eventData) {
      const newTask = {
        ...eventData.newTask,
        completed: false,
        id: this.tasks[this.tasks.length - 1].id + 1,
        goal: parseInt(this.goalId),
        user: this.goal.user,
        updated: new Date(Date.now()).toISOString(),
        timestamp: new Date(Date.now()).toISOString()
      }
      this.tasks.push(newTask)
    },
    saveEditedTask (eventData) {
      const editedTask = {
        ...eventData.editedTask,
        updated: new Date(Date.now()).toISOString()
      }
      this.tasks[
        this.tasks.indexOf(
          this.tasks.find(task => task.id === editedTask.id)
        )
      ] = editedTask
    },
    toggleGoalCompletion () {
      this.goal.completed = !this.goal.completed
    },
    updateTaskCompletion (eventData) {
      const updatedTask = {
        ...eventData.updatedTask
      }
      this.tasks[
        this.tasks.indexOf(
          this.tasks.find(task => task.id === updatedTask.id)
        )
      ] = updatedTask
    }
  }
}
</script>
