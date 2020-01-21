import * as React from 'react'
import apiDocStyles from '@/styles/pages/api-docs.scss?mod'
import { FlexContainerResponsive, Content, H4, H3, FlexContainerBasic } from '@reapit/elements'
import Routes from '../../constants/routes'
import { Link } from 'react-router-dom'

const PackageDocsPage: React.FC = () => (
  <FlexContainerBasic flexColumn hasPadding>
    <Content className={apiDocStyles.apiDocs}>
      <FlexContainerResponsive flexColumn hasBackground hasPadding>
        <H3>Packages</H3>
        <H4>Elements</H4>
        <p>
          The Elements UI toolkit you can browse <Link to={Routes.DEVELOPER_ELEMENTS}>here</Link> is available as an NPM
          package. We also support an AMD (require.js), version that may suit your needs better, especially when serving
          content from a CDN or CMS.
        </p>
        <H4>React App Scaffolder</H4>
        <p>Content</p>
        <H4>Cognito Auth</H4>
        <p>Content</p>
        <H4>Foundations TS Definitions</H4>
        <p>
          If you are using TypeScript (and we recommend you do!), for your front end project, we provide full type
          definitions for the API documented in the <Link to={Routes.DEVELOPER_SWAGGER}>API explorer</Link>. We generate
          these types from the Swagger contracts direct so you can be sure that when the API changes, your types will be
          updated also. This allows for a much closer alignment between front and back end development and ultimately
          more robust applications.
        </p>
      </FlexContainerResponsive>
    </Content>
  </FlexContainerBasic>
)

export default PackageDocsPage
