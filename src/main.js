async function getFileList () {
  const fs = require('fs/promises')
  return fs.readdir('./png')
    .then(async list => {
      return list
        .filter(f => {
          return f.includes('-8x.png')
        })
    })
}

async function drawPage (images) {
  const pug = require('pug')
  const compiledFunction = pug.compileFile('template.pug')
  return compiledFunction({
    images
  })
}

async function main () {
  return getFileList('*-8px.png')
    .then(async images => drawPage(images))
}

main()
  .then(console.log)
  .catch(console.error)
