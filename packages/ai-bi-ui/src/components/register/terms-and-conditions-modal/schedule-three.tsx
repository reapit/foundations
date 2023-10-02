import { Subtitle } from '@reapit/elements'
import React from 'react'
import { TermsLi, TermsOl, TermsUl, TermsLiBullet } from './__styles__/terms-and-conditions'

export const ScheduleThree = () => (
  <>
    <Subtitle>Schedule 3 - Developer Obligations</Subtitle>
    <TermsOl>
      <TermsLi>
        The Developer agrees that:
        <TermsUl>
          <TermsLiBullet>
            access to the Foundations Platform is solely for the purpose of developing Applications and/or accessing
            Reapit&rsquo;s Application Programming Interfaces;
          </TermsLiBullet>
          <TermsLiBullet>
            it will not interfere with or access any other developer&rsquo;s Application, without that developer and
            Reapit&rsquo;s express prior written permission;
          </TermsLiBullet>
          <TermsLiBullet>
            it will not interfere with or disrupt the Foundations Platform, or any services or network used to provide
            access to the Foundations Platform;
          </TermsLiBullet>
          <TermsLiBullet>
            it will not collect any data or Personal Data on the Foundations Platform, other than through its
            Application and in accordance with the Application User Terms Principles;
          </TermsLiBullet>
          <TermsLiBullet>
            it will not re-identify (or seek to re-identify) any anonymised data (whether Personal Data or not);
          </TermsLiBullet>
          <TermsLiBullet>
            it will provide feedback when requested by Reapit, in relation to the performance of the Foundations
            Platform;
          </TermsLiBullet>
          <TermsLiBullet>it will co-operate in all matters relating to this Agreement with Reapit;</TermsLiBullet>
          <TermsLiBullet>
            t will not provide access to the Foundations Platform to anyone who has not entered into a direct agreement
            with Reapit on the same terms as this Agreement and, without prejudice to the foregoing, it will not share
            (i) any API access credentials provided by Reapit and/or (ii) the Registration Details with any third party;
          </TermsLiBullet>
          <TermsLiBullet>
            it will conduct an industry-standard penetration test on each Application at least once every calendar year
            and provide Reapit with the results of such test;
          </TermsLiBullet>
          <TermsLiBullet>
            it will not use the Foundations Platform in a manner, develop an Application, or share any or Developer
            Feedback, that:
            <TermsUl>
              <TermsLiBullet>is false or misleading;</TermsLiBullet>
              <TermsLiBullet>
                is defamatory, derogatory, degrading or harassing of another or constitutes a personal attack;
              </TermsLiBullet>
              <TermsLiBullet>
                invades another&rsquo;s privacy or includes, copies or transmits another&rsquo;s confidential, sensitive
                or personal information;
              </TermsLiBullet>
              <TermsLiBullet>promotes bigotry, racism, hatred or harm against any group or individual;</TermsLiBullet>
              <TermsLiBullet>is obscene or not in good taste;</TermsLiBullet>
              <TermsLiBullet>
                infringes or promotes the infringement of a Third Party&rsquo;s rights, including Intellectual Property
                Rights;
              </TermsLiBullet>
              <TermsLiBullet>promotes the infringement of any Applicable Laws;</TermsLiBullet>
              <TermsLiBullet>
                contains a solicitation of funds, goods or services, or promotes or advertises goods or services (other
                than the Application itself); or
              </TermsLiBullet>
              <TermsLiBullet>
                contains any viruses, Trojan horses, or other components designed to limit or harm the functionality of
                a computer.
              </TermsLiBullet>
            </TermsUl>
          </TermsLiBullet>
        </TermsUl>
      </TermsLi>
      <TermsLi>
        The Developer must make available upon request access to the Application in both test and production
        environments for Reapit to conduct random spot-checks.
      </TermsLi>
      <TermsLi>
        When reading Data from end points the Developer must update those end points and write back associated Data, for
        example, but not limited to, the &ldquo;Negotiators diary&rdquo; in order to ensure that the Foundations
        Platform remains the Single source of truth for the benefit of all Marketplace Applications
      </TermsLi>
      <TermsLi>
        Server Side Applications, that are not a companion to a Client Side Application listed on the Marketplace, must
        use Reapit Connect in their non-Marketplace application(s).
      </TermsLi>
      <TermsLi>
        The Developer must use Reapit Connect and Reapit Elements UI component library when building Client Side
        Applications for the Marketplace.
      </TermsLi>
      <TermsLi>
        The Developer must not exceed or circumvent (or seek to circumvent) the Monthly API Calls and the Developer is
        solely responsible for ensuring that it keeps track of its current consumption of Monthly API Calls.
      </TermsLi>
      <TermsLi>
        The Monthly API Calls rates must not exceed: (i) 20 requests per second (ii) 5 concurrent requests for each
        customer that has installed your app (iii) a maximum of 250,000 requests per day
      </TermsLi>
      <TermsLi>
        The Developer acknowledges and agrees that the Foundations Platform API is to be used for a transactional basis
        only, including - Retrieval of data in real-time as and when the Application requires it; and
      </TermsLi>
      <TermsLi>
        Storage of data as a transactional, operational data store for the Application. The Foundations Platform APIs
        must not be used for:
        <TermsUl>
          <TermsLiBullet>
            Bulk extraction of data, historical or otherwise, into third party applications, databases, or data
            warehouses to support business intelligence (BI), data mining, and other decision support applications.
          </TermsLiBullet>
          <TermsLiBullet>
            Automated or scheduled routines to acquire non-transactional data without a requirement to immediately
            process it for your applications use case (this does not include webhooks).
          </TermsLiBullet>
          <TermsLiBullet>Load or volume testing of your application using sandbox or customer data.</TermsLiBullet>
        </TermsUl>
      </TermsLi>
      <TermsLi>
        An Application must maintain no more than 5 API interaction threads and awaits completion of previous requests
        before submitting new ones
      </TermsLi>
    </TermsOl>
  </>
)
