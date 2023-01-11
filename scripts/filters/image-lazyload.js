const cheerio = require("cheerio");

function process(content) {
  const onLoading = hexo.theme.config.lazyload.onLoading
  let $ = cheerio.load(content)
  $('img').each((...[, image]) => {
    image = $(image)
    if (image.attr('data-srcset')) return
    if (image.attr('src')?.startsWith('data:image')) return
    if (image.attr('no-lazy') !== undefined) return
    image.attr('srcset', onLoading)
      .attr('data-srcset', image.attr('src'))
      .addClass('lazy-load')
  })
  return $.html();
}

hexo.extend.filter.register('after_post_render', (data) => {
  const config = hexo.theme.config.lazyload
  if (!config || !config.enable) return
  if (!config.onlypost) return
  if (!data.permalink.match(/.*(?:\.html|\/)$/)) return
  data.content = process(data.content)
})

hexo.extend.filter.register('after_render:html', (content) => {
  const config = hexo.theme.config.lazyload
  if (!config || !config.enable) return
  if (config.onlypost) return
  return process(content)
})
