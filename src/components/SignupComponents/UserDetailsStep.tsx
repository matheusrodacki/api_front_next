// UserDetailsStep.tsx
import React, { useState } from 'react';

interface UserDetailsProps {
  data: {
    email: string;
    password: string;
  };
  updateData: (data: any) => void;
  nextStep: () => void;
  setErrorMessage: (msg: string) => void;
}

const UserDetailsStep: React.FC<UserDetailsProps> = ({
  data,
  updateData,
  nextStep,
  setErrorMessage,
}) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let valid = true;
    if (!data.email) {
      setEmailError('O email é obrigatório.');
      valid = false;
    } else if (!emailRegex.test(data.email)) {
      setEmailError('Insira um email válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!data.password) {
      setPasswordError('A senha é obrigatória.');
      valid = false;
    } else if (data.password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres.');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (validate()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 grid grid-cols-6 gap-6'>
      {/* Email */}
      <div className='col-span-6'>
        <label
          htmlFor='Email'
          className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
          Email
        </label>
        <input
          type='email'
          id='Email'
          name='email'
          value={data.email}
          onChange={(e) => {
            updateData({ email: e.target.value });
            if (emailError) setEmailError('');
            setErrorMessage('');
          }}
          className={`mt-1 w-full rounded-md border ${
            emailError ? 'border-red-500' : 'border-gray-200'
          } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
        />
        {emailError && (
          <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
            {emailError}
          </p>
        )}
      </div>

      {/* Senha */}
      <div className='col-span-6'>
        <label
          htmlFor='Password'
          className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
          Senha
        </label>
        <input
          type='password'
          id='Password'
          name='password'
          value={data.password}
          onChange={(e) => {
            updateData({ password: e.target.value });
            if (passwordError) setPasswordError('');
            setErrorMessage('');
          }}
          className={`mt-1 w-full rounded-md border ${
            passwordError ? 'border-red-500' : 'border-gray-200'
          } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
        />
        {passwordError && (
          <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
            {passwordError}
          </p>
        )}
      </div>

      {/* Botão para próximo passo */}
      <div className='col-span-6 flex justify-end'>
        <button
          type='submit'
          className='inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring dark:hover:bg-blue-700 dark:hover:text-white'>
          Próximo
        </button>
      </div>
    </form>
  );
};

export default UserDetailsStep;
