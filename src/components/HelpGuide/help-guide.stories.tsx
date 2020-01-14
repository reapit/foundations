import React from 'react'
import { storiesOf } from '@storybook/react'
import { HelpGuide } from '.'
import { useHelpGuideContext } from './context'
import { Button } from '../Button'

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

storiesOf('HelpGuide', module).add('Primary', () => {
  return (
    <HelpGuide>
      <HelpGuide.Step
        id="step-1"
        component={ComponentA}
        heading="Heading-1"
        subHeading="SubHeading-1"
        graphic={<img src={imageUrl} />}
      />
      <HelpGuide.Step
        id="step-2"
        component={ComponentB}
        heading="Heading-2"
        subHeading="SubHeading-2"
        graphic={<img src={imageUrl} />}
      />
      <HelpGuide.Step
        id="step-3"
        component={ComponentB}
        heading="Heading-3"
        subHeading="SubHeading-3"
        graphic={<img src={imageUrl} />}
      />
      <HelpGuide.Step
        id="step-4"
        component={ComponentB}
        heading="Heading-4"
        subHeading="SubHeading-4"
        graphic={<img src={imageUrl} />}
      />
      <HelpGuide.Step
        id="step-5"
        component={ComponentC}
        heading="Heading-5"
        subHeading="SubHeading-5"
        graphic={<img src={imageUrl} />}
      />
    </HelpGuide>
  )
})
