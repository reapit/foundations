import React from 'react'
import { H5, Content } from '@reapit/elements'
import { TermsLi, TermsOl, TermsUl, TermsLiBullet } from './__styles__/terms-and-conditions'

export const ScheduleThree = () => (
  <Content>
    <H5 className="text-center">Schedule 3 - Developer Obligations</H5>

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
            it will not collect any data or Personal Data on the Foundations Platform, other than through its
            Application and in accordance with the Application User Terms Principles;
          </TermsLiBullet>
          <TermsLiBullet>
            it will provide feedback when requested by Reapit, in relation to the performance of the Foundations
            Platform;
          </TermsLiBullet>
          <TermsLiBullet>it will co-operate in all matters relating to this Agreement with Reapit;</TermsLiBullet>
          <TermsLiBullet>
            it will not provide access to the Foundations Platform to anyone who has not entered into a direct agreement
            with Reapit on the same terms as this Agreement;
          </TermsLiBullet>
          <TermsLiBullet>
            it will conduct an industry-standard penetration test on each Application at least once every calendar year
            and provide Reapit with the results of such test;
          </TermsLiBullet>
          <TermsLiBullet>
            it will not use the Foundations Platform in a manner, develop an Application, or share any content or
            Developer Feedback, that:
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
        The developer must make available upon request access to the Application in both test and production
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
        The Developer will conduct an industry-standard penetration test on each Application at least once every
        calendar year and provide Reapit with the results of such test.
      </TermsLi>
    </TermsOl>
  </Content>
)
