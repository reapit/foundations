import React from 'react'
import { H5 } from '@reapit/elements'
import AgencyCloud1 from '@/assets/images/developer-desktop/agency-cloud-1.png'
import AgencyCloud2 from '@/assets/images/developer-desktop/agency-cloud-2.png'
import VideoClip from '@/assets/images/developer-desktop/video-clip.png'

export const DeveloperDesktopContentPartOne: React.FC = () => {
  return (
    <>
      <H5 className="mt-4 mb-1">What is Reapit’s Agency Cloud Desktop CRM?</H5>
      <p>
        Reapit’s Agency Cloud solution offers estate agencies a comprehensive range of market leading agency products,
        with powerful features that will help an agency grow whilst improving overall efficiency.
      </p>
      <H5 className="mt-4 mb-1">What is the Desktop API?</H5>
      <p>
        Applications that are built on our Foundations Platform are able to communicate with Reapit&#39;s Agency Cloud
        CRM system. Using a well-defined API, you are able to trigger a wide variety of actions in our award-winning
        desktop application to augment your own applications and build a rich integration between systems.
      </p>
      <H5 className="mt-4 mb-1">How does it work?</H5>
      <p>
        Depending on what screens you want to launch and how you want to interact with Agency Cloud, you are able to use
        a custom URL scheme which when triggered, Agency Cloud will interpret that action and perform the corresponding
        action.
      </p>
      <p>For example, if you wanted to load a property record from your app you would follow the following format:</p>
      <div className="mt-2 has-text-left">
        <img src={AgencyCloud1} />
      </div>
      <p>
        Another example would be if you wanted to load a property search with specific parameters, the URL scheme would
        look something like this:
      </p>
      <div className="mt-2 has-text-left">
        <img src={AgencyCloud2} />
      </div>
      <p>
        For more information on URL Schemes please visit the documentation&nbsp;
        <a target="_blank" rel="noreferrer" href={window.reapit.config.urlSchemeUrl}>
          here
        </a>
      </p>
      <H5 className="mt-4 mb-1">Agency Cloud Interaction API</H5>
      <p>
        Not only can Applications built on the Foundations Platform trigger events in the Agency Cloud CRM system, but
        installed apps can also be associated with common actions in Agency Cloud to replace the default behaviour.
      </p>
      <p>
        The most common way that this will manifest itself is by replacing a screen in Agency Cloud with an application.
        For example if you want to use an App to manage all of your AML and ID checking then you can associate the app
        with this action in Agency Cloud and every time you click to launch the ID check screen, the associated App will
        be presented instead.
      </p>
      <p>
        All apps should be able to be launched from the Installed Apps screen and be ran standalone without the need to
        be linked to an action. They will just be hosted in the marketplace and launched in Agency Cloud – for example
        the Geo Diary application.
      </p>
      <H5 className="mt-4 mb-1">Desktop Integration Types</H5>
      <p>
        To be able to associate an application with an action in Agency Cloud the application will need to be given a
        desktop type. This will be required so that Agency Cloud can be confident of the way the application will behave
        and that the application is agreeing to accept certain parameters when launched. These parameters will be
        available inside the <b>window.__REAPIT_MARKETPLACE_GLOBALS__</b> javascript object which is used to identify
        that a page is in <i>Desktop</i> mode.
      </p>
      <p>
        We currently support several application types and we are continuing to build as apps are developed. To show you
        an example, you can view the video below. It demonstrates an application that was built with a Desktop Type of
        &#39;Property&#39;, this means that the application will be available whenever a user interacts with a property:
      </p>
      <div className="mt-2 mb-2 has-text-centered">
        <a target="_blank" rel="noreferrer" href="https://youtu.be/aWYmxpWf6y0">
          <img src={VideoClip} />
        </a>
      </div>
      <p>
        More information on &#39;Desktop Integration Types&#39;, please visit the documentation&nbsp;
        <a target="_blank" rel="noreferrer" href={window.reapit.config.apiDocDesktop}>
          here
        </a>
      </p>
      <H5 className="mt-4 mb-1">Developer Edition </H5>
      <p>
        We understand the need to be able to test your application end to end and therefore have provided a Developer
        Edition of Agency Cloud for you to download and test with Sandbox data. The application is licenced per
        user/developer of your organisation and you will require a Windows machine to install it.
      </p>
      <p>
        The application is licenced per user/developer of your organisation and you will require a&nbsp;
        <b>Windows machine to install it.</b>
      </p>
      <p className="mb-2">
        During the Beta phase, there will be no charge for the Developer Edition licence. However, you will still be
        required to confirm the subscription to proceed. If you would like further information on Agency Cloud, please
        click <a href="#">here</a>.
      </p>
    </>
  )
}

export const DeveloperDesktopContentPartTwo: React.FC = () => {
  return (
    <>
      <H5 className="mt-4 mb-1">Support</H5>
      <p>
        If you should need support with the Developer Edition or perhaps have a question regarding desktop types or URL
        schemes, please first visit our desktop Milestone. You will be able to view and search any issues or requests
        that have been raised. If you cannot find what you are looking for, please raise a&nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/reapit/foundations/issues/new?assignees=&labels=feature-request%2C+needs-triage%2C+developer-edition&template=feature_request.md&title="
        >
          feature request
        </a>
        &nbsp;or&nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/reapit/foundations/issues/new?assignees=&labels=bug%2C+needs-triage%2C+developer-edition&template=bug_report.md&title="
        >
          report a bug.
        </a>
      </p>
    </>
  )
}
