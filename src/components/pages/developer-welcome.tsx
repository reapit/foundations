import * as React from 'react'
import { connect } from 'react-redux'
import {
  FlexContainerBasic,
  Content,
  FlexContainerResponsive,
  useHelpGuideContext,
  HelpGuide,
  Button,
  LevelRight
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import { userAcceptTermAndCondition } from '@/actions/auth'

export interface DevelopeWelcomeMappedActions {
  userAcceptTermAndCondition: () => void
}

export type DeveloperWelcomeMessageProps = DevelopeWelcomeMappedActions

const imageUrl = 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/63319/Placeholder.png'

const ComponentA = () => {
  const context = useHelpGuideContext()
  return (
    <div>
      <p className="mb-5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt ipsa minima hic rerum. Aspernatur laborum eum
        vel necessitatibus dolorum alias. Sunt necessitatibus nisi repellat perspiciatis quam, iusto, fugit expedita
        cupiditate quisquam totam voluptates? Facilis laudantium dolores tempora aspernatur natus minus, soluta aliquam?
        Similique mollitia, placeat architecto eum dolores quam, omnis quidem iste vero tempora ipsum repellendus
        voluptas, aliquam rerum molestias iure quasi totam assumenda quo veritatis. Corporis debitis, veniam sit earum
        vero id impedit odio totam itaque numquam omnis non repellat fugiat nostrum nam minima modi, dignissimos ut
        quibusdam praesentium sunt in beatae at nemo! Inventore blanditiis expedita pariatur amet laboriosam culpa,
        nihil sed rerum natus et recusandae hic est error ab accusantium impedit earum vero quae. Alias quae
      </p>
      <Button type="button" variant="primary" onClick={context.goNext}>
        Next
      </Button>
    </div>
  )
}

const ComponentB = () => {
  const context = useHelpGuideContext()

  return (
    <div>
      <p className="mb-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita consequatur molestias! Magnam in
        inventore, sunt fuga minus nihil pariatur facilis nobis modi debitis aspernatur perspiciatis quo officiis sit
        laudantium!
      </p>
      <Button type="button" variant="primary" onClick={context.goPrev}>
        Prev
      </Button>
      <Button type="button" variant="primary" onClick={context.goNext}>
        Next
      </Button>
    </div>
  )
}

const ComponentC = () => {
  const context = useHelpGuideContext()

  return (
    <div>
      <p className="mb-5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita consequatur molestias! Magnam in
        inventore, sunt fuga minus nihil pariatur facilis nobis modi debitis aspernatur perspiciatis quo officiis sit
        laudantium!
      </p>
      <Button type="button" variant="primary" onClick={context.goPrev}>
        Prev
      </Button>
    </div>
  )
}

export const handleUserAccept = (userAcceptTermAndCondition, history) => () => {
  userAcceptTermAndCondition()
  history.push(Routes.DEVELOPER_MY_APPS)
}

export const DeveloperWelcomeMessage: React.FC<DeveloperWelcomeMessageProps> = ({ userAcceptTermAndCondition }) => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <HelpGuide>
            <HelpGuide.Step
              key="step-1"
              id="step-1"
              component={ComponentA}
              heading="Heading-1"
              subHeading="SubHeading-1"
              graphic={<img style={{ maxWidth: '100%', height: 'auto' }} src={imageUrl} />}
            />
            <HelpGuide.Step id="step-2" component={ComponentB} heading="Heading-2" subHeading="SubHeading-2" />
            <HelpGuide.Step id="step-3" component={ComponentB} heading="Heading-3" subHeading="SubHeading-3" />
            <HelpGuide.Step id="step-4" component={ComponentB} heading="Heading-4" subHeading="SubHeading-4" />
            <HelpGuide.Step id="step-5" component={ComponentC} heading="Heading-5" subHeading="SubHeading-5" />
          </HelpGuide>
          <LevelRight>
            <Button variant="primary" type="button" onClick={handleUserAccept(userAcceptTermAndCondition, history)}>
              Get Started
            </Button>
          </LevelRight>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}

export const mapDispatchToProps = (dispatch: any): DevelopeWelcomeMappedActions => ({
  userAcceptTermAndCondition: () => dispatch(userAcceptTermAndCondition())
})

export default connect(null, mapDispatchToProps)(DeveloperWelcomeMessage)
