export const clipboardCopy = (content: string): boolean => {
  try {
    // Use the Async Clipboard API when available.
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content)
      return true
    }

    // Otherwise, use document.execCommand() fallback
    const span = document.createElement('span')
    span.textContent = content
    span.style.whiteSpace = 'pre'
    document.body.appendChild(span)

    // Make a selection object representing the range of text selected by the user
    const selection = window.getSelection()
    const range = window.document.createRange()

    if (selection) {
      selection.removeAllRanges()
      range.selectNode(span)
      selection.addRange(range)
      window.document.execCommand('copy')
      selection.removeAllRanges()
      window.document.body.removeChild(span)
      return true
    }
  } catch (err) {
    console.error('Clipboard copy error', err.message)
    return false
  }

  return false
}
