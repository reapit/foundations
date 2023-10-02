import React from 'react'
import { Subtitle } from '@reapit/elements'
import { TermsLi, TermsOl } from './__styles__/terms-and-conditions'

export const ScheduleOne = () => (
  <>
    <Subtitle>Schedule 1 - Application User Terms Principles</Subtitle>
    <TermsOl>
      <TermsLi>
        <Subtitle>General</Subtitle>
        <TermsOl>
          <TermsLi>
            <span>
              The Developer must not include any terms in the Application User Terms, which conflict with the
              Developer’s obligations pursuant to this Agreement.
            </span>
          </TermsLi>
          <TermsLi>
            <span>The Developer must ensure that the Application:</span>
            <TermsOl>
              <TermsLi>
                <span>
                  should access only the minimum data fields which that Application needs to work properly; and
                </span>
              </TermsLi>

              <TermsLi>
                <span>
                  ensure any data is collected, processed, transmitted, maintained and used in accordance with the
                  Application User Terms, all applicable laws and reasonable measures that protect the privacy and
                  security of the relevant end user (including at a minimum those set out below at Paragraph 2).
                </span>
              </TermsLi>
            </TermsOl>
          </TermsLi>

          <TermsLi>
            <span>
              Without prejudice to the foregoing, the Application User Terms must contain clear and legally adequate
              disclosures about the nature of the Application’s integration with the Reapit Software (and any other
              software) and the User Data collected by the Application, as well as the Developer’s intended use of it.
            </span>
          </TermsLi>

          <TermsLi>
            <span>
              The Application User Terms should include a clear statement that the Application has not been developed by
              Reapit and that Reapit bears no responsibility or liability for the Application and does not warrant that
              it does (or will in the future) function and integrate with the Reapit Software.
            </span>
          </TermsLi>
        </TermsOl>
      </TermsLi>
      <TermsLi>
        <Subtitle>Data Protection</Subtitle>
        <TermsOl>
          <TermsLi>
            <span>The Application User Terms must comply with Data Protection Laws.</span>
          </TermsLi>

          <TermsLi>
            <span>
              Without prejudice to the generality of the paragraph 2.1, the Developer must clearly notify the end users
              of the relevant Application as to:
            </span>
            <TermsOl>
              <TermsLi>
                <span>
                  the types of personal data collected or processed by the Developer and the intended processing
                  purposes of that personal data;
                </span>
              </TermsLi>

              <TermsLi>
                <span>
                  where such Personal Data is stored (identity and location of entity maintaining the relevant
                  database); and
                </span>
              </TermsLi>

              <TermsLi>
                <span>whether any third parties are involved as sub-processors of the Personal Data.</span>
              </TermsLi>
            </TermsOl>
          </TermsLi>
        </TermsOl>
      </TermsLi>
    </TermsOl>
  </>
)
