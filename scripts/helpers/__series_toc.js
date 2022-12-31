'use strict'

hexo.extend.helper.register('__series_toc', function (page) {
    const series_dist = hexo.locals.get('series_dist')
    var toc_str = ''
    if (typeof(page.series_name) === 'string' && page.series_index !== 0 && !isNaN(page.series_index)) {
      const series = series_dist[page.series_name]
      toc_str += '<div class="doc-toc-tree">'
      for (const it of Object.values(series.pages)) {
        if (page.series_index == it.series_index) {
          toc_str += '<div class="doc-toc-tree-block active">'
            toc_str += '<a class="doc-toc-tree-h1" href='+this.url_for(it.path)+'>'
              toc_str += '<span class="toc-text">'+it.subtitle+'</span></a>'
            toc_str += this.toc(page.content)
          toc_str += '</div>'
        } else {
          toc_str += '<div class="doc-toc-tree-block">'
            toc_str += '<a class="doc-toc-tree-h1" href='+this.url_for(it.path)+'>'
              toc_str += '<span class="toc-text">'+it.subtitle+'</span></a></div>'
        }
      }
      toc_str += '</div>'
    }
    return toc_str
  })