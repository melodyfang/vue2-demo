<template>
  <div id="app">
    <TreeDemo msg="Welcome to Your Vue.js App"/>
    <!-- <a-button type="primary">Button></a-button> -->
  </div>
</template>

<script>
import TreeDemo from './components/TreeDemo.vue'

export default {
  name: 'App',
  components: {
    TreeDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.ant-tree li ul {
  padding-left: 40px;
}
</style>