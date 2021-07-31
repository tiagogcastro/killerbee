import styled, { css } from 'styled-components';

export const Container = styled.header`
  width: 100%;
  padding: 16px 48px;
  background: var(--purple);
`;

type ContentProps = {
  dropdown: boolean;
}

export const Content = styled.div<ContentProps>`
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
      position: relative;

      svg {
        color: var(--full-white);
        width: 20px;
        height: 20px
      }

      .dropdown-menu {
        display: none;
        position: absolute;
        background-color: var(--full-white);
        min-width: 150px;
        top: 26px;
        right: -32px;
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
        z-index: 1;
        border-radius: 8px;

        button {
          background: none;
        }
        
        a, button {
          color: var(--dark-purple);
          padding: 12px 10px;
          font-size: 14px;
          width: 100%;
          text-align: left;
          text-decoration: none;
          display: block;
          border-radius: 8px;

          font-weight: 500;
          font-family: 'Inter', sans-serif;

          transition: all 0.2s;
          &:hover {
            background-color: #f2f0f9;
          }
        }

        button {
          color: #d30000;
          border-top: 2px solid #f2f0f9;
        }
      }
      ${props => props.dropdown && css`
        .dropdown-menu {
          display: block;
        }
      `}
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
    gap: 2px;
    margin-bottom: 48px;

    img {
      padding: 6px 10px;
      width: 62px;
      height: 48px;

      border-radius: 50%;
    }

    h2 {
      font-size: 18px;
      letter-spacing: 0.4px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 700;
      color: #a4a6b3;
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