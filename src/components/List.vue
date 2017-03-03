<template>
  <div id='list' :class='{isOpen}'>
    <span id='list-toggle' @click='isOpen = !isOpen'>
      <i class='el-icon-menu'></i>
    </span>
    <div id='list-panel'>
      <router-link v-for='mark in marks' :to='{name: "Composer", params: {id: mark[".key"]}}'>
        <span v-html='title(mark)'></span>
        <i @click.prevent.stop='$emit("destroy", mark)' class='delete-link el-icon-delete'></i>
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
      overflow: hidden;
      margin: 0 -20px;
      padding: 0 20px;
      position: relative;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        background-color: #fcb;
      }
      &.router-link-active {
        background-color: rgba(cadetblue, 0.2);
      }
      &:not(:last-of-type) {
        border-bottom: none;
      }

      span * {
        margin-bottom: 0;
        margin-top: 0;
      }

      .delete-link {
        position: absolute;
        right: 20px;
        top: 10px;
      }
      &:not(:hover) .delete-link {
        display: none;
      }
    }
  }
}
</style>
