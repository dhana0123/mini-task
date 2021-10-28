import React from "react";
import styled from "styled-components";

const NavBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  height: 4rem;
  background: white;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.2);
`;
const Navigation = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.h2``;

function Header() {
  return (
    <NavBar>
      <Navigation>
        <Logo>TaskManager</Logo>
      </Navigation>
    </NavBar>
  );
}

export default Header;
