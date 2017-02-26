<template>
  <div class='preview'>
    <div v-html='markedHTML'></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Preview',
  props: [ 'mark' ],
  computed: {
    markedHTML () {
      return marked(this.mark.content || '')
    }
  }
}
</script>

<style scoped>
</style>
