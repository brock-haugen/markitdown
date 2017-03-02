<template>
  <div id='navigation'>
    <router-link to='/' id='home-nav'>
      <div id='logo'></div>
      <h4>markitdown</h4>
    </router-link>
    <div id='auth-nav'>
      <el-dropdown v-if='isAuthenticated && authUser' trigger='click'>
        <span class='el-dropdown-link'>
          <img :src='authUser.picture'>&nbsp;
          <h4 v-text='authUser.nickname'></h4>
          <i class='el-icon-caret-bottom el-icon--right'></i>
        </span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item><span @click='logout()'>Logout</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-else @click='login()'>Login</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style>
#navigation {
  border-bottom: solid 1px #EFEFEF;
  left: 0;
  padding: 1em 4%;
  position: fixed;
  right: 0;
  top: 0;
}
#navigation #logo {
  background-image: url('../assets/logo.svg');
  background-position: center;
  background-size: 200%;
  display: inline-block;
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
#navigation h4 {
  cursor: pointer;
  display: inline-block;
  margin: 0;
}
#navigation #home-nav {
  color: inherit;
  text-decoration: none;
}
#navigation #auth-nav {
  cursor: pointer;
  float: right;
}
#navigation #auth-nav img {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
</style>
