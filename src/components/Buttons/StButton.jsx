import React from "react";
import styled from "styled-components";

const StButton = (props) => {
  const { borderColor, width, height, onClick, children, borderRadius } = props;
  const styles = { borderRadius, borderColor, width, height };

  return (
    <Button {...styles} onClick={onClick}>
      {children}
    </Button>
  );
};
StButton.default = {
  borderRadius: "10px",
};

const Button = styled.button`
  border: 2px solid
    ${(props) => {
      console.log(props);
      return props.borderColor;
    }};
  font-size: 13px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: white;
  cursor: pointer;
`;

export default StButton;
