import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive, SubTitleH5 } from '@reapit/elements'

export type AppointmentProps = {}

export const Appointment: React.FC<AppointmentProps> = () => {
  return (
    <FlexContainerBasic hasPadding>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Welcome To Reapit Foundations</H3>
        <SubTitleH5>You are now Appointment against our sandbox data</SubTitleH5>
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Appointment
