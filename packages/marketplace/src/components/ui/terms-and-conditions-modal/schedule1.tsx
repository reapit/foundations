import React from 'react'
import { H4, H6 } from '@reapit/elements'
import termAndConditionModalStyles from '@/styles/blocks/term-and-conditions-modal.scss?mod'
import schedule1Styles from '@/styles/blocks/schedule1.scss?mod'

export const Schedule1 = () => (
  <div>
    <H4 className={termAndConditionModalStyles['title']}>SCHEDULE 1 – APPLICATION USER TERM PRINCIPLES</H4>
    <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}>
      <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
        <H6>GENERAL</H6>
        <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}>
          <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
            <span>
              The Developer must not include any terms in the Application User Terms, which conflict with the
              Developer’s obligations pursuant to this Agreement.
            </span>
            <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
          </li>

          <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
            <span>The Developer must ensure that the Application:</span>
            <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}>
              <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
                <span>
                  should access only the minimum data fields which that Application needs to work properly; and
                </span>
                <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
              </li>

              <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
                <span>
                  ensure any data is collected, processed, transmitted, maintained and used in accordance with the
                  Application User Terms, all applicable laws and reasonable measures that protect the privacy and
                  security of the relevant end user (including at a minimum those set out below at Paragraph 2).
                </span>
                <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
              </li>
            </ol>
          </li>

          <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
            <span>
              Without prejudice to the foregoing, the Application User Terms must contain clear and legally adequate
              disclosures about the nature of the Application’s integration with the Reapit Software (and any other
              software) and the User Data collected by the Application, as well as the Developer’s intended use of it.
            </span>
            <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
          </li>

          <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
            <span>
              The Application User Terms should include a clear statement that the Application has not been developed by
              Reapit and that Reapit bears no responsibility or liability for the Application and does not warrant that
              it does (or will in the future) function and integrate with the Reapit Software.
            </span>
            <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
          </li>
        </ol>
      </li>

      <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
        <H6>DATA PROTECTION</H6>
        <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}>
          <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
            <span>The Application User Terms must comply with Data Protection Laws.</span>
            <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
          </li>

          <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
            <span>
              Without prejudice to the generality of the paragraph 2.1, the Developer must clearly notify the end users
              of the relevant Application as to:
            </span>
            <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}>
              <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
                <span>
                  the types of personal data collected or processed by the Developer and the intended processing
                  purposes of that personal data;
                </span>
                <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
              </li>

              <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
                <span>
                  where such Personal Data is stored (identity and location of entity maintaining the relevant
                  database); and
                </span>
                <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
              </li>

              <li className={`${termAndConditionModalStyles['child']} ${schedule1Styles['child']}`}>
                <span>whether any third parties are involved as sub-processors of the Personal Data.</span>
                <ol className={`${schedule1Styles['parent']} ${termAndConditionModalStyles['parent']}`}></ol>
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
    ;
  </div>
)
