import React, { useState, useEffect, useContext } from 'react'
import { Button, H3, H5, Section, Helper } from '@reapit/elements'
import { getAccountsService } from '../../../services/accounts'
import { PagedApiResponse } from '../../../types/core'
import { AccountModel } from '../../../types/accounts'
import AccountsTable from './accounts-table'
import { serverError } from '../../ui/toast-error'
import { ErrorContext } from '../../../context/error-context'
import AccountProvisionModal from './account-provision-modal'
import AccountProgressBar from './account-progress-bar'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<PagedApiResponse<AccountModel>>()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [provisionInProgress, setProvisionInProgress] = useState<boolean>(false)
  const [percentageComplete, setPercentageComplete] = useState(0)
  const { setServerErrorState } = useContext(ErrorContext)
  const handleModalClose = () => setModalVisible(false)
  const handleModalOpen = () => setModalVisible(true)

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await getAccountsService()
      if (accounts) {
        return setAccounts(accounts)
      }
      return setServerErrorState(serverError('Something went wrong fetching accounts, please try again'))
    }
    getAccounts()
  }, [setAccounts])

  return (
    <>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">Accounts</H3>
        <Button onClick={handleModalOpen}>Provision Account</Button>
        <AccountProvisionModal
          visible={modalVisible}
          handleClose={handleModalClose}
          setAccounts={setAccounts}
          setProvisionInProgress={setProvisionInProgress}
          setPercentageComplete={setPercentageComplete}
        />
      </Section>
      {provisionInProgress && (
        <AccountProgressBar percentageComplete={percentageComplete} setPercentageComplete={setPercentageComplete} />
      )}
      <Section>
        <H5>Account Details</H5>
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300} in unmountOnExit>
            {accounts?._embedded.length ? (
              <AccountsTable accounts={accounts?._embedded ?? []} setAccounts={setAccounts} />
            ) : (
              <Helper variant="info">No accounts yet provisioned for your organisation</Helper>
            )}
          </CSSTransition>
        </TransitionGroup>
      </Section>
    </>
  )
}

export default Accounts
