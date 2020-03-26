import React from "react";
import { Text } from "react-native";

const StyledText = props => {
  if (props.bible) {
    return (
      <Text
        {...props}
        style={[{ fontFamily: "bible", color: "#3E4E5B" }, props.style]}
      />
    );
  }
  if (props.bibleItalic) {
    return (
      <Text
        {...props}
        style={[{ fontFamily: "bible-italic", color: "#3E4E5B" }, props.style]}
      />
    );
  }
  if (props.menu) {
    return (
      <Text
        {...props}
        style={[
          { fontFamily: "regular", color: "#3E4E5B", fontSize: 13 },
          props.style
        ]}
      />
    );
  }
  return (
    <Text
      {...props}
      style={[{ fontFamily: "regular", color: "#3E4E5B" }, props.style]}
    />
  );
};

const StyledHeader = props => {
  if (props.light) {
    return (
      <Text
        {...props}
        style={[
          { fontFamily: "light", color: "#000" },
          props.style
        ]}
      />
    );
  }
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "bold", color: "#000" },
        props.style
      ]}
    />
  );
};

const StyledSubtitle = props => {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "regular", color: "#465867" }, props.style]}
    />
  );
};

const StyledTextInverse = props => {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "regular", color: "#FFFFFF" }, props.style]}
    />
  );
};

const StyledHeaderInverse = props => {
  return (
    <Text
      h4
      {...props}
      style={[
        { fontFamily: "bold", color: "#FFFFFF", fontSize: 25 },
        props.style
      ]}
    />
  );
};

const StyledSubtitleInverse = props => {
  return (
    <Text
      {...props}
      h6
      style={[{ fontFamily: "regular", color: "#FFFFFF" }, props.style]}
    />
  );
};

export {
  StyledHeader,
  StyledText,
  StyledSubtitle,
  StyledHeaderInverse,
  StyledSubtitleInverse,
  StyledTextInverse
};
