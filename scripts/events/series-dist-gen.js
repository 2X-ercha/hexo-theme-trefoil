// 生成series-dist，结构如下：
/*
var series_dist = {
    series_name1: {
        'home': series_homepage,
        'pages': [
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

hexo.on('generateBefore', () => {
    const posts = hexo.locals.get('posts')
    // hexo.log.info(`${__post.title} ${__post.subtitle} ${__post['series-name']} ${__post['series-index']}`)
    const series_dist = {}
    // 构建
    posts.each((it) => {
        if (it['series-index'] === 0){
            series_dist[it['series-name']] = {
                home: it,
                pages: []
            }
        }
    })
    posts.each((it) => {
        if (it['series-index'] !== 0 && !isNaN(it['series-index'])) {
            series_dist[it['series-name']].pages.push(it)
        }
    })
    for (const item of Object.values(series_dist)) {
        item.pages.sort((a, b) => {
            const cmp = a['series-index'] - b['series-index']
            if (cmp === 0) {
                hexo.log.error('Todo: error message!')
                process.exit(-1)
            }
            return cmp
        })
        // console.log(item.pages)
    }
    // console.log(series_dist)
})