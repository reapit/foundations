import * as React from 'react'
import { SubTitleH4, Content, H2 } from '@reapit/elements'
import { name } from '../../../package.json'

const UnsupportBrower: React.FC = () => {
  return (
    <Content className="section">
      <H2 isCentered>Unsupported Brower</H2>
      <SubTitleH4 isCentered>
        {`${name} probably won't work great in Internet Explorer 11. we generally only support the recent versions of
        major browers like Chrome, Firefox, Safari and Edge`}
      </SubTitleH4>
    </Content>
  )
}

export default UnsupportBrower
