import * as React from 'react'
import pell from 'pell'

export interface EditorProps {
  onChange?: (html: string) => void
  hasError?: boolean
  defaultContent?: string
  placeholder?: string
  containerClass?: string
  actionbarClass?: string
  buttonClass?: string
  contentClass?: string
  actions?: Array<string>
}

const defaultActions = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'heading1',
  'heading2',
  'paragraph',
  'quote',
  'olist',
  'ulist',
  'code',
  'line',
  'link'
]

export const Editor = ({
  onChange,
  hasError,
  actions = defaultActions,
  containerClass = '',
  defaultContent,
  placeholder,
  actionbarClass = 'pell-actionbar',
  buttonClass = 'pell-button',
  contentClass = 'pell-content'
}: EditorProps) => {
  const containerEl = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    pell.init({
      element: containerEl.current,
      onChange: (html: string) => onChange && onChange(html),
      styleWithCSS: false,
      actions,
      classes: {
        actionbar: actionbarClass,
        button: buttonClass,
        content: contentClass
      }
    })
    if (containerEl && containerEl.current) {
      const content = containerEl.current.getElementsByClassName(contentClass)[0]
      if (defaultContent) {
        content.innerHTML = defaultContent
      }
      if (placeholder) {
        content.setAttribute('placeholder', placeholder)
      }
    }
  }, [])

  return <div ref={containerEl} className={`pell ${hasError && 'pell--is-danger'} ${containerClass}`} />
}
