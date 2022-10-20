const fs = require('fs/promises')
const pug = require('pug')

const BIG_PNG_SUFFIX = '-8x.png'
function getName (name) {
  return 'oi oi-' + name.replace(BIG_PNG_SUFFIX, '')
}
function getPath (name) {
  return 'png/' + name
}
function bigPngFilter (f) {
  return f.includes(BIG_PNG_SUFFIX)
}
function bigPngMapper (name) {
  return {
    name: getName(name),
    path: getPath(name)
  }
}

async function getFileList (ctx) {
  return fs.readdir(ctx.path)
    .then(async list => list.filter(ctx.filter))
    .then(async filtered => filtered.map(ctx.mapper))
}

async function renderPage (templatePath, images) {
  const compiledFunction = pug.compileFile(templatePath)
  return compiledFunction({ images })
}

async function main () {
  // using "png" folder's "-8x.png" images as source
  const bigPngConfig = {
    path: './png',
    filter: bigPngFilter,
    mapper: bigPngMapper
  }
  return getFileList(bigPngConfig)
    .then(async images => renderPage('template.pug', images))
}

main()
  .then(console.log)
  .catch(console.error)
