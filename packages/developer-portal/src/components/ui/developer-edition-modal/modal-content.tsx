import React from 'react'
import { Link } from 'react-router-dom'

export const modalContent = {
  admin: {
    incomplete: {
      title: 'Account Information Required',
      content: (
        <p>
          Before you can subscribe to the Developer Edition of Agency Cloud, you will first need to submit your billing
          information. Please visit the&nbsp;
          <Link to="/settings/billing">&apos;Billing&apos;</Link> page, to complete.
        </p>
      ),
    },
    pending: {
      title: 'Account Information Pending',
      content: (
        <p>
          As we are currently verifying your account information, you will not be able to subscribe to the Developer
          Edition of Agency Cloud. To check the status of your account, please visit the&nbsp;
          <Link to="/settings/billing">&apos;Billing&apos;</Link> page.
        </p>
      ),
    },
  },
  user: {
    incomplete: {
      title: 'Account Information Required',
      content: (
        <p>
          Before you can subscribe to the Developer Edition of Agency Cloud, billing information will need to be
          submitted. Please ask the Admin of your organisation to visit the ‘Billing’ page under ‘Settings’ to complete.
        </p>
      ),
    },
    pending: {
      title: 'Account Information Pending',
      content: (
        <p>
          As we are currently verifying your account information, you will not be able to subscribe to the Developer
          Edition of Agency Cloud. The Admin of your organisation can check the status of your account by visiting the
          ‘Billing’ page under ‘Settings’.
        </p>
      ),
    },
  },
}
