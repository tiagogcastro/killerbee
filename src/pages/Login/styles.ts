import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: 360px;
  margin: 0 auto;
  width: 100%;
  padding: 30px 30px 80px 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: var(--full-white);
  border: 1px solid var(--white-gray);
  border-radius: 8px;

  img {
    width: 300px;
    height: 230px;
    object-fit: contain;
  }

  form {
    margin-top: 32px;
    width: 100%;

    > div {
      margin-bottom: 24px;
    }

    .error {
      color: var(--pink);
      display: block;
      font-size: 12px;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 32px;

      >div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        p {
          font-size: 12px;
          letter-spacing: 0.4px;
          text-align: left;
        }

        /* div {
          width: 18px;
          height: 18px;
        } */
      }

      button {
        background: var(--purple);
        color: var(--full-white);
        text-align: center;
        padding: 10px 20px;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 2px;
        font-weight: 600;
        border-radius: 6px;
        transition: filter 0.2s;
        cursor: pointer;

        &:hover {
          filter: brightness(90%);
        }
      }
    }
  }
`;