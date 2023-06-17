<template>
  <div>
    <h1>Task List</h1>
    <input v-model="newTask" placeholder="Enter a new task" />
    <button @click="addTask">Add Task</button>

    <ul>
      <li v-for="(task, index) in paginatedTasks" :key="index">
        <input type="checkbox" :checked="task.done" @change="toggleTaskCompletion(task)" />
        <span :class="{ 'task-done': task.done }">{{ task.name }}</span>
        <button @click="editTask(index)">Edit</button>
        <button @click="deleteTask(index)">Delete</button>
      </li>
    </ul>

    <div v-if="pages > 1">
      <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
      <button @click="changePage(1)" :disabled="currentPage === pages">Next</button>
    </div>

    <button @click="cleanUpTasks">Clean Up</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      currentPage: 1,
      tasksPerPage: 5,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    paginatedTasks() {
      const startIndex = (this.currentPage - 1) * this.tasksPerPage;
      const endIndex = startIndex + this.tasksPerPage;
      return this.tasks.slice(startIndex, endIndex);
    },
    pages() {
      return Math.ceil(this.tasks.length / this.tasksPerPage);
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.$store.commit('addTask', { name: this.newTask, done: false });
        this.newTask = '';
      }
    },
    deleteTask(index) {
      this.$store.commit('deleteTask', index);
    },
    editTask(index) {
      const updatedTask = prompt('Enter a new name for the task:', this.tasks[index].name);
      if (updatedTask && updatedTask.trim() !== '') {
        this.$store.commit('editTask', { taskIndex: index, updatedTask: { name: updatedTask, done: this.tasks[index].done } });
      }
    },
    markTaskDone(index) {
      this.$store.commit('markTaskDone', index);
    },
    cleanUpTasks() {
      this.$store.commit('cleanUpTasks');
    },
    changePage(page) {
      this.currentPage += page;
    },
    toggleTaskCompletion(task) {
      const taskIndex = this.tasks.findIndex((t) => t === task);
      this.$store.dispatch('markTaskDone', taskIndex);
    },
  },
};
</script>

<style>
.task-done {
  text-decoration: line-through;
}
</style>
