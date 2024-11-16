// AddressDetailsStep.tsx
import React, { useState } from 'react';

interface AddressDetailsProps {
  data: {
    street: string;
    number: string;
    additionalInfo: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    address_type: string;
  };
  updateData: (data: any) => void;
  submitForm: () => void;
  prevStep: () => void;
  setErrorMessage: (msg: string) => void;
}

const AddressDetailsStep: React.FC<AddressDetailsProps> = ({
  data,
  updateData,
  submitForm,
  prevStep,
  setErrorMessage,
}) => {
  const [addressError, setAddressError] = useState<{
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  }>({});

  const validate = () => {
    let valid = true;
    const errors: { [key: string]: string } = {};
    if (!data.street) {
      errors.street = 'A rua é obrigatória.';
      valid = false;
    }
    if (!data.number) {
      errors.number = 'O número é obrigatório.';
      valid = false;
    }
    if (!data.city) {
      errors.city = 'A cidade é obrigatória.';
      valid = false;
    }
    if (!data.state) {
      errors.state = 'O estado é obrigatório.';
      valid = false;
    }
    if (!data.country) {
      errors.country = 'O país é obrigatório.';
      valid = false;
    }
    if (!data.postalCode) {
      errors.postalCode = 'O CEP é obrigatório.';
      valid = false;
    }
    setAddressError(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (validate()) {
      submitForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 grid grid-cols-6 gap-6'>
      {/* Campos de endereço */}
      {/* ... (Mantenha o mesmo padrão, atualizando os campos com updateData) */}

      {/* Botões para voltar e enviar */}
      <div className='col-span-6 flex justify-between'>
        <button
          type='button'
          onClick={prevStep}
          className='inline-block rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring dark:hover:bg-gray-700 dark:hover:text-white'>
          Voltar
        </button>
        <button
          type='submit'
          className='inline-block rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring dark:hover:bg-green-700 dark:hover:text-white'>
          Concluir
        </button>
      </div>
    </form>
  );
};

export default AddressDetailsStep;
