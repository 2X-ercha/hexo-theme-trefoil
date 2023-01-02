'use strict'

const { trim } = require('./utils');

hexo.extend.helper.register('__series_toc', function (page) {
  const series_dist = hexo.locals.get('series_dist')
  const toc_str = []
  if (typeof(page.series_name) === 'string' && page.series_name.length !== 0 && !isNaN(page.series_index)) {
    // index === 0: series home toc
    // index !== 0: series page toc, include self toc
    const series = series_dist[page.series_name]
    toc_str.push('<div class="doc-toc-tree">')
    for (const it of Object.values(series.pages)) {
      if (page.series_index == it.series_index) {
        toc_str.push(
          trim`
            <div class="doc-toc-tree-block active">
              <a class="doc-toc-tree-h1" href=${this.url_for(it.path)}>
                <span class="toc-text">${it.subtitle?it.subtitle:it.title}</span>
              </a>
              ${this.toc(page.content)}
            </div>
          `
        )
      } else {
        toc_str.push(
          trim`
            <div class="doc-toc-tree-block">
              <a class="doc-toc-tree-h1" href=${this.url_for(it.path)}>
                <span class="toc-text">${it.subtitle?it.subtitle:it.title}</span>
              </a>
            </div>
          `
        )
      }
    }
    toc_str.push('</div>')
  }
  return toc_str.join('')
})
