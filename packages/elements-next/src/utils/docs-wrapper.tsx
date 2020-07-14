import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Highlight, { defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import { copyClipboardWrapper } from './__styles__/copy-clipboard'
import { BsClipboard } from 'react-icons/bs'
import CopyToClipboard from 'react-copy-to-clipboard'
import { elPA } from '@/styles/padding'
import { cx } from 'linaria'
import { elBT } from '@/styles/borders'

interface DocsWrapperProps {
  children: React.ReactElement
}

export const handleClipboardCopy = (setIsCopied: (isCopied: boolean) => void) => () => {
  setIsCopied(true)
  setTimeout(() => setIsCopied(false), 2000)
}
// Highlight component from https://mdxjs.com/guides/syntax-highlighting
// Allows us to output the rendered HTML and see changes from the editable playground component
export const DocsWrapper: React.FC<DocsWrapperProps> = ({ children }) => {
  const [isCopied, setIsCopied] = React.useState(false)
  const markup = renderToStaticMarkup(children)
  return (
    <>
      {children}
      <div className={cx(copyClipboardWrapper, elPA, elBT)}>
        <CopyToClipboard text={markup} onCopy={handleClipboardCopy(setIsCopied)}>
          <BsClipboard />
        </CopyToClipboard>
        <Highlight {...defaultProps} code={markup} theme={github} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style }}>
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
        {isCopied && <p>Copied!</p>}
      </div>
    </>
  )
}
