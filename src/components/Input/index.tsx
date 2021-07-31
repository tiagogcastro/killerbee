import { useEffect, useRef, InputHTMLAttributes, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import { cep, currency } from '../../utils/masks';

import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

import {
  Container,
  Error
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
  name: string;
  legendText?: string;
  type: string;
  isFieldset?: boolean;
  isPassword?: boolean;
  errorMessage?: string;

  mask?: 'cep' | 'currency';
  maskPrefix?: string;
  maskStyle?: boolean;
};

export const Input = ({ name, legendText, isPassword, isFieldset, errorMessage, type, mask, maskPrefix, maskStyle, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  const [inputFocus, setInputFocus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputFocus = useCallback(() => {
    setInputFocus(true)
  }, []);

  const handleInputBlur = useCallback(() => {
    setInputFocus(false)
  }, []);

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
    });

  }, [fieldName, registerField]);
  
  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if(mask === 'cep') {
      cep(e);
    }

    if(mask === 'currency') {
      currency(e);
    }
  }, [mask]);

  return (
    <Container isMask={maskStyle} isError={!!error} inputFocus={inputFocus}>
     {isFieldset ? (
      <>
      <fieldset>
        <legend>{legendText}</legend>
        {maskPrefix && <p>{maskPrefix}</p>}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          name={name}
          ref={inputRef}
          type={passwordVisible ? 'text' : type}
          {...rest}

          onKeyUp={handleKeyUp}
        />
        {type === 'password' && (
          passwordVisible ? (
            <button type="button" onClick={() => setPasswordVisible(false)}><AiFillEye /></button>
            ) : (
            <button type="button" onClick={() => setPasswordVisible(true)}><AiFillEyeInvisible /></button>
          )
        )}
      </fieldset>
      {error && (
        <Error>{error}</Error>
      )}
      </>
    ) : (
      <>
      <span className={isPassword ? "inputNotFieldset" : ''}>
        {maskPrefix && <p>{maskPrefix}</p>}
        <input
          name={name}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          type={passwordVisible ? 'text' : type}
          {...rest}

          onKeyUp={handleKeyUp}
        />
        {type === 'password' && (
          passwordVisible ? (
            <button type="button" onClick={() => setPasswordVisible(false)}><AiFillEye /></button>
            ) : (
            <button type="button" onClick={() => setPasswordVisible(true)}><AiFillEyeInvisible /></button>
          )
        )}
      </span>
      {error && (
        <Error>{error}</Error>
      )}
      </>
    )}
    </Container>
  );
}