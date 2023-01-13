'use strict'

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  console.log("\x1B[32m", `
  ████████╗██████╗ ███████╗███████╗ ██████╗ ██╗██╗
  ╚══██╔══╝██╔══██╗██╔════╝██╔════╝██╔═══██╗██║██║
     ██║   ██████╔╝█████╗  █████╗  ██║   ██║██║██║
     ██║   ██╔══██╗██╔══╝  ██╔══╝  ██║   ██║██║██║
     ██║   ██║  ██║███████╗██║     ╚██████╔╝██║███████╗
     ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚═╝╚══════╝
                  Welcome to trefoil!
                    version: ${version}
  `)
})

hexo.on('generateBefore', () => {
  require('./lib/series-dist-gen')(hexo)
  require('./lib/utils')(hexo)
})