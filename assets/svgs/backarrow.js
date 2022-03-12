import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = (props) => (
  <Svg
    width={43}
    height={43}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G opacity={0.7}>
      <G filter="url(#a)">
        <Rect
          width={33}
          height={33}
          rx={16.5}
          transform="matrix(-1 0 0 1 33 0)"
          fill="#E0F1FE"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.125 11.252s-4.501 4.376-4.545 4.412a.974.974 0 0 0 .008 1.502c.048.039 4.401 4.507 4.401 4.507a.999.999 0 0 0 1.406.018.984.984 0 0 0 .018-1.397l-2.803-2.862 9.606.126a.994.994 0 0 0 1.012-.975.994.994 0 0 0-.986-1.002l-9.607-.125 2.878-2.788a.984.984 0 0 0 .018-1.397.999.999 0 0 0-1.406-.019Z"
        fill="#0130B0"
      />
    </G>
    <Defs></Defs>
  </Svg>
)

export default SvgComponent
