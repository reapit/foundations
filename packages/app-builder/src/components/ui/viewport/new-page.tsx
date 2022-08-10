import { useObjectMutate } from '@/components/hooks/objects/use-object-mutate'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import {
  elBorderGreyB,
  elFlex,
  elFlex1,
  elFlexAlignCenter,
  elFlexColumn,
  elPx3,
  elW2,
  elWFull,
  Loader,
} from '@reapit/elements'
import React, { useEffect } from 'react'
import { useObject } from '../../hooks/objects/use-object'
import { useTypeList } from '../../hooks/objects/use-type-list'
import { FormIcon } from '../../icons/form'
import { TableIcon } from '../../icons/table'
import { SidebarDiv } from '../sidebar'
import { SubtitleBold } from '../sidebar-item'
import { HeaderDiv } from '../sidebar-item/styles'
import { bgWhite, transition } from '../styles'
import { Item, ToolboxItem } from '../toolbox'
import { ColumnControls } from '../user/column-controls'

const InfoBubbleSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4608 15.3295C19.4355 13.7866 20 11.9586 20 10C20 4.48095 15.5191 0 10 0C4.48086 0 0 4.48086 0 10C0 15.5191 4.48086 20 10 20C11.9587 20 13.7867 19.4355 15.3295 18.4608L19.3016 19.3017L18.4608 15.3295Z"
      fill="#23A4DE"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.06293 13.0447L8.65093 10.2688C8.7006 10.0813 8.72552 9.88174 8.72552 9.66968C8.72552 9.42005 8.66637 9.24223 8.5477 9.13602C8.42921 9.03017 8.23259 8.97717 7.95803 8.97717C7.73352 8.97717 7.53392 9.01437 7.35889 9.08933C7.40892 8.46509 7.63046 7.98814 8.02351 7.65724C8.41673 7.32632 8.88174 7.16095 9.41841 7.16095C10.0172 7.16095 10.501 7.34845 10.8693 7.72271C11.2372 8.09716 11.4214 8.6589 11.4214 9.40762C11.4214 9.71975 11.3714 10.125 11.2719 10.6243L10.6372 13.6219C10.5872 13.8088 10.5622 14.0084 10.5622 14.221C10.5622 14.4705 10.6218 14.6485 10.7401 14.7543C10.8589 14.8605 11.0552 14.9136 11.3297 14.9136C11.5548 14.9136 11.7544 14.876 11.9289 14.8014C11.8788 15.4251 11.6577 15.9026 11.2642 16.2335C10.8714 16.5638 10.4063 16.7292 9.86972 16.7292C9.27058 16.7292 8.78677 16.5423 8.41882 16.1676C8.05052 15.7934 7.86634 15.2318 7.86634 14.4831C7.86634 14.171 7.91638 13.7651 8.01645 13.266L8.06293 13.0447ZM11.1426 6.24611C10.7309 6.24611 10.3814 6.10233 10.0942 5.81531C9.80716 5.52829 9.66393 5.17897 9.66393 4.76693C9.66393 4.35528 9.80715 4.0024 10.0942 3.70945C10.3814 3.41611 10.7309 3.26953 11.1426 3.26953C11.5548 3.26953 11.9073 3.41611 12.2006 3.70945C12.4939 4.00242 12.6405 4.35526 12.6405 4.76693C12.6405 5.17894 12.4939 5.52826 12.2006 5.81531C11.9073 6.10232 11.5548 6.24611 11.1426 6.24611Z"
      fill="white"
    />
  </svg>
)

const StepTitle = styled.div<{ active?: boolean }>`
  padding: 4px 12px;
  gap: 8px;
  cursor: pointer;

  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  /* Small text (bold) */

  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  font-feature-settings: 'liga' off;

  display: inline-block;

  background: ${({ active }) => {
    return active ? '#23a4de' : '#FFFFFF'
  }};
  color: ${({ active }) => {
    return active ? '#fff' : '##646464'
  }};
`

const InfoBox = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;

  display: flex;
`

const InfoText = styled.p`
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* or 117% */

  font-feature-settings: 'liga' off;

  /* Neutral/Dark Grey */

  color: #646464;

  flex: 1;
`

const InfoBubble = styled(InfoBubbleSvg)`
  width: 20px;
  height: 20px;

  margin-right: 12px;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
`

const HR = styled.hr`
  border: 0.5px solid #e3e3e3;
  margin-bottom: 24px;
`

const StepContent = styled.div<{ active?: boolean }>`
  transition: 0.3s height;
  padding-bottom: 20px;
  overflow: hidden;

  height: ${({ active }: { active?: boolean }) => {
    return active ? 'auto' : '0px'
  }};
