<template>
  <div>
    <h1>Home Page</h1>
    <button @click="goToTaskList">Go to Task List</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToTaskList() {
      this.$router.push('/tasks');
    },
  },
};
</script>
