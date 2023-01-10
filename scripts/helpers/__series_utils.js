'use strict'

const { trim } = require('./utils');

hexo.extend.helper.register('__series_toc', function (page) {
  const series_dist = hexo.locals.get('series_dist')
  const toc_str = []
  if (typeof(page.series_name) === 'string' && !isNaN(page.series_index)) {
    // index === 0: series home toc
    // index !== 0: series page toc, include self toc
    const series = series_dist[page.series_name]
    toc_str.push('<div class="doc-toc-tree">')
    for (const it of Object.values(series.pages)) {
      if (page.series_index === it.series_index) {
        toc_str.push(
          trim`
            <div class="doc-toc-tree-block active">
              <a class="doc-toc-tree-h1" href=${this.url_for(it.path)}>
                <span class="toc-text">${it.subtitle?it.subtitle:it.title}</span>
              </a>
              ${this.toc(page.content, {list_number: false, min_depth: 2})}
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

hexo.extend.helper.register('__series_get_home_url', function(page) {
	const series_dist = hexo.locals.get('series_dist')
	if (typeof(page.series_name) === 'string' && !isNaN(page.series_index)) {
		return series_dist[page.series_name].home.path
	}
	return null
})

hexo.extend.helper.register('__series_get_page_prev', function(page) {
  const series_dist = hexo.locals.get('series_dist')
  if (typeof(page.series_name) === 'string' && !isNaN(page.series_index) && page.series_index !== 0) {
		const series_pages = series_dist[page.series_name].pages
    for (const index in series_pages) {
      const series_pages = series_dist[page.series_name].pages
      for (const [ index, it ] of series_pages.entries()) {
        if (it.series_index !== page.series_index) continue
        return series_pages[index - 1] || null
      }
    }
	}
	return null
})

hexo.extend.helper.register('__series_get_page_next', function(page) {
  const series_dist = hexo.locals.get('series_dist')
  if (typeof(page.series_name) === 'string' && !isNaN(page.series_index) && page.series_index !== 0) {
		const series_pages = series_dist[page.series_name].pages
    for (const [ index, it ] of series_pages.entries()) {
      if (it.series_index !== page.series_index) continue
      return series_pages[index + 1] || null
    }
	}
	return null
})