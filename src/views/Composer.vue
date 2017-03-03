<template>
  <div id='composer'>
    <List :marks='sortedMarks' @create='create()' @destroy='m => destroy(m)' />
    <div id='content' v-if='selectedMark'>
      <div class='split'>
        <Editor :content='selectedMark.content' @save='save' />
      </div>
      <div class='split'>
        <Preview :content='selectedMark.content' />
      </div>
    </div>
  </div>
</template>

<script>
import Editor from 'components/Editor'
import List from 'components/List'
import Preview from 'components/Preview'

export default {
  name: 'Composer',
  components: { Editor, List, Preview },
  firebase () {
    return {
      marks: {
        asArray: true,
        source: this.$db.ref('marks/' + this.authUser.userId)
      }
    }
  },
  computed: {
    selectedMark () {
      const mid = this.$route.params.id
      return this.marks.filter(m => m['.key'] === mid)[0]
    },
    sortedMarks () {
      return this.marks.sort((a, b) => b.updated - a.updated)
    }
  },
  watch: {
    $route () {
      this.setInitial()
    }
  },
  methods: {
    goto (key) {
      if (key) {
        this.$router.push({name: 'Composer', params: {id: key}})
      }
    },
    setInitial () {
      if (!this.$route.params.id && this.sortedMarks.length > 0) {
        this.goto(this.sortedMarks[0]['.key'])
      }
    },
    create () {
      const key = this.$firebaseRefs.marks.push({
        content: '# New Mark',
        updated: (new Date()).getTime()
      }).key
      this.goto(key)
    },
    destroy (mark) {
      const key = mark['.key']
      this.$firebaseRefs.marks.child(key).remove()
      if (this.$route.params.id === key) {
        if (this.sortedMarks.length > 0) {
          this.goto(this.sortedMarks[0]['.key'])
        } else {
          this.$router.push('/')
        }
      }
    },
    save (text) {
      if (!this.selectedMark) return
      this.$firebaseRefs.marks.update({
        [this.selectedMark['.key']]: {
          content: text,
          updated: (new Date()).getTime()
        }
      })
    }
  },
  mounted () {
    // using this until VueFire 1.3.2
    this.$firebaseRefs.marks.once('value', this.setInitial)
  }
}
</script>

<style lang='scss'>
#composer {
  #content {
    height: calc(92vh - 110px);
    margin: 0 -4%;
    position: relative;

    .split {
      bottom: -30px;
      overflow: auto;
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

    .editor {
      height: 99%;
    }
  }

  @media (min-width: 1280px) {
    #list { left: 0 !important; }
    #list-toggle { display: none; }
    #content {
      margin-left: 300px;
      width: calc(100% - 300px);
    }
  }
}
</style>
