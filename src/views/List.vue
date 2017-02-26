<template>
  <div id='list'>
    All the marks:
    <br>
    <el-button type='text' @click='create()'>Create New Mark</el-button>
    <div v-for='mark in marks'>
      <router-link :to='{name: "Mark", params: {id: mark[".key"]}}'>{{ mark.title || 'blank mark' }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  firebase () {
    return {
      marks: this.$db.ref('marks')
    }
  },
  methods: {
    create () {
      const key = this.$firebaseRefs.marks.push({title: 'New Mark - ' + new Date()}).key
      this.$router.push({name: 'Mark', params: {id: key}})
    }
  }
}
</script>

<style scoped>
</style>
