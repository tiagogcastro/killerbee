import { useEffect, useRef, InputHTMLAttributes, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

import {
  Container
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
  name: string;
  legendText?: string;
  type: string;
  isFieldset?: boolean;
  isPassword?: boolean;
};

export const Input = ({ name,legendText, isPassword, isFieldset, type, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputFocus, setInputFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputFocus = useCallback(() => {
    setInputFocus(true)
  }, []);

  const handleInputBlur = useCallback(() => {
    setInputFocus(false)

    // Se tiver vazio = false, se tiver preenchido = true
    setIsFilled(!!inputRef.current?.value)
  }, []);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} inputFocus={inputFocus}>
     {isFieldset ? (
      <fieldset>
        <legend>{legendText}</legend>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={name}
          ref={inputRef}
          type={passwordVisible ? 'text' : type}
          {...rest}
        />
        {type === 'password' && (
          passwordVisible ? (
            <button onClick={() => setPasswordVisible(false)}><AiFillEye /></button>
            ) : (
            <button onClick={() => setPasswordVisible(true)}><AiFillEyeInvisible /></button>
          )
        )}
      </fieldset>
    ) : (
      <span className={isPassword ? "inputNotFieldset" : ''}>
        <input
          name={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          type={passwordVisible ? 'text' : type}
          {...rest}
        />
        {type === 'password' && (
          passwordVisible ? (
            <button onClick={() => setPasswordVisible(false)}><AiFillEye /></button>
            ) : (
            <button onClick={() => setPasswordVisible(true)}><AiFillEyeInvisible /></button>
          )
        )}
      </span>
    )}
    </Container>
  );
}