import * as React from 'react'

import { FlexContainerResponsive, Content, H3, H4, FlexContainerBasic } from '@reapit/elements'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'

const WebComponentsPage: React.SFC = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
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
          <p>
            The search widget is an embeddable React Widget, that renders a search box, fetching data from the
            Properties service. On search, the widget will render a list of matching properties and plot them on a
            Google Map.
          </p>
          <p>To embed the widget on your page, you need to add the two bundled scripts as per below:</p>
          <pre>
            <code>
              {`<script src="./scripts/theme.js" />
<script src="./scripts/search-widget.js" />`}
            </code>
          </pre>
          <p>
            The widget is themeable and any of the below default options can be overridden by editing the theme.js file
            and updating the theme object in the below example:
          </p>
          <pre>
            <code>
              {`window.addEventListener("load", function() {
  if (window.initReaptSearchWidget) {
    window.initReaptSearchWidget({
      API_KEY: "abc",
      theme: {
        base: {
          font: {
            family: "'Open Sans', sans-serif",
            sizes: {
              base: '1.5rem',
              headings: {
                h1: '2.4rem',
                h2: '2.2rem',
                h3: '2.0rem',
                h4: '1.8rem',
                h5: '1.6rem'
              }
            }
          }
        },
        button: {
          background: '#ffffff',
          color: '#12263f'
        },
        colors: {
          primary: '#00a569',
          secondary: '#828085',
          icon: 'gray',
          base: '#12263f',
          widgetHeading: '#ffffff',
          background: '#ffffff',
          warning: '#d3033d',
          loading: '#95aac9'
        }
      }
    });
  }
});`}
            </code>
          </pre>
          <p>
            <a
              href="https://reapit-demo-site.s3.eu-west-2.amazonaws.com/search-widget.zip"
              download
              className="button is-primary"
            >
              Download Search Widget
            </a>
          </p>
          <H4>Elements</H4>
          <p>
            The Elements UI toolkit you can browse <Link to={Routes.DEVELOPER_ELEMENTS}>here</Link> is available as an
            NPM package. We also support an AMD (require.js), version that may suit your needs better, especially when
            serving content from a CDN or CMS.
          </p>
          <p>
            <a
              href="https://reapit-app-store-webcomponents.s3.eu-west-2.amazonaws.com/elements-v0.4.53.zip"
              download
              className="button is-primary"
            >
              Download Elements
            </a>
          </p>
          <H4>Type Definitions</H4>
          <p>
            If you are using TypeScript (and we recommend you do!), for your front end project, we provide full type
            definitions for the API documented in the <Link to={Routes.DEVELOPER_SWAGGER}>API explorer</Link>. We
            generate these types from the Swagger contracts direct so you can be sure that when the API changes, your
            types will be updated also. This allows for a much closer alignment between front and back end development
            and ultimately more robust applications.
          </p>
          <p>
            <a
              href="https://reapit-app-store-webcomponents.s3.eu-west-2.amazonaws.com/foundations-type-definitions.zip"
              download
              className="button is-primary"
            >
              Download foundations.d.ts
            </a>
          </p>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export default WebComponentsPage
