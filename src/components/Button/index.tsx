import { ButtonHTMLAttributes } from 'react';

import { ButtonTag } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({children, ...rest}: ButtonProps) {
  return (
    <ButtonTag type="button" {...rest}>{children}</ButtonTag>
  );
}