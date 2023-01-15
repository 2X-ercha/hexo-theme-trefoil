'use strict'

hexo.extend.tag.register('note', function(args, content) {
  args = hexo.args.map(args, ['color', 'icon'])
  const html = []
  html.push(`<div class="tag-note ${args.color}">`)
  if (args.icon) html.push(`<div class="icon"><i class="${args.icon}"></i></div>`)
  html.push(`<div class="content">${hexo.render.renderSync({text:content, engine:'md'})}</div></div>`)
  return html.join('')
}, {ends: true})