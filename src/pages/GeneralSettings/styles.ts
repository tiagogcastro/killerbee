import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;

  form {

    main {
      width: 100%;

      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      border: 1px solid var(--white-gray);

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
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          justify-content: flex-start;
          gap: 24px;

          button {
            padding: 16px 20px;
          }

          .fieldsetProduction {
            border: 2px solid rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            font-size: 14px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            legend {
              margin: 0 8px 0 20px;
              padding: 0 8px;
            }

            select {
              width: 100%;
              padding: 0 16px 0 12px;
              font-size: 1rem;
              line-height: 2.4rem;
              text-align: left;
              border-radius: 8px;
              letter-spacing: 0.15px;
              color: var(--semi-gray);
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

      .cancel {
        color: var(--pink);
        letter-spacing: 1.25px ;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 600;
        transition: all 0.2s;
        padding: 10px 20px;
        border: 1px solid transparent;

        &:hover {
          border: 1px solid var(--pink);
          border-radius: 99px;
        }
      }
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
  }
`;

export const Category = styled.div`
  padding: 14px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--light-purple);

  &:last-child {
    border-bottom: none;
  }

  div {
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
