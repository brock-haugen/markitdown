<template>
  <div id='mark'>
    <div class='split'>
      <Editor :content='mark[".value"]' @save='save' />
    </div>
    <div class='split'>
      <Preview :content='mark[".value"]' />
    </div>
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
      this.$firebaseRefs.mark.set(text)
    }
  }
}
</script>

<style scoped>
#mark {
  height: calc(92vh - 8em);
  margin: 0 -4%;
  position: relative;
}
.split {
  bottom: 0;
  position: absolute;
  top: -30px;
  vertical-align: top;
}
.split:first-child {
  left: calc(4% - 30px);
  padding-right: calc(4% - 30px);
  right: 50%;
}
.split:last-child {
  border-left: solid 1px #EFEFEF;
  left: calc(50% + 1px);
  padding-left: calc(4% - 30px);
  right: calc(4% - 30px);
}
</style>
