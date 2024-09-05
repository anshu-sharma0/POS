import Svg, { Path, SvgProps } from "react-native-svg";

const MinusIcon = (props: SvgProps) => {
  return (
    <Svg
      stroke={props.stroke || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M5 12h14" />
    </Svg>
  );
};

export default MinusIcon;
