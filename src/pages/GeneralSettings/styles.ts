import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 64px auto;

  form {

    main {
      width: 100%;

      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      border: 1px solid var(--white-gray);
      background: var(--full-white);
      border-radius: 4px;

      > header {
        width: 100%;
        height: 78px;
        padding: 24px 0 24px 32px;
        border-bottom: 1px solid var(--white-gray);
        display: flex;
        align-items: center;
        justify-content: flex-start;

        svg {
          width: 24px;
          height: 24px;
          margin-right: 4px;
          path {
            color: var(--white-gray);
          }
        }

        strong {
          font-size: 18px;
          text-align: left;
          line-height: 30px;
          letter-spacing: 0.15px;
          color: var(--semi-gray);
        }
      }

      > div {
        padding: 24px 0 24px 32px;
        max-width: 680px;
        width: 100%;

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 24px;
          max-width: 630px;

          > div {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 12px;
            width: 100%;

          }

          button {
            max-width: 200px;
            padding: 16px 20px;
          }

          > fieldset {
            border: 2px solid rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            font-size: 14px;
            height: 64px;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
                    
            legend {
              margin: 0 8px 0 12px;
              padding: 0 8px;
            }

            span {
              width: 100%;
              padding: 0 16px 0 18px;
              font-size: 1rem;
              line-height: 2.4rem;
              text-align: left;
              border-radius: 8px;
              letter-spacing: 0.15px;
              color: var(--semi-gray);
              background: transparent;
            }
          }
        }
      }
      
      > section {
        width: 100%;
        > header {
          padding: 24px 0 24px 32px;
          max-width: 680px;
          
          display: flex;        
          align-items: center;
          justify-content: flex-start;
          gap: 16px;

          h1 {
            font-size: 20px;
            text-align: left;
            line-height: 24px;
            letter-spacing: 0.15px;
            color: var(--black);
          }

          button {
            padding: 8px 12px;
            border-radius: 4px;
            line-height: 16px;
            letter-spacing: 1.25px;
            font-size: 14px;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;

            svg {
              width: 16px;
              height: 16px;
              path {
                color: var(--full-white);
              }
            }
          }
        }
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 32px;
    }
  }
`;

export const Categories = styled.div`
  width: 100%;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    padding: 0 30px 0 30px;
    height: 52px;
    background: #f4f2ff;
    border-top: 1px solid var(--light-purple);
    border-bottom: 1px solid var(--light-purple);

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 48px;

      span {
        text-align: left;
        padding-left: 12px;
        letter-spacing: 0.6px;
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
      }

      button {
        cursor: pointer;
        background: none;
        transition: filter 0.2s;

        &:hover {
          filter: brightness(90%);
        }
        svg {
          height: 18px;
          width: 18px;
          path {
            color: var(--purple);
          }
        }
      }
    }

    div:last-child {
      margin-right: 64px;
    }
  }
`;

export const Category = styled.div`
  position: relative;

  padding: 14px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--light-purple);

  &:last-child {
    border-bottom: none;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 48px;

    span {
      letter-spacing: 0.6px;
      color: var(--semi-gray);
      font-size: 12px;
      font-weight: 600;
      background: rgba(33, 33, 33, 0.08);
      border-radius: 99px;
      padding: 6px 12px;
      font-family: 'Inter', sans-serif;

      button {
        display: none;
        margin-left: 4px;
        border-radius: 50%;
        padding: 0 4px;
        background-color: rgba(0, 0, 0, 0.38);
        color: var(--full-white);

        &:hover {
          filter: brightness(90%);

          svg {
            path {
              color: var(--semi-white);
            }
          }
        }

        svg {
          height: 10px;
          width: 10px;

          path {
            color: var(--full-white);
          }
        }
      }

      &:hover {
        button {
          display: initial;
        }
      }
    }

    .spanPrice {
      letter-spacing: initial;
      background: none;
      color: var(--dark-purple);
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      padding: 0;
    }

    button {
      cursor: pointer;
      background: none;
      transition: all 0.2s;

      &:hover {
        filter: brightness(90%);

        svg {
          path {
            color: var(--purple);
          }
        }
      }
      svg {
        height: 18px;
        width: 18px;
        path {
          color: var(--purple-glass);
        }
      }
    }
  }
`;

export const CategoryMiniModal = styled.div`
  max-width: 150px;
  width: 100%;

  position: absolute;
  right: -130px;
  top: 16px;

  background: var(--full-white);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 5px 5px 4px;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  > button {
    padding: 6px 8px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    width: 100%;
    text-align: left;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f2f0f9;
    }
  }

  > button.delete {
    color: #d30000;
  }

  p {
    border-top: 2px solid #f2f0f9;
    width: 100%;
    height: 2px;
    margin: 4px 0;
  }

  i {
    position: absolute;
    top: -12px;
    right: -12px;
    z-index: 100;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: #f9f9f9;
    padding: 6.6px 6.5px 6.6px 6.6px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);

    button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;


type ErrorProps = {
  noPadding?: boolean;
};

export const Error = styled.aside<ErrorProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0 32px;
  
  ${props => props.noPadding && css`
    padding: 0;
  `}

  p {
    color: var(--pink);
  }
`;

export const NotUserConfiguration = styled.div`
  padding: 24px 0 24px 32px;

  display: flex;
  align-items: center;
  justify-content:center;

  p {
    max-width: 360px;
    
    color: var(--gray);
    letter-spacing: 0.15px;
    line-height: 24px;
    font-size: 20px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
  }

  img {
    max-width: 360px;
  }
`;