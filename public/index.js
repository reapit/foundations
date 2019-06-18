const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const port = 8080

http
  .createServer((request, response) => {
    try {
      const requestUrl = url.parse(request.url)
      const fsPath = `${__dirname}/dist${path.normalize(requestUrl.pathname)}` // need to use path.normalize so people can't access directories underneath baseDirectory
      const fileStream = (/\.(js|css|woff|gif|jpg|jpeg|tiff|png)$/i).test(fsPath)
        ? fs.createReadStream(fsPath)
        : fs.createReadStream( `${__dirname}/dist/index.html`)

      fileStream.pipe(response)
      fileStream.on('open', () => {
        response.writeHead(200)
      })
      fileStream.on('error', e => {
        response.writeHead(404) // assume the file doesn't exist
        response.end()
      })
    } catch (e) {
      response.writeHead(500)
      response.end() // end the response so browsers don't hang
      console.log(e.stack)
    }
  })
  .listen(port)

process.title = process.argv[2]
console.log(`Listening on port ${port}, app name ${process.title}`)
