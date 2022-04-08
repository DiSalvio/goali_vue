<template>
  <div class="list-group-item">
    <div v-if="!editingGoal" class="list-group-item-heading">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h2 class="mb-1 mr-auto p-2" :class="{ 'text-muted': goal.completed }">{{goal.name}}</h2>
        <div class="flex-column text-right">
          <div>
            <button @click="editGoal()" class="badge badge-pill"> <font-awesome-icon icon="user-pen"/>
            </button>
            <button @click="removeGoal(goal)" class="badge badge-pill">
              <router-link class="text-danger" :to="{name: 'PageHome'}">
                <font-awesome-icon icon="trash"/>
              </router-link>
            </button>
          </div>
          <button
            v-if="goal.completed"
            class="badge badge-secondary badge-pill"
            @click="toggleGoalCompletion(goal)"
          >
            Done
          </button>
          <button
            v-else
            class="badge badge-warning badge-pill"
            @click="toggleGoalCompletion(goal)"
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
      <div v-if="activeGoalTasks.length != 0">
        <h3 class="text-muted">Tasks</h3>
        <TaskList
          :tasks="activeInProgressGoalTasks"
          @saveEditedTask="saveEditedTask"
        />
        <TaskList
          :tasks="activeCompletedGoalTasks"
          @saveEditedTask="saveEditedTask"
        />
      </div>
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
      return this.$store.getters.goal(this.goalId)
    },
    goalTasks () {
      return this.$store.getters.goalTasks(this.goalId)
    },
    activeGoalTasks () {
      return this.$store.getters.activeGoalTasks(this.goalTasks)
    },
    activeCompletedGoalTasks () {
      return this.$store.getters.activeCompletedGoalTasks(this.activeGoalTasks)
    },
    activeInProgressGoalTasks () {
      return this.$store.getters.activeInProgressGoalTasks(this.activeGoalTasks)
    }
  },
  methods: {
    editGoal() {
      return this.editingGoal = true
    },
    finishEditingGoal () {
      return this.editingGoal = false
    },
    saveEditedGoal ({ editedGoal }) {
      this.$store.dispatch('saveEditedGoal', {
        ...editedGoal
      })
    },
    toggleGoalCompletion (goal) {
      this.$store.dispatch('saveEditedGoal', {
        ...goal,
        completed: !this.goal.completed
      })
    },
    removeGoal (goal) {
      this.$store.dispatch('saveEditedGoal', {
        ...goal,
        removed: true
      })
    },
    addTask ({ newTask }) {
      this.$store.dispatch('createTask', {
        ...newTask,
        goal: parseInt(this.goalId),
        user: this.goal.user
      })
    },
    saveEditedTask ({ editedTask }) {
      this.$store.dispatch('saveEditedTask', {
        ...editedTask,
      })
    }
  }
}
</script>
