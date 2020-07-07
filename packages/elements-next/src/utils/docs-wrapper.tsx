import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Highlight, { defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import { clipboardCopy } from './copy-clipboard'

interface DocsWrapperProps {
  children: React.ReactElement
}

const handleClipboardCopy = (setIsCopied: (isCopied: boolean) => void, markup: string) => async () => {
  const copiedSuccess = await clipboardCopy(markup)

  if (copiedSuccess) {
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 2000)
  }
}

export const DocsWrapper: React.FC<DocsWrapperProps> = ({ children }) => {
  const markup = renderToStaticMarkup(children)
  const [isCopied, setIsCopied] = React.useState(false)
  return (
    <>
      {children}
      {/* https://mdxjs.com/guides/syntax-highlighting */}
      <Highlight {...defaultProps} code={markup} theme={github} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, padding: '20px' }}
            onClick={handleClipboardCopy(setIsCopied, markup)}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {isCopied && <p>Copied to clipboard!</p>}
    </>
  )
}
