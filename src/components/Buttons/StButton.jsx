import React from "react";
import styled from "styled-components";

const StButton = (props) => {
  const { borderColor, width, height, onClick, children } = props;
  const styles = { borderColor, width, height };

  return (
    <Button {...styles} onClick={onClick}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  border: 2px solid ${({ borderColor }) => borderColor};
  font-size: 13px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

export default StButton;
