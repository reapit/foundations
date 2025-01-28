import React from 'react'
import { render } from '../../../tests/react-testing'
import { FormWizard } from '../form-wizard'
import { FormLayout, InputGroup, InputWrapFull } from '@reapit/elements'

describe('FormWizard', () => {
  it('Matches snapshot', () => {
    expect(render(<FormWizard onSubmit={() => {}}  steps={{
      first: {
        name: '1',
        component: ({ errors, register}) => <FormLayout hasMargin>
          <InputWrapFull>
                          <InputGroup
                            type="text"
                            label="Website"
                            id="website"
                            placeholder="mycompany.co.uk"
                            {...register('website')}
                            intent={errors?.website?.message ? 'danger' : undefined}
                            inputAddOnText={errors?.website?.message as string}
                          />
                        </InputWrapFull>
        </FormLayout>
      }
    }} />)).toMatchSnapshot()
  })
})
