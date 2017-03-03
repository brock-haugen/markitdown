<template>
  <div id='app'>
    <span v-if='isCheckingAuth'>Loading...</span>
    <router-view v-else></router-view>
    <Navigation />
  </div>
</template>

<script>
import Navigation from 'components/Navigation'

export default {
  name: 'app',
  components: { Navigation }
}
</script>

<style lang='scss'>
@import '/static/font-awesome/css/font-awesome.css';

html, body {
  color: #2C3E50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  margin: 4%;
  margin-top: calc(4% + 4em);
  position: relative;
  width: 92%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
