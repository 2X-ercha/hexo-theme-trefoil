'use strict'

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  hexo.log.info(` Welcome to trefoil! ${version} `)
})
