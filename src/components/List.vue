<template>
  <div id='list' :class='{isOpen}'>
    <span id='list-toggle' @click='isOpen = !isOpen'>
      <i class='el-icon-menu'></i>
    </span>
    <div id='list-panel'>
      <router-link v-for='mark in marks' :to='{name: "Composer", params: {id: mark[".key"]}}'>
        <span class='title' v-html='title(mark)'></span>
        <span class='links'>
          <i @click.prevent.stop='share(mark)' class='fa fa-share'></i>
          <i @click.prevent.stop='$emit("destroy", mark)' class='fa fa-trash-o'></i>
        </span>
      </router-link>
      <br>
      <el-button @click='$emit("create")'>+ New</el-button>
    </div>
  </div>
</template>

<script>
import MdMixin from 'mixins/markdown'

export default {
  name: 'List',
  mixins: [ MdMixin ],
  props: {
    marks: { default: () => [] }
  },
  data () {
    return {
      isOpen: false
    }
  },
  watch: {
    $route () {
      this.isOpen = false
    }
  },
  methods: {
    share (mark) {
      const url = '/' + this.authUser.userId + '/' + mark['.key']
      window.open(url, '_blank')
    },
    title (mark) {
      const firstLine = ((mark.content || '').split('\n')[0] || '').replace(/#/g, '').trim()
      if (firstLine.length < 1) return 'blank mark'
      else return this.renderMd(firstLine)
    }
  }
}
</script>

<style lang='scss'>
#list {
  background-color: white;
  border-right: solid 1px cadetblue;
  bottom: 0;
  left: -300px;
  padding: 20px;
  padding-top: 80px;
  position: fixed;
  top: 0;
  width: 260px;
  z-index: 1;

  #list-toggle {
    cursor: pointer;
    left: 20px;
    position: fixed;
    top: 80px;
    z-index: 1;
  }

  &.isOpen {
    left: 0;
    #list-toggle {
      background-color: rgba(0, 0, 0, 0.1);
      bottom: 0;
      left: 301px;
      right: 0;
      top: 0;
      z-index: 0;
    }
  }

  #list-panel {
    position: relative;
    z-index: 1;
    a {
      border: solid 1px #ccc;
      border-left: 0;
      border-right: 0;
      color: inherit;
      cursor: pointer;
      display: block;
      height: 40px;
      line-height: 40px;
      margin: 0 -20px;
      padding: 0 20px;
      position: relative;
      text-decoration: none;

      &:hover {
        background-color: #fcb;
      }
      &.router-link-active {
        background-color: rgba(cadetblue, 0.2);
      }
      &:not(:last-of-type) {
        border-bottom: none;
      }

      .title {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;

        * {
          margin-bottom: 0;
          margin-top: 0;
        }
      }
      &:hover .title { width: calc(100% - 50px); }

      .links {
        position: absolute;
        right: 10px;
        top: 0px;
        i {
          margin: 0 0.25em;
        }
      }
      &:not(:hover) .links {
        display: none;
      }
    }
  }
}
</style>
