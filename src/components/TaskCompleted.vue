<template>
  <div class="list-group-item-heading">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <del class="mb-1 mr-auto p-2">
        <router-link
          :to="{name: 'PageTaskShow', params: {goalId: task.goal, taskId: task.id}}"
          class="text-muted"
        >
          {{task.name}}
        </router-link>
      </del>
      <div class="flex-column text-right">
        <div>
          <button @click="editTask(task.id)" class="badge badge-pill">
            <font-awesome-icon icon="user-pen"/>
          </button>
          <button @click="removeTask(task)" class="badge badge-pill text-danger">
            <font-awesome-icon icon="trash"/>
          </button>
        </div>
        <div>
          <button
            class="badge badge-secondary badge-pill"
            @click="toggleTaskCompletion(task)"
          >
            Done
          </button>
        </div>
        <AppDate :timestamp="task.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
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
