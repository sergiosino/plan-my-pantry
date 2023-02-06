import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const SvgComponent = (props) => (
  <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' {...props}>
    <Circle
      fill='#000000'
      cx={176}
      cy={416}
      r={16}
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32
      }}
    />
    <Circle
      cx={400}
      cy={416}
      r={16}
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32
      }}
    />
    <Path
      d='M48 80h64l48 272h256'
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32
      }}
    />
    <Path
      d='M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128'
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 32
      }}
    />
  </Svg>
)

export default SvgComponent
