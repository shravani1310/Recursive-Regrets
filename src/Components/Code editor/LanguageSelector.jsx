import React, { useState } from "react";
import styled from "styled-components";
import { LANGUAGE_VERSIONS } from "./src2/constants";

/* Styled Components */
const Container = styled.div`
  margin-left: 8px;
  margin-bottom: 16px;
`;

const Label = styled.p`
  margin-bottom: 8px;
  font-size: 1.125rem; /* lg equivalent */
`;

const MenuButton = styled.button`
  padding: 8px 16px;
  background-color: #2d3748; /* gray.900 equivalent */
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #4a5568; /* gray.700 equivalent */
  }
`;

const MenuList = styled.div`
  background-color: #110c1b;
  position: absolute;
  margin-top: 8px;
  display: ${props => (props.isOpen ? "block" : "none")};
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  color: ${props => (props.isActive ? "#3182CE" : "#fff")}; /* blue.400 equivalent */
  background-color: ${props => (props.isActive ? "#1a202c" : "transparent")}; /* gray.900 equivalent */
  cursor: pointer;
  &:hover {
    color: #3182CE;
    background-color: #1a202c;
  }
`;

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <Container>
      <Label>Language:</Label>
      <div style={{ position: "relative" }}>
        <MenuButton onClick={toggleMenu}>{language}</MenuButton>
        <MenuList isOpen={isOpen}>
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
            <MenuItem
              key={lang}
              isActive={lang === language}
              onClick={() => selectLanguage(lang)}
            >
              {lang}
              &nbsp;
              <span style={{ color: "#718096", fontSize: "0.875rem" }}>
                ({version})
              </span>
            </MenuItem>
          ))}
        </MenuList>
      </div>
    </Container>
  );
};

export default LanguageSelector;