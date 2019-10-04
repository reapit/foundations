import * as React from 'react'

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="28.5 30 40 49" width="40px" height="49px">
    <title>Reapit_House_RGB</title>
    <g id="House">
      <polygon style={{ fill: '#262f69' }} points="57.03 78.42 48.72 58.21 28.54 49.81 28.54 78.42 57.03 78.42" />
      <polygon
        style={{ fill: '#0061a8' }}
        points="68.93 78.42 68.93 67.29 68.93 66.57 48.7 58.22 57.03 78.42 68.93 78.42"
      />
      <polygon style={{ fill: '#7bc9eb' }} points="28.54 49.81 48.7 58.22 40.38 38.05 28.54 49.81" />
      <polygon
        style={{ fill: '#23a4de' }}
        points="68.93 49.81 48.76 29.66 45.63 32.78 40.37 38.06 48.7 58.22 68.93 66.57 68.93 49.81"
      />
    </g>
  </svg>
)

export default Logo
