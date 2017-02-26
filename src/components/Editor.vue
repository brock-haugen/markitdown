<template>
  <div class='editor'>
    <textarea :value='mark.content'></textarea>
    <el-button type='success' @click='save()'>Save</el-button>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  props: [ 'mark' ],
  methods: {
    save () {
      const text = this.$el.querySelectorAll('textarea')[0].value
      this.$emit('save', text)
    }
  }
}
</script>

<style scoped>
</style>
