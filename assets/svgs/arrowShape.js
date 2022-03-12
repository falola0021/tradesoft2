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
      d="M9.172 10.71s4.444-4.433 4.486-4.47a.974.974 0 0 0-.027-1.502C13.583 4.7 9.171.29 9.171.29a.998.998 0 0 0-1.406 0 .984.984 0 0 0 0 1.398l2.842 2.825H.998C.447 4.512 0 4.954 0 5.5s.447.988 1 .988h9.607L7.764 9.313a.984.984 0 0 0 0 1.397.998.998 0 0 0 1.407 0"
      fill="#2E3A59"
      fillOpacity={0.7}
    />
  </Svg>
)

export default SvgComponent