`

const PageTypeButton = styled(ToolboxItem)<{ active?: boolean }>`
  cursor: pointer;
  background: ${({ active }) => {
    return active ? '#EAF5FC' : '#fff'
  }};
`

type PageType = 'table' | 'form'

const Step1 = ({
  stepNo,
  setStepNo,
  setPageType,
  pageType,
}: {
  stepNo: number
  setStepNo: (no: number) => void
  setPageType: (pt: PageType) => void
  pageType?: PageType
}) => (
  <>
    <StepTitle active={stepNo === 0} onClick={() => setStepNo(0)}>
      1. Page type
    </StepTitle>
    <StepContent active={stepNo === 0}>
      <InfoBox>
        <InfoBubble />
        <InfoText>
          First tell us about the kind of app or integration you are building to ensure we get you authenticated
          correctly. By selecting an option, relevant documentation and links will appear on the right hand side of the
          page before progressing.
        </InfoText>
      </InfoBox>
      <ButtonsContainer>
        <PageTypeButton
          name="Table"
          active={pageType === 'table'}
          onClick={() => {
            setPageType('table')
            setStepNo(1)
          }}
        >
          <Item>
            <TableIcon />
          </Item>
        </PageTypeButton>
        <PageTypeButton
          name="Form"
          active={pageType === 'form'}
          onClick={() => {
            setPageType('form')
            setStepNo(1)
          }}
        >
          <Item>
            <FormIcon />
          </Item>
        </PageTypeButton>
      </ButtonsContainer>
    </StepContent>
  </>
)

const EntityButton = styled(StepTitle)<{ active?: boolean }>`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  display: flex;
  align-items: center;
  padding: 8px;
  color: #646464;

  background: ${({ active }) => {
    return active ? '#EAF5FC' : '#FFFFFF'
  }};
`

const EntitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
  gap: 12px 28px;
`

const EntitySvg = styled.svg`
  width: 20px;
  height: 20px;
`

const EntityIcon = ({ entity }: { entity: string }) => (
  <EntitySvg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-label={entity}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 20H18V7.88218L10 2L2 7.88218V20Z" fill="#7BC9EB" />
    <path d="M5 9H9V13H5V9Z" fill="white" />
    <path d="M11 9H15V13H11V9Z" fill="white" />
    <path d="M5 14H9V18H5V14Z" fill="#0061A8" />
    <path d="M11 14H15V18H11V14Z" fill="#F2F2F2" />
    <path d="M11 4H15V7H11V4Z" fill="#F2F2F2" />
    <path d="M5 4H9V7H5V4Z" fill="#F2F2F2" />
    <path d="M1.22096 10L10 2.65656L18.779 10L20 8.36478L10 0L7.62939e-06 8.36478L1.22096 10Z" fill="#23A4DE" />
  </EntitySvg>
)

const Step2 = ({
  stepNo,
  setStepNo,
  setEntity,
  entity,
  pageType,
}: {
  stepNo: number
  setStepNo: (no: number) => void
  setEntity: (name: string) => void
  entity?: string
  pageType?: PageType
}) => {
  const { data, loading } = useTypeList()
  return (
    <>
      <StepTitle active={stepNo === 1} onClick={() => pageType && setStepNo(1)}>
        2. Entities
      </StepTitle>
      <StepContent active={stepNo === 1}>
        <InfoBox>
          <InfoBubble />
          <InfoText>
            First tell us about the kind of app or integration you are building to ensure we get you authenticated
            correctly. By selecting an option, relevant documentation and links will appear on the right hand side of
            the page before progressing.
          </InfoText>
        </InfoBox>
        <EntitiesContainer>
          {loading && <Loader />}
          {!loading &&
            data &&
            data.map((type) => (
              <EntityButton
                key={type}
                active={entity === type}
                onClick={() => {
                  setEntity(type)
                  setStepNo(2)
                }}
              >
                <EntityIcon entity={type} />
                {type}
              </EntityButton>
            ))}
        </EntitiesContainer>
      </StepContent>
    </>
  )
}

