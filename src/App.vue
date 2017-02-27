<template>
  <div id='app'>
    <!-- navigation -->
    <Navigation />
    <!-- router view (content) -->
    <div v-if='isAuthenticated && authUser'>
      <router-view></router-view>
    </div>
    <div v-else-if='isCheckingAuth'>
      Loading...
    </div>
    <div v-else>
      <h3 style='text-align: center;'>Welcome! Please <el-button type='text' @click='login()'><h3>login</h3></el-button></h3>
    </div>
  </div>
</template>

<script>
import Navigation from 'components/Navigation'

export default {
  name: 'app',
  components: { Navigation }
}
</script>

<style>
html, body {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

#app {
  height: calc(90% - 8em);
  padding: calc(4em + 4%) 4%;
  position: relative;
  width: 92%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
