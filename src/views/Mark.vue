<template>
  <div id='mark'>
    <h2>{{ mark.title }}</h2>
    <Editor :mark='mark' @save='save' />
    <Preview :mark='mark' />
  </div>
</template>

<script>
import Editor from 'components/Editor'
import Preview from 'components/Preview'

export default {
  name: 'Mark',
  components: { Editor, Preview },
  firebase () {
    return {
      mark: {
        asObject: true,
        source: this.$db.ref('marks/' + this.$route.params.id)
      }
    }
  },
  methods: {
    save (text) {
      this.$firebaseRefs.mark.update({content: text})
    }
  }
}
</script>

<style scoped>
</style>