const Step3 = ({
  stepNo,
  setStepNo,
  entity,
  setFields,
  fields,
  pageType,
}: {
  stepNo: number
  setStepNo: (no: number) => void
  entity?: string
  setFields: (fields: string[]) => void
  fields?: string[]
  pageType?: PageType
}) => {
  const { loading, object } = useObject(entity)
  const { args } = useObjectMutate(pageType === 'form' ? 'create' : 'list', entity)
  const availableFields =
    (pageType === 'form' && args
      ? args[0].fields?.map(({ name, isRequired }) => ({ name, isRequired }))
      : object?.object.fields) || []

  useEffect(() => {
    if (entity) {
      const fieldNames = availableFields.filter((field) => field.isRequired).map((field) => field.name)
      setFields(fieldNames)
    }
  }, [entity])

  return (
    <>
      <StepTitle active={stepNo === 2} onClick={() => entity && setStepNo(2)}>
        3. Fields
      </StepTitle>
      <StepContent active={stepNo === 2}>
        <InfoBox>
          <InfoBubble />
          <InfoText>
            First tell us about the kind of app or integration you are building to ensure we get you authenticated
            correctly. By selecting an option, relevant documentation and links will appear on the right hand side of
            the page before progressing.
          </InfoText>
        </InfoBox>
        <EntitiesContainer>
          {loading && <Loader />}
          {!loading && (
            <ColumnControls
              availableFields={availableFields.map(({ name, isRequired }) => ({
                name,
                isRequired: pageType === 'form' && isRequired,
              }))}
              includedFields={fields}
              setIncludedFields={setFields}
            />
          )}
        </EntitiesContainer>
      </StepContent>
    </>
  )
}

const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  background: #fff;
  padding: 24px 0;
`

const SidebarButton = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #23a4de;
  color: white;
  padding: 14px;
  gap: 8px;
  border-radius: 4px;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  cursor: ${({ disabled }) => {
    return disabled ? 'not-allowed' : 'pointer'
  }};
  pointer-events: ${({ disabled }) => {
    return disabled ? 'none' : 'auto'
  }};
  opacity: ${({ disabled }) => {
    return disabled ? 0.5 : 1
  }};
`

export type NewPageType = {
  pageType: PageType
  entity: string
  fields: string[]
}

export const NewPage = ({
  showNewPage,
  createNewPage,
  createNewPageLoading,
  onChange,
}: {
  showNewPage: boolean
  createNewPage: (newPage: NewPageType) => void
  createNewPageLoading: boolean
  onChange: (newPage: Partial<NewPageType>) => void
}) => {
  const [stepNo, setStepNo] = React.useState(0)
  const [newPage, setNewPage] = React.useState<Partial<NewPageType>>({})

  const { pageType, entity, fields } = newPage

  const handlePageChange = (newPage: Partial<NewPageType>) => {
    setNewPage(newPage)
    onChange(newPage)
  }

  return (
    <SidebarDiv
      className={cx(transition, bgWhite, elW2, elFlexColumn)}
      isCollapsed={!showNewPage}
      style={{ overflowY: 'initial' }}
    >
      <HeaderDiv className={cx(bgWhite, elBorderGreyB, elFlex, elFlexAlignCenter, elPx3)}>
        <SubtitleBold style={{ marginBottom: 0 }}>Create Page Wizard</SubtitleBold>
      </HeaderDiv>
      <div style={{ width: '100%', flex: 1, overflowY: 'auto' }}>
        <div className={cx(elWFull, elFlex1)} style={{ padding: 20 }}>
          <Step1
            stepNo={stepNo}
            setStepNo={setStepNo}
            pageType={pageType}
            setPageType={(pageType) => {
              handlePageChange({ pageType })
            }}
          />
          <HR />
          <Step2
            stepNo={stepNo}
            setStepNo={setStepNo}
            entity={entity}
            pageType={pageType}
            setEntity={(entity) => {
              handlePageChange({ ...newPage, entity, fields: [] })
            }}
          />
          <HR />
          <Step3
            stepNo={stepNo}
            setStepNo={setStepNo}
            entity={entity}
            fields={fields}
            pageType={pageType}
            setFields={(fields) => {
              handlePageChange({ ...newPage, fields })
            }}
          />
        </div>
      </div>
      {pageType && entity && !!fields?.length && (
        <SidebarFooter>
          <SidebarButton
            onClick={() => {
              createNewPage({ pageType, entity, fields })
            }}
            disabled={createNewPageLoading}
          >
            Create page
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.6486 6.52882C3.91286 6.79311 3.91284 7.21879 3.64861 7.48301L0.491085 10.6405C0.164621 10.967 0.00090078 11.394 3.70718e-06 11.8212C-1.24196e-06 11.8236 -1.23572e-06 11.826 3.72591e-06 11.8283C0.000902999 12.2555 0.164587 12.6825 0.491101 13.0089C1.1458 13.6636 2.20442 13.6637 2.85921 13.0092L7.68969 8.19055C8.34442 7.53576 8.34489 6.4765 7.69012 5.82173L2.85947 0.991077C2.2047 0.336371 1.14586 0.336239 0.491068 0.991093C-0.163542 1.64576 -0.163682 2.70432 0.490735 3.35911L3.6486 6.52882Z"
                fill="white"
              />
            </svg>
          </SidebarButton>
        </SidebarFooter>
      )}
    </SidebarDiv>
  )
}
