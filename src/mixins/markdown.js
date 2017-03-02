import highlightjs from 'highlightjs'
import 'highlightjs/styles/github.css'
import MarkdownIt from 'markdown-it'
import markdownItCheckbox from 'markdown-it-checkbox'
import markdownItIcons from 'markdown-it-icons'

const md = MarkdownIt({
  highlight: code => highlightjs.highlightAuto(code).value
})
md.use(markdownItCheckbox)
md.use(markdownItIcons, 'font-awesome')

export default {
  methods: {
    renderMd (content) {
      return md.render(content || '')
    }
  }
}
