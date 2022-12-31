'use strict'

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  hexo.log.info(` Welcome to trefoil! ${version} `)
})

hexo.on('generateBefore', () => {
  require('./lib/series-dist-gen')(hexo)
})

// debug
/*
hexo.on('generateAfter', () => {
  const series_dist = hexo.locals.get('series_dist')
  // console.log(series_dist)
  for (const item of Object.values(series_dist)) {
    console.log(item.pages)
  }
})
*/