import React from "react";
import SvgUri from "expo-svg-uri";
import propTypes from "prop-types";
import Colors from "../constants/Colors";

function SVGIcon({ source, color, noFill, ...otherProps }) {
  const fill = noFill ? {} : { fill: color || Colors.tintColor };
  return (
    <SvgUri
      width="33"
      height="33"
      svgXmlData={source}
      {...fill}
      {...otherProps}
    />
  );
}

SVGIcon.propTypes = {
  source: propTypes.string.isRequired
};

SVGIcon.defaultProps = {
  noFill: false
};

export default SVGIcon;
