import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StContainer>
      <h4>1조 화이팅</h4>
      <h4>REACT</h4>
    </StContainer>
  );
};
export default Header;

const StContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0px 20px;
`;
