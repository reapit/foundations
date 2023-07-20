import React, { FC } from 'react'
import { css, cx } from '@linaria/core'
import { elMb10 } from '@reapit/elements'

export interface AppListingDocsGraphicProps {
  isAnimated: boolean
}

export const docsSvgStyle = css`
  #app-listing-docs-one {
    animation: app-listing-docs-one__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-one__to {
    0% {
      transform: translate(69.99835px, 61.58215px);
    }
    100% {
      transform: translate(69.99835px, 58.58215px);
    }
  }

  #app-listing-docs-two {
    animation: app-listing-docs-two__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-two__to {
    0% {
      transform: translate(94.509052px, 61.58215px);
    }
    100% {
      transform: translate(94.509052px, 58.58215px);
    }
  }

  #app-listing-docs-three {
    animation: app-listing-docs-three__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-three__to {
    0% {
      transform: translate(69.649327px, 82.061558px);
    }
    100% {
      transform: translate(69.649327px, 79.061558px);
    }
  }

  #app-listing-docs-four {
    animation: app-listing-docs-four__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-four__to {
    0% {
      transform: translate(36.9986px, 80.849051px);
    }
    100% {
      transform: translate(36.9986px, 77.849051px);
    }
  }

  #app-listing-docs-five {
    animation: app-listing-docs-five__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-five__to {
    0% {
      transform: translate(102.997547px, 80.848101px);
    }
    100% {
      transform: translate(102.997547px, 77.848101px);
    }
  }

  #app-listing-docs-six {
    animation: app-listing-docs-six__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-six__to {
    0% {
      transform: translate(89.264528px, 45.746041px);
    }
    100% {
      transform: translate(87.398217px, 52.544365px);
    }
  }

  #app-listing-docs-seven {
    animation: app-listing-docs-seven__tr 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-seven__tr {
    0% {
      transform: rotate(-67.423922deg);
    }
    100% {
      transform: rotate(-103deg);
    }
  }

  #app-listing-docs-eight {
    animation: app-listing-docs-eight__ts 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-eight__ts {
    0% {
      transform: skewX(-1.018603deg) skewY(0deg) scale(1, 0.999842);
    }
    100% {
      transform: skewX(-1.018603deg) skewY(0deg) scale(1.5, 1.5);
    }
  }

  #app-listing-docs-nine {
    animation: app-listing-docs-nine__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-nine__to {
    0% {
      offset-distance: 0%;
    }
    100% {
      offset-distance: 100%;
    }
  }

  #app-listing-docs-ten {
    animation: app-listing-docs-ten__tr 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-ten__tr {
    0% {
      transform: rotate(-25.945515deg);
    }
    100% {
      transform: rotate(47deg);
    }
  }

  #app-listing-docs-eleven {
    animation: app-listing-docs-eleven__ts 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-eleven__ts {
    0% {
      transform: skewX(0.740377deg) skewY(0deg) scale(0.999999, 0.999917);
    }
    100% {
      transform: skewX(0.740377deg) skewY(0deg) scale(1.3, 1.3);
    }
  }

  #app-listing-docs-twelve {
    animation: app-listing-docs-twelve__to 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-twelve__to {
    0% {
      offset-distance: 0%;
    }
    100% {
      offset-distance: 100%;
    }
  }

  #app-listing-docs-thirteen {
    animation: app-listing-docs-thirteen__tr 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-thirteen__tr {
    0% {
      transform: rotate(18.101295deg);
    }
    100% {
      transform: rotate(-62deg);
    }
  }

  #app-listing-docs-fourteen {
    animation: app-listing-docs-fourteen__ts 300ms linear 1 normal forwards;
  }

  @keyframes app-listing-docs-fourteen__ts {
    0% {
      transform: skewX(0.486255deg) skewY(0deg) scale(1, 0.999964);
    }
    100% {
      transform: skewX(0.486255deg) skewY(0deg) scale(1.3, 1.3);
    }
  }
`

export const offsetStyleOne = css`
  offset-path: path('M37.255498,23.852076L39.921657,34.649638');
  offset-rotate: auto;
`

export const offsetStyleTwo = css`
  offset-path: path('M103.180305,18.127591L98.950013,25.52561');
  offset-rotate: auto;
`

