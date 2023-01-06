const cheerio = require('cheerio')

hexo.extend.filter.register('after_post_render', function (data) {
  const config = this.theme.config
  if (config.code.height_limit_enable) {
    if (!data.permalink.match(/.*(?:\.html|\/)$/)) {
      return;
    }

    let $ = cheerio.load(data.content)
    $('figure.highlight table:not(figcaption + *)').before('<figcaption></figcaption>')
    $('figure.highlight figcaption').append('<i class="ri-file-copy-line click-limit"></i>')
    $('figure.highlight table').before('<div class="code-expand-btn"><i class="ri-arrow-down-s-fill"></i></div>')
    data.content = $.html();
  }
});
