import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    border: none;
    text-decoration: none;
    list-style: none;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  :root {
    --purple: #6200ee;
    --dark-purple: #25213b;
    --light-purple: #d9d5ec;
    --pink: #ef0078;
    --purple-glass: #8b83ba;
    --semi-white: #f9f9f9;
    --full-white: #FFFFFF;
    --black: #000000;
    --semi-gray: rgba(0, 0, 0, 0.87);
    --gray: rgba(0, 0, 0, 0.6);
    --white-gray: rgba(0, 0, 0, 0.12);
  }
  #root {
    width: 100%;
    height: 100vh;
  }
  body {
    background: var(--semi-white);
    width: 100%;
    height: 100vh;
  }

  button {
    cursor: pointer;
  }
`

export const LabelInput = styled.label`
  display: block;
  position: relative;
  padding-left: 20px;
  font-size: 12px;
  color: #424242;
  font-weight: 400;
  top: -7px;
  cursor: pointer;

  .checkmark{
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    padding: 4px;
    background-color: var(--full-white);
    border: 1px solid gray;
    border-radius: 2px;
  }
  
  .checkmark::after{
    display: none;
    content: '';
    position: absolute;
  }

  .checkmark::after{
    content: '';
    left: 4px;
    top: 0px;
    width: 5px;
    height: 9px;
    transform: rotate(45deg);
    border-right: 3px solid #fff;
    border-bottom: 3px solid #fff;
  }

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;

    &:checked ~ .checkmark{
      background-color: var(--purple);
      border: none;
    }

    &:checked ~ .checkmark::after{
      display: block;
    }
  }
`;