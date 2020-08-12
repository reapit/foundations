/*
 * TODOME(selectIsRequiredDataOfBillingPageFilled)
 * create selector
 */

import { ReduxState } from '@/types/core'
import { ErrorState } from '@/reducers/error'
/*
 * TODOME(selectIsRequiredDataOfBillingPageFilled)
 * name
 * bool
 */

export const selectErrorState = (state: ReduxState): ErrorState => {
  /*
   * TODOME(selectIsRequiredDataOfBillingPageFilled)
   *
   * settings?.developerInfomation
 Name
Telephone
------------------------------
   */

  /*
   * settings?.developerInfomation
   * TODOME(selectIsRequiredDataOfBillingPageFilled)
Website
VAT Registration Number or - tax
Company Number or
National Insurance Number (one of the 3 should be present) - ok
   */

  /*
 * TODOME(selectIsRequiredDataOfBillingPageFilled)
 * address: state.settings.developerInfomation?.companyAddress?.
 *  Line 1
Address Line 4
Postcode
 */

  return state.error
}
