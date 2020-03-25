const readline = require('readline')
const fs = require('fs')
const { Readable } = require('stream')
const fsPromises = fs.promises

/**
 * Temporary create two file with content separated by <line>
 *
 * @param {{path: string, line: number}} object
 * @return {Promise<{headFilePath: string, tailFilePath: string}>}
 */
const createHeadAndTailTempFiles = ({ path, line }) =>
  new Promise((resolve, reject) => {
    try {
      const origFileReadStream = fs.createReadStream(path)
      const rl = readline.createInterface({
        input: origFileReadStream,
        crlfDelay: Infinity,
      })
      // Temporary store the content above <line>
      const headFilePath = `${path}-head`
      const headFileWriteStream = fs.createWriteStream(headFilePath)
      // Temporary store the content below <line>
      const tailFilePath = `${path}-tail`
      const tailFileWriteStream = fs.createWriteStream(tailFilePath)
      let lineCount = 1
      rl.on('line', lineData => {
        if (lineCount < line) {
          headFileWriteStream.write(`${lineData}\r\n`)
        } else {
          tailFileWriteStream.write(`${lineData}\r\n`)
        }
        lineCount++
      })
      rl.on('close', () => {
        origFileReadStream.destroy()
        headFileWriteStream.destroy()
        tailFileWriteStream.destroy()
        console.log(`Wrote temporary head content to: ${headFilePath}`)
        console.log(`Wrote temporary tail content to: ${tailFilePath}`)
        resolve({
          headFilePath,
          tailFilePath,
        })
      })
    } catch (err) {
      reject(err)
    }
  })

/**
 * Insert <content> into file at <line> number, and remove temporary files
 * This mechanism is able to handle big file
 *
 * @param {{path: string, line: number, content: string}} inputObj
 * @return {Promise<string>} path of file with new content
 */
const insertAtLine = async ({ path, line, content }) => {
  const { headFilePath, tailFilePath } = await createHeadAndTailTempFiles({ path, line })
  const [headStream, tailStream] = [fs.createReadStream(headFilePath), fs.createReadStream(tailFilePath)]
  const contentStream = new Readable()
  contentStream.push(`${content}\r\n`)
  // end the Readable stream
  contentStream.push(null)
  // piping in order, overwrite old original file
  const newFileWriteStream = fs.createWriteStream(path)

  headStream.pipe(newFileWriteStream, { end: false })

  headStream.on('end', () => {
    contentStream.pipe(newFileWriteStream, { end: false })
  })

  contentStream.on('end', () => {
    tailStream.pipe(newFileWriteStream, { end: true })
  })

  const newFileWriteStreamHandler = () =>
    new Promise(resolve => {
      newFileWriteStream.on('finish', async () => {
        ;[headStream, contentStream, tailStream, newFileWriteStream].forEach(stream => stream.destroy())
        // remove temp files
        await Promise.all([fsPromises.unlink(headFilePath), fsPromises.unlink(tailFilePath)])
        resolve('Success')
      })
    })
  await newFileWriteStreamHandler()
  return path
}

module.exports = insertAtLine
