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
    var series_dist = new Object
    var series_dist_item
    // 构建
    posts.each((__post, index)  => {
        if (__post['series-index'] == 0){
            var __series = new Object()
            __series.home = __post
            __series.pages = new Array()
            series_dist[__post['series-name']] = __series;
        }
    })
    posts.each((__post, index) => {
        if (__post['series-index'] != 0 && !isNaN(__post['series-index'])) {
            series_dist[__post['series-name']].pages.push(__post)
        }
    })
    for (series_dist_item in series_dist) {
        series_dist[series_dist_item].pages.sort((a,b)=> a['series-index']-b['series-index'])
        // console.log(series_dist[series_dist_item].pages)
    }
    // console.log(series_dist)
})