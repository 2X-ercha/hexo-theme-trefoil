'use strict';

const crypto = require('crypto')
const front = require('hexo-front-matter');
const fs = require('hexo-fs')

function hash(...args) {
  const sign = args.map(
    it => Buffer.from((it || '').toString()).toString('base64')
  ).join('.')

  return crypto.createHash('md5')
    .update(sign)
    .digest('hex')
    .substring(0, 10)
}

hexo.extend.filter.register('before_post_render', function (data) {
  if (data.abbrlink || data.layout !== 'post') return

  const config = this.config.abbrlink || {};
  if (!config.enable) return

  const mirror = front.parse(data.raw);

  const abbrlink = hash(data.title, data.subtitle, data.series_name, data.series_index);
  mirror.abbrlink = abbrlink;
  data.abbrlink = abbrlink;

  fs.writeFileSync(data.full_source, '---\n' + front.stringify(mirror), 'utf-8')

  hexo.log.info('TODO: Log message');
}, 15);