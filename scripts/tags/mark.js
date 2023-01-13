'use strict'

hexo.extend.tag.register('mark', function(args) {
  args = hexo.args.map(args, ['color', 'style'], ['text'])
  return `<span class="tag-mark ${hexo.args.joinClasslist(args.color, args.style)}">${args.text}</span>`
})