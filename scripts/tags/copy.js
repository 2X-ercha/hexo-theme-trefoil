'use strict'

const { trim } = require('./utils');

hexo.extend.tag.register('copy', function(args) {
  args = hexo.args.map(args, [], ['text'])
  const html = []
  html.push(trim`
  <div class="tag-copy">
    <input readonly class="copy-area" value="${args.text}">
    <button class="copy-btn click-limit">
      <i class="ri-file-copy-fill"></i>
    </button>
  </div>`)
  console.log(html.join(''))
  return html.join('')
})