async function parseXhrBodyToJson(xhr) {
  try {
    const text = await xhr.response.body.text()
    const jsonBody = JSON.parse(text)
    return jsonBody
  } catch (err) {
    return xhr.response.body
  }
}

export default parseXhrBodyToJson
