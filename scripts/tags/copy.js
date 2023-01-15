'use strict'

const { trim } = require('./utils');

hexo.extend.tag.register('copy', function(args) {
  args = hexo.args.map(args, [], ['text'])
  const html = trim`
  <div class="tag-copy">
    <input readonly class="copy-area" value="${args.text}">
    <button class="copy-btn click-limit">
      <i class="ri-file-copy-fill"></i>
    </button>
  </div>`
  return html
})