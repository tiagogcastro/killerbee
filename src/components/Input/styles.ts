import styled, { css } from 'styled-components';

type ContainerProps = {
  inputFocus: boolean;
  isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
  fieldset {
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    font-size: 14px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    ${props => props.inputFocus && css`
      border: 1px solid var(--purple);

      legend {
        color: var(--purple);
      }
    `}

    ${props => props.isFilled && css`
      border: 1px solid var(--purple);

      legend {
        color: var(--purple);
      }
    `}

    legend {
      margin: 0 8px 0 20px;
      padding: 0 8px;
    }
  
    button {
      background: none;
      cursor: pointer;
    }
  }

  input {
    width: 100%;
    padding: 0 16px 0 12px;
    font-size: 1rem;
    line-height: 2.4rem;
    text-align: left;
    border-radius: 8px;
    letter-spacing: 0.15px;
    color: var(--semi-gray);
    } 

  .inputNotFieldset {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 4px 0;

    border: 1px solid rgba(0, 0, 0, 0.08);

    ${props => props.inputFocus && css`
      border: 1px solid var(--purple);
    `}

    ${props => props.isFilled && css`
      border: 1px solid var(--purple);
    `}


    button {
      margin-right: 8px;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 24px;
        height: 24px;
      
        path {
          color: var(--semi-gray);
        }
      }
    }
  }
`;