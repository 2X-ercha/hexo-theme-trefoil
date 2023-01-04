const cheerio = require('cheerio')

hexo.extend.filter.register('after_post_render', function (data) {
  const config = this.theme.config
  if (config.code_height_limit) {
    if (!data.permalink.match(/.*(?:\.html|\/)$/)) {
      return;
    }

    let $ = cheerio.load(data.content)
    $('figure.highlight').each(() => {
      $('<div class="code-expand-btn">展开</div>').insertBefore('table:not(.code-expand-btn + *)')
    });

    data.content = $.html();
  }
});
