import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  padding: 16px 48px;
  background: var(--purple);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    color: var(--full-white);

    button {
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: var(--full-white);
        width: 20px;
        height: 20px
      }
    }

    h2 {
      font-size: 18px;
      letter-spacing: 0.4px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 700;
    }

    a {
      color: var(--white-opacity);
      transition: all 0.2s;
      border-bottom: 1px solid transparent;

      font-size: 16px;
      letter-spacing: 0.2px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;

      &:hover {
        border-bottom: 1px solid var(--white-opacity);
      }
    }
  }
`;

export const Menu = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 55px;
  z-index: 1000;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  transition: left 2s;
  
  aside {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.38)
  }
`;

export const MenuContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: #363740;
  height: 100%;
  padding-top: 48px;
  max-width: 300px;
  width: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 48px;

    span {
      background: var(--purple);
      color: var(--full-white);
      padding: 6px 10px;

      border-radius: 50%;

      font-size: 12px;
      letter-spacing: 0.4px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      color: var(--white-opacity);
    }

    h2 {
      font-size: 18px;
      letter-spacing: 0.4px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 700;
      color: var(--white-opacity);
    }
  }

  section {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;

    a {
      padding: 16px 32px;
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #a4a6b3;
      transition: all 0.2s;
      border-left: 2px solid #363740;
      font-size: 16px;

      span {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 16px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.100);
        border-left: 2px solid var(--full-white);
        color: var(--full-white);

        svg {
          color: var(--full-white);
        }
      }
    }
  }

  section:last-child {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #595a5c;

    button {
      padding: 16px 32px;
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #a4a6b3;
      transition: all 0.2s;
      border-left: 2px solid #363740;
      background: none;
      font-size: 16px;

      span {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.100);
        border-left: 2px solid var(--full-white);
        color: var(--full-white);

        svg {
          color: var(--full-white);
        }
      }
    }
  }
`;