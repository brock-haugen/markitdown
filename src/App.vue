<template>
  <div id='app'>
    <List v-if='isAuthenticated' />
    <Navigation />

    <div id='content'>
      <span v-if='isCheckingAuth'>Loading...</span>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import List from 'components/List'
import Navigation from 'components/Navigation'

export default {
  name: 'app',
  components: { List, Navigation }
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

@media (min-width: 1280px) {
  #list { left: 0 !important; }
  #list-toggle { display: none; }
  #content {
    margin-left: 300px;
    width: calc(100% - 300px);
  }
}
</style>
