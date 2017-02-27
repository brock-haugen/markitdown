<template>
  <div id='list'>
    All the marks:
    <br>
    <el-button type='text' @click='create()'>Create New Mark</el-button>
    <div v-for='mark in marks'>
      <router-link :to='{name: "Mark", params: {id: mark[".key"]}}'>{{ title(mark) }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  firebase () {
    return {
      marks: this.$db.ref('marks/' + this.authUser.userId)
    }
  },
  methods: {
    create () {
      const key = this.$firebaseRefs.marks.push({ content: '# New Mark' }).key
      this.$router.push({name: 'Mark', params: {id: key}})
    },
    title (mark) {
      const firstLine = ((mark.content || '').split('\n')[0] || '').replace(/#/g, '').trim()
      if (firstLine.length < 1) return 'blank mark'
      else return firstLine
    }
  }
}
</script>

<style scoped>
</style>
