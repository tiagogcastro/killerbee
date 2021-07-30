import styled from 'styled-components';

export const ButtonTag = styled.button`
  background: var(--purple);
  color: var(--full-white);
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 2px;
  font-weight: 600;
  border-radius: 99px;
  transition: filter 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(90%);
  }
`;