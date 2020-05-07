import * as React from 'react'
// @ts-ignore: no available type definition
import { init } from 'pell'

export interface EditorProps {
  onChange?: (html: string) => void
  hasError?: boolean
  defaultContent?: string
  placeholder?: string
  containerClass?: string
  actionbarClass?: string
  buttonClass?: string
  contentClass?: string
  actions?: Array<string | object>
  dataTest?: string
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
  'link',
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
  contentClass = 'pell-content',
  dataTest = '',
}: EditorProps) => {
  const containerEl = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    init({
      element: containerEl.current,
      onChange: (html: string) => onChange && onChange(html),
      styleWithCSS: false,
      defaultParagraphSeparator: 'div',
      actions: actions,
      classes: {
        actionbar: actionbarClass,
        button: buttonClass,
        content: contentClass,
      },
    })
    if (containerEl && containerEl.current) {
      const content = containerEl.current.getElementsByClassName(contentClass)[0]
      if (placeholder) {
        content.setAttribute('placeholder', placeholder)
      }
    }
  }, [])

  React.useEffect(() => {
    if (containerEl && containerEl.current) {
      const content = containerEl.current.getElementsByClassName(contentClass)[0]
      if (defaultContent !== content.innerHTML) {
        content.innerHTML = defaultContent || ''
      }
    }
  }, [defaultContent])

  return (
    <div ref={containerEl} data-test={dataTest} className={`pell ${hasError && 'pell--is-danger'} ${containerClass}`} />
  )
}
