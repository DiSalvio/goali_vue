<template>
  <div class="list-group-item-heading">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <del id="sub-task-name-completed" class="mb-1 mr-auto p-2">
        <router-link
          :to="{name: 'PageSubTaskShow',
          params: {goalId: subTask.goal, taskId: subTask.task, subTaskId: subTask.id}}"
          class="text-muted"
        >
          {{subTask.name}}
        </router-link>
      </del>
      <div class="flex-column text-right">
        <div>
          <button id="edit-sub-task-completed" @click="editSubTask(subTask.id)" class="badge badge-pill">
            <font-awesome-icon icon="user-pen"/>
          </button>
          <button @click="removeSubTask(subTask)" id="remove-sub-task-completed" class="badge badge-pill text-danger">
            <font-awesome-icon icon="trash"/>
          </button>
        </div>
        <div>
          <button
            id="toggle-sub-task-completion-done"
            class="badge badge-secondary badge-pill"
            @click="toggleSubTaskCompletion(subTask)"
          >
            Done
          </button>
        </div>
        <AppDate :timestamp="subTask.updated" class="badge badge-light badge-pill pull-right"/>
      </div>
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
