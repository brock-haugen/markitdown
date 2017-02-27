<template>
  <div class='preview'>
    <div v-html='markedHTML'></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Preview',
  props: [ 'content' ],
  computed: {
    markedHTML () {
      return marked(this.content || '')
    }
  }
}
</script>

<style>
.preview {
  padding: 0 1em;
}
code {
  background-color: #EFEFEF;
}
</style>
