// 生成series-dist，结构如下：
/*
var series_dist = {
    series_name1: {
        home: series_homepage,
        pages: [
            series_page1,
            series_page2,
            // ...
        ]
    },
    series_name2: {
        // ...
    }
}
*/

'use strict'

module.exports = hexo => {
    const series_dist = {}
    const posts = hexo.locals.get('posts')
    posts.each((it) => {
        if (it.series_index === 0){
            series_dist[it.series_name] = {
                home: it,
                pages: []
            }
        }
    })
    posts.each((it) => {
        if (it.series_index !== 0 && !isNaN(it.series_index)) {
            series_dist[it.series_name].pages.push(it)
        }
    })
    for (const item of Object.values(series_dist)) {
        item.pages.sort((a, b) => {
            const cmp = a.series_index - b.series_index
            if (cmp === 0) {
                hexo.log.error('There have the same series_index: ')
                hexo.log.error(`> [series_name: ${a.series_name}][series_index: ${a.series_index}]`)
                hexo.log.error(`  - [title: ${a.title} ${a.subtitle}][source: ${a.source}]`)
                hexo.log.error(`  - [title: ${b.title} ${b.subtitle}][source: ${b.source}]`)
                hexo.log.info("You must modify the 'front-matter' of the corresponding file and perform the 'hexo clean' operation one time. ")
                process.exit(-1)
            }
            return cmp
        })
    }
    hexo.locals.set('series_dist', () => series_dist)
}