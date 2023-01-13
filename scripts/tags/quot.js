'use strict'

hexo.extend.tag.register('quot', function(args) {
  args = hexo.args.map(args, ['author', 'style'], ['text'])
  const html = []
  html.push('<div class="tag-quot">')
  html.push(args.style ? `<p class="content" style="${args.style}">${args.text}</p>` : `<p class="content">${args.text}</p>`)
  if (args.author) html.push(`<p class="author">—— ${args.author}</p>`)
  html.push('</div>')
  return html.join('')
})