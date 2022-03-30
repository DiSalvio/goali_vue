<template>
  <div class="list-group-item-heading">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <h5 class="mb-1 mr-auto p-2">
        <router-link
          :to="{name: 'PageSubTaskShow',
          params: {goalId: subTask.goal, taskId: subTask.task, subTaskId: subTask.id}}"
        >
          {{subTask.name}}
        </router-link>
      </h5>
      <div class="flex-column text-right">
        <div>
          <button @click="editSubTask(subTask.id)" class="badge badge-pill">
            <font-awesome-icon icon="user-pen"/>
          </button>
          <button class="badge badge-pill text-danger">
            <font-awesome-icon @click="removeSubTask(subTask)" icon="trash"/>
          </button>
        </div>
        <button
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
</template>

<script>
export default {
  props: {
    subTask: {
      required: true,
      type: Object
    }
  },
  emits: [ "editSubTask", "removeSubTask", "toggleSubTaskCompletion" ],
  methods: {
    editSubTask (subTaskId) {
      this.$emit("editSubTask", { subTaskId })
    },
    removeSubTask (subTask) {
      this.$emit("removeSubTask", { subTask })
    },
    toggleSubTaskCompletion (subTask) {
      this.$emit("toggleSubTaskCompletion", { subTask })
    }
  }
}
</script>
