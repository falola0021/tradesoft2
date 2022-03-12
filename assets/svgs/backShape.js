import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={14}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.828.29S.384 4.722.342 4.76a.974.974 0 0 0 .027 1.502c.048.038 4.46 4.449 4.46 4.449a.998.998 0 0 0 1.406 0 .984.984 0 0 0 0-1.398L3.393 6.488h9.608c.552 0 .999-.442.999-.988a.994.994 0 0 0-1-.988H3.394l2.842-2.825a.984.984 0 0 0 0-1.398.998.998 0 0 0-1.407 0Z"
      fill="#2E3A59"
      fillOpacity={0.7}
    />
  </Svg>
)

export default SvgComponent
