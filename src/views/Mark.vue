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
  bottom: 4%;
  left: 4%;
  position: absolute;
  right: 4%;
  top: calc(4em + 4%);
}
.split {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 50%;
  top: 0;
  vertical-align: top;
}
.split:last-child {
  border-left: solid 1px #EFEFEF;
  left: calc(50% + 1px);
  right: 0;
}
</style>
