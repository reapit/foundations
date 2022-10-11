import React, { FC } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb7,
  ElToggleItem,
  FormLayout,
  InputGroup,
  InputWrap,
  InputWrapFull,
  InputWrapMed,
  Label,
  MultiSelectInput,
  PersistentNotification,
  Subtitle,
  TextArea,
  Title,
  Toggle,
  ToggleRadio,
} from '@reapit/elements'

export const FormExample: FC = () => (
  <>
    <Title>Form Example</Title>
    <PersistentNotification className={elMb7} isExpanded intent="secondary" isInline isFullWidth>
      The form example is designed to show the various form and responsive form layout components. You can use any Form
      library or just straight React to manage your form state however, we strongly recommend React Hook Form (we use
      this internally). We have also tested Elements successfully with Formik.
    </PersistentNotification>

    <form>
      <Subtitle>Main Form</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup icon="homeSystem" label="Address" type="text" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="phoneSystem" label="Phone" type="number" />
        </InputWrap>
        <InputWrap>
          <InputGroup type="checkbox" label="Status" />
        </InputWrap>
        <InputWrap>
          <InputGroup icon="calendarSystem" label="Date of Birth" type="date" />
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <Toggle id="my-cool-toggle">
              <ElToggleItem>On</ElToggleItem>
              <ElToggleItem>Off</ElToggleItem>
            </Toggle>
            <Label>Active</Label>
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <InputGroup>
            <ToggleRadio
              name="my-cool-toggle-radio"
              options={[
                {
                  id: 'option-1',
                  value: 'option-1',
                  text: 'Option 1',
                  isChecked: true,
                },
                {
                  id: 'option-2',
                  value: 'option-2',
                  text: 'Option 2',
                  isChecked: false,
                },
                {
                  id: 'option-3',
                  value: 'option-3',
                  text: 'Option 3',
                  isChecked: false,
                },
              ]}
            />
            <Label>Options</Label>
          </InputGroup>
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <TextArea type="text" placeholder="A placeholder" />
            <Label>Long Description</Label>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <Subtitle>Sub Form</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non pulvinar tellus, quis pulvinar dui. Nunc
        enim libero, ullamcorper ac ex id, tincidunt dapibus lectus. Vestibulum at porta quam, ac condimentum dui. Duis
        ornare enim sed magna tincidunt volutpat.
      </BodyText>
      <FormLayout hasMargin>
        <InputWrapMed>
          <InputGroup icon="homeSystem" label="Really Long Address" type="text" />
        </InputWrapMed>
        <InputWrap>
          <InputGroup icon="emailSystem" label="Email" type="text" />
        </InputWrap>
        <InputWrapFull>
          <InputGroup>
            <MultiSelectInput
              id="react-example"
              options={[
                {
                  name: 'Item one',
                  value: 'item-one',
                },
                {
                  name: 'Item two',
                  value: 'item-two',
                },
                {
                  name: 'Item three',
                  value: 'item-three',
                },
              ]}
              defaultValues={['item-one']}
            />
            <Label>Select Items</Label>
          </InputGroup>
        </InputWrapFull>
      </FormLayout>
      <ButtonGroup alignment="right">
        <Button size={2} intent="primary">
          Cancel
        </Button>
        <Button size={2} chevronRight intent="critical">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  </>
)

export default FormExample