export const AppListingDocsGraphic: FC<AppListingDocsGraphicProps> = ({ isAnimated }) => (
  <svg
    className={cx(isAnimated && docsSvgStyle, elMb10)}
    id="e7CDlwhB8m51"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140 140"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    height="140px"
  >
    <g clipPath="url(#e7CDlwhB8m525)">
      <g>
        <g id="app-listing-docs-one" transform="translate(69.99835,61.58215)">
          <path
            d="M119.024,61.4515L69.9983,44.21L20.9727,61.4515L69.9983,78.9543L119.024,61.4515Z"
            transform="translate(-69.99835,-61.58215)"
            fill="var(--info-graphic-accent-color-med)"
          />
        </g>
        <g id="app-listing-docs-two" transform="translate(94.509052,61.58215)">
          <path
            d="M119.022,61.4515L69.9961,44.21v34.7443L119.022,61.4515Z"
            transform="translate(-94.509052,-61.58215)"
            fill="var(--info-graphic-accent-color-light)"
          />
        </g>
        <g transform="translate(.000001 0)">
          <g transform="translate(.000001 0)">
            <path
              d="M88.5528,8.83691h-38.2352c-3.7098,0-6.7278,3.07939-6.7278,6.86359v82.1929c0,3.7846,3.018,6.8636,6.7278,6.8636h38.2352c3.7098,0,6.7286-3.079,6.7286-6.8636v-82.1929c0-3.7842-3.0188-6.86359-6.7286-6.86359v0Z"
              fill="var(--info-graphic-accent-color-darkest)"
            />
            <path
              d="M88.529,12.8105h-5.6823c-.5361,0-.9703.4429-.9703.9889c0,1.3117-1.0515,2.3843-2.3365,2.3843h-20.2552c-1.2859,0-2.3374-1.0726-2.3374-2.3843c0-.546-.4341-.9889-.9703-.9889h-5.6823c-1.5652,0-2.8338,1.2941-2.8338,2.8898v64.8486h43.9019v-64.8486c0-1.5957-1.2686-2.8898-2.8338-2.8898Z"
              fill="var(--info-graphic-accent-color-white)"
            />
          </g>
          <g transform="translate(0 0.000001)">
            <path
              d="M50.8828,45.4146l18.576-18.2154l18.576,18.2154v25.1546h-37.152v-25.1546Z"
              fill="var(--info-graphic-accent-color-darkest)"
            />
            <path
              d="M50.8828,45.4146l18.576-18.2154l18.576,18.2154v14.3121L50.8828,45.4146Z"
              fill="var(--info-graphic-accent-color-lightest)"
            />
            <path
              d="M88.036,70.5692h-10.8737L61.7578,34.7519L69.46,27.1992L88.036,45.4146v25.1546Z"
              fill="var(--info-graphic-accent-color-light)"
            />
            <path
              d="M88.036,45.4146v14.3121L69.46,52.6606L61.7578,34.7519L69.46,27.1992L88.036,45.4146Z"
              fill="var(--info-graphic-accent-color-bright)"
            />
          </g>
        </g>
        <g id="app-listing-docs-three" transform="translate(69.649327,82.061558)">
          <g transform="translate(-69.649326,-79.061558)">
            <path
              d="M70.011522,75.96449c-.190118.78125-.061612,3.42125,0,5.28l3.903961-3.524822-3.903961-1.755178Z"
              transform="translate(.000001 0.000003)"
              fill="var(--info-graphic-accent-color-darkest)"
              strokeWidth="0.28"
            />
            <path
              d="M69.992961,76.053166l-.017109,5.286723l3.95674-3.620221-3.939631-1.666502Z"
              transform="matrix(-1.168966 0 0-1.168966 151.807857 171.062202)"
              fill="var(--info-graphic-accent-color-dark)"
              strokeWidth="0.28"
            />
          </g>
        </g>
        <path
          d="M69.9983,79.0023L20.9727,61.4512v63.1168l49.0256,15.777v-61.3427Z"
          fill="var(--info-graphic-accent-color-dark)"
        />
        <path
          d="M119.022,124.568v-63.1168L69.9961,79.0023v61.3427l49.0259-15.777Z"
          fill="var(--info-graphic-accent-color-darkest)"
        />
        <g id="app-listing-docs-four" transform="translate(36.9986,80.849051)">
          <path
            d="M20.9715,61.4521L4,81.8288L53.9483,100.246L69.9972,78.955L20.9715,61.4521Z"
            transform="translate(-36.9986,-80.849051)"
            fill="var(--info-graphic-accent-color-lightest)"
          />
        </g>
        <g id="app-listing-docs-five" transform="translate(102.997547,80.848101)">
          <path
            d="M119.022,61.4512l16.977,20.3766L86.0506,100.245L69.9961,78.954L119.022,61.4512Z"
            transform="translate(-102.997547,-80.848101)"
            fill="var(--info-graphic-accent-color-med)"
          />
        </g>
        <g id="app-listing-docs-six" transform="translate(89.264528,45.746041)">
          <g id="app-listing-docs-seven" transform="rotate(-67.423922)">
            <g id="app-listing-docs-eight" transform="skewX(-1.018603) skewY(0) scale(1,0.999842)">
              <rect
                width="12.6821"
                height="12.724"
                rx="3"
                ry="3"
                transform="translate(-6.34105,-6.362)"
                fill="#ffe5c7"
              />
            </g>
          </g>
        </g>
        <g id="app-listing-docs-nine" className={offsetStyleOne}>
          <g id="app-listing-docs-ten" transform="rotate(-25.945515)">
            <g id="app-listing-docs-eleven" transform="skewX(0.740377) skewY(0) scale(0.999999,0.999917)">
              <rect
                width="25.2093"
                height="25.3778"
                rx="5"
                ry="5"
                transform="translate(-12.60465,-12.6889)"
                fill="var(--info-graphic-accent-color-bright)"
              />
            </g>
          </g>
        </g>
        <g id="app-listing-docs-twelve" className={offsetStyleTwo}>
          <g id="app-listing-docs-thirteen" transform="rotate(18.101295)">
            <g id="app-listing-docs-fourteen" transform="skewX(0.486255) skewY(0) scale(1,0.999964)">
              <rect
                width="9.83494"
                height="9.95171"
                rx="2"
                ry="2"
                transform="translate(-4.91747,-4.975855)"
                fill="#ffe5c7"
              />
            </g>
          </g>
        </g>
      </g>
      <clipPath id="e7CDlwhB8m525">
        <rect width="140" height="140" rx="0" ry="0" fill="var(--info-graphic-accent-color-white)" />
      </clipPath>
    </g>
  </svg>
)
