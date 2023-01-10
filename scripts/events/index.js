'use strict'

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  hexo.log.info(`
  ████████╗██████╗ ███████╗███████╗ ██████╗ ██╗██╗
  ╚══██╔══╝██╔══██╗██╔════╝██╔════╝██╔═══██╗██║██║
     ██║   ██████╔╝█████╗  █████╗  ██║   ██║██║██║
     ██║   ██╔══██╗██╔══╝  ██╔══╝  ██║   ██║██║██║
     ██║   ██║  ██║███████╗██║     ╚██████╔╝██║███████╗
     ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚═╝╚══════╝
                  Welcome to trefoil!
                    version: ${version}`)
})

hexo.on('generateBefore', () => {
  require('./lib/series-dist-gen')(hexo)
})