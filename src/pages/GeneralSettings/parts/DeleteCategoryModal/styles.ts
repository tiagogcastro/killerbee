import styled from 'styled-components';

export const DeleteCategoryTag = styled.div`
  background: var(--full-white);

  max-width: 720px;
  width: 100%;

  border-radius: 8px;

  box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.12), 0 16px 24px 0 rgba(0, 0, 0, 0.14);

  header {
    background: var(--purple);
    border-radius: 8px 8px 0 0;
    padding: 20px 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 14px;
      font-weight: 600;
      font-family: 'IBM Plex Sans', sans-serif;
      letter-spacing: 1.25px;
      color: var(--full-white);
    }

    button {
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: var(--full-white);
        width: 18px;
        height: 18px;
      }
    }
  }

  form {
    width: 100%;
    padding: 0 40px;
    margin-top: 32px;

    p {
      text-align: center;
      margin: 87px auto 38px;
      max-width: 532px;

      color: var(--semi-gray);
      letter-spacing: 0.15px;
      line-height: 24px;
      font-size: 20px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;

      strong{
        font-family: 'IBM Plex Sans', sans-serif;
        color: initial;
      }
    }

    footer {
      width: 100%;
      padding: 30px 20px 40px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        svg {
          width: 24px;
          height: 24px;
          path {
          }
        }
      }
    }
  }
`;