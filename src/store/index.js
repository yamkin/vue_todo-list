import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const TASKS_STORAGE_KEY = 'task-list-tasks';

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },
    deleteTask(state, taskIndex) {
      state.tasks.splice(taskIndex, 1);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },
    editTask(state, { taskIndex, updatedTask }) {
      Vue.set(state.tasks, taskIndex, updatedTask);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
    },
    cleanUpTasks(state) {
      state.tasks = [];
      localStorage.removeItem(TASKS_STORAGE_KEY);
    },
    loadTasks(state) {
      const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks) {
        state.tasks = JSON.parse(savedTasks);
      }
    },
  },
  actions: {
    initializeStore({ commit }) {
      commit('loadTasks');
    },
    markTaskDone({ commit, state }, taskIndex) {
      const updatedTask = { ...state.tasks[taskIndex], done: !state.tasks[taskIndex].done };
      commit('editTask', { taskIndex, updatedTask });
    },
  },
});
