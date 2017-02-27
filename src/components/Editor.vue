<template>
  <div class='editor'>
    <textarea :value='content' @input='save'></textarea>
  </div>
</template>

<script>
import _ from 'underscore'

export default {
  name: 'Editor',
  props: [ 'content' ],
  methods: {
    save: _.debounce(function (e) {
      const text = e.target.value
      this.$emit('save', text)
    }, 300)
  }
}
</script>

<style scoped>
.editor, textarea {
  border: none;
  font-family: 'Monaco', courier, monospace;
  height: 100%;
  outline: none;
  resize: none;
  width: 100%;
}
textarea {
  padding: 0 30px;
  height: calc(100% - 60px);
  width: calc(100% - 60px);
}
</style>
