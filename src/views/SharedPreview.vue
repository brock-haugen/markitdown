<template>
  <div id='shared-preview'>
    <Preview :content='mark.content' />
  </div>
</template>

<script>
import Preview from 'components/Preview'

export default {
  name: 'SharedPreview',
  components: { Preview },
  firebase () {
    const p = this.$route.params
    return {
      mark: {
        asObject: true,
        source: this.$db.ref('marks/' + p.userId + '/' + p.id)
      }
    }
  }
}
</script>

<style lang='scss'>
#shared-preview {
  margin: -30px;
  text-align: center;

  .preview {
    display: inline-block;
    text-align: left;
  }
}
</style>
