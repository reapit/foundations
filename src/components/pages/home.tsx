import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { HomeState } from '@/reducers/home'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import Section, { SectionProps } from '@/components/ui/section'
import AMLProgressBar from '@/components/ui/aml-progressbar'
import styles from '@/styles/pages/home.scss?mod'

export interface HomeMappedActions {}

export interface HomeMappedProps {
  homeState: HomeState
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>

export const generateSection = (onClick: () => void) => {
  return [
    {
      title: 'Personal Details',
      isCompleted: false,
      onEdit: onClick,
      buttonText: 'Edit'
    },
    {
      title: 'Primary ID',
      isCompleted: false,
      onEdit: onClick,
      buttonText: 'Edit'
    },
    {
      title: 'Secondary ID',
      isCompleted: false,
      onEdit: onClick,
      buttonText: 'Edit'
    },
    {
      title: 'Address History',
      isCompleted: true,
      onEdit: onClick,
      buttonText: 'Edit'
    },
    {
      title: 'Declaration and Risk Assessment',
      isCompleted: false,
      onEdit: onClick,
      buttonText: 'Edit'
    },
    {
      title: 'PEP Search',
      isCompleted: true,
      onEdit: onClick,
      buttonText: 'Edit'
    },
    {
      title: 'Experian ',
      isCompleted: true,
      onEdit: onClick,
      buttonText: 'Edit'
    }
  ]
}

export const renderSections = (sections: SectionProps[]) => {
  return sections.map((section, index) => {
    return (
      <div key={index} className="mb-5">
        <Section
          title={section.title}
          isCompleted={section.isCompleted}
          onEdit={section.onEdit}
          buttonText={section.buttonText}
        />
      </div>
    )
  })
}

export const Home: React.FunctionComponent<HomeProps> = () => {
  // TODO: Will replace callback by dispatch to show modal
  const sections = generateSection(() => {
    console.log('onEdit')
  })
  return (
    <ErrorBoundary>
      <div className={styles.topNavbar}>
        <div>
          <a>Back to Client/Logout</a>
        </div>
        <div>
          <a>Customise Form</a>
        </div>
      </div>
      <div className="mb-5">
        <AMLProgressBar title="Giacomo" />
      </div>
      {renderSections(sections)}
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  homeState: state.home
})

export const mapDispatchToProps = (): HomeMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
