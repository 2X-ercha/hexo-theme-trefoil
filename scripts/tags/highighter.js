'use strict'

hexo.extend.tag.register('highlighter', function(args) {
    args = hexo.args.map(args, ['color', 'url'], ['text'])
    if (args.url) return `<a href='${args.url}' class='tag-highlighter ${args.color}'>${args.text}</a>`
    else return `<span class='tag-highlighter ${args.color}'>${args.text}</span>`
})