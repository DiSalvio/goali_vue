<template>
  <div class="list-group-item-heading">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h4 id="task-name-in-progress" class="mb-1 mr-auto p-2">
        <router-link
          :to="{name: 'PageTaskShow', params: {goalId: task.goal, taskId: task.id}}"
        >
          {{task.name}}
        </router-link>
      </h4>
      <div class="flex-column text-right">
        <div>
          <button id="edit-task-in-progress" @click="editTask(task.id)" class="badge badge-pill">
            <font-awesome-icon icon="user-pen"/>
          </button>
          <button id="remove-task-in-progress" @click="removeTask(task)" class="badge badge-pill text-danger">
            <font-awesome-icon icon="trash"/>
          </button>
        </div>
        <button
          id="toggle-task-completion-in-progress"
          class="badge badge-warning badge-pill"
          @click="toggleTaskCompletion(task)"
        >
          In Progress
        </button>
      </div>
    </div>
    <div class="align-items-end d-flex w-100100 justify-content-between">
      <p id="task-description-in-progress" class="p-2 my-2 list-group-item-light list-group-item-secondary">
        {{task.description}}
      </p>
      <AppDate :timestamp="task.updated" class="badge badge-light badge-pill pull-right"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      required: true,
      type: Object
    }
  },
  emits: ["editTask", "removeTask", "toggleTaskCompletion"],
  methods: {
    editTask (taskId) {
      this.$emit("editTask", { taskId })
    },
    removeTask (task) {
      this.$emit("removeTask", { task })
    },
    toggleTaskCompletion (task) {
      this.$emit("toggleTaskCompletion", { task })
    }
  }
}
</script>
