'use strict';

const cheerio = require('cheerio')

hexo.extend.filter.register('after_post_render', function (data) {
  const config = this.theme.config
  if (config.code.height_limit_enable) {
    if (!data.permalink.match(/.*(?:\.html|\/)$/)) {
      return;
    }

    let $ = cheerio.load(data.content)
    $('p img').wrap('<span></span>')
    data.content = $.html();
  }
});