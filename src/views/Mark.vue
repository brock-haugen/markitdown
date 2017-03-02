<template>
  <div id='mark'>
    <div class='split'>
      <Editor :content='mark.content' @save='save' />
    </div>
    <div class='split'>
      <Preview :content='mark.content' />
    </div>
  </div>
</template>

<script>
import Editor from 'components/Editor'
import Preview from 'components/Preview'

export default {
  name: 'Mark',
  components: { Editor, Preview },
  data () {
    return {
      mark: {}
    }
  },
  watch: {
    $route () {
      this.bindMark()
    }
  },
  methods: {
    bindMark () {
      this.$bindAsObject('mark', this.$db.ref('marks/' + this.authUser.userId + '/' + this.$route.params.id))
    },
    save (text) {
      this.$firebaseRefs.mark.set({
        content: text,
        updated: (new Date()).getTime()
      })
    }
  },
  mounted () {
    this.bindMark()
  }
}
</script>

<style lang='scss' scoped>
#mark {
  height: calc(92vh - 6em);
  margin: 0 -4%;
  position: relative;

  .split {
    bottom: -30px;
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
    border-left: solid 1px cadetblue;
    left: calc(50% + 1px);
    padding-left: calc(4% - 30px);
    right: calc(4% - 30px);
  }
}
</style>
