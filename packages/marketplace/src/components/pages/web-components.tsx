import * as React from 'react'

import { FlexContainerResponsive, Content, H3, H4, FlexContainerBasic } from '@reapit/elements'
// import { Link } from 'react-router-dom'
// import Routes from '../../constants/routes'
import apiDocStyles from '@/styles/pages/api-docs.scss?mod'

export const handleOnClickSearchWidget = ({ setCopiedClipboardWidget }) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()

  const el = document.createElement('textarea')
  const href = (e.target as HTMLAnchorElement).id
  el.value = href
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  setCopiedClipboardWidget('copied to clipboard!')
}

export const handleCopiedClipboardTheme = ({ setCopiedClipboardTheme }) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()

  const el = document.createElement('textarea')
  const href = (e.target as HTMLAnchorElement).id
  el.value = href
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  setCopiedClipboardTheme('copied to clipboard!')
}

const WebComponentsPage: React.SFC = () => {
  // const [copiedClipboardWidgetText, setCopiedClipboardWidget] = React.useState('click here to copy to clipboard')
  // const [copiedClipboardThemeText, setCopiedClipboardTheme] = React.useState('click here to copy to clipboard')
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content className={apiDocStyles.apiDocs}>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Web Components</H3>
          <p>
            In addition to the Elements React component toolkit, Reapit offer a number of other downloadable Front End
            Resources.
          </p>
          <p>
            These may be modular blocks of functionality that can be embedded within your site, toolsets or even CMS
            friendly bundles of scripts available elsewhere.
          </p>

          <H4>Search Widget</H4>
          <p>Coming soon...</p>
          {/* <p>
            The search widget is an embeddable React Widget, that renders a search box, fetching data from the
            Properties service. On search, the widget will render a list of matching properties and plot them on a
            Google Map.
          </p>
          <p>
            To embed the widget on your page, you need to add the script link to our CDN (
            <a
              id="https://web-components.reapit.com/search-widget.js"
              href="#"
              onClick={handleOnClickSearchWidget({ setCopiedClipboardWidget })}
            >
              {copiedClipboardWidgetText}
            </a>
            ):
          </p>
          <pre>
            <code>{`<script src="https://web-components.reapit.com/search-widget.js"></script>`}</code>
          </pre>
          <p>
            The widget is themeable and any of the below default options can be overridden by editing the theme.js file
            and updating the theme object in the below example (
            <a
              id={`window.addEventListener("load", function() {
  if (window.initReapitSearchWidget) {
    window.initReapitSearchWidget({
      theme: {
        base: {
          font: {
            family: "'Open Sans', sans-serif"
          }
        },
        colors: {
          primary: "#00a569",
          secondary: "#828085"
        }
      }
    });
  }
});
`}
              href="#"
              onClick={handleCopiedClipboardTheme({ setCopiedClipboardTheme })}
            >
              {copiedClipboardThemeText}
            </a>
            ):
          </p>
          <pre>
            <code>
              {`window.addEventListener("load", function() {
  if (window.initReaptSearchWidget) {
    window.initReaptSearchWidget({
      API_KEY: "EXAMPLE_AP_KEY",
      theme: {
        base: {
          font: {
            family: "'Open Sans', sans-serif",
          }
        },
        colors: {
          primary: '#00a569',
          secondary: '#828085'
        }
      }
    });
  }
});`}
            </code>
          </pre>
          <p>You can also download these scripts as bundle from the below link:</p>
          <p>
            <a
              href="https://reapit-demo-site.s3.eu-west-2.amazonaws.com/search-widget.zip"
              download
              className="button is-info"
            >
              Download Search Widget
            </a>
          </p> */}
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default WebComponentsPage
